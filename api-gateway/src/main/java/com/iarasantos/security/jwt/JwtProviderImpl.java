package com.iarasantos.security.jwt;

import com.iarasantos.security.UserPrincipal;
import com.iarasantos.util.SecurityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtProviderImpl implements JwtProvider{
    @Value("${app.jwt.secret}")
    private String JWT_SECRET;

    @Value("${app.jwt.expiration-in-ms}")
    private Long JWT_EXPIRATION_TIME;

    private String base64EncodedSecretKey;

    @PostConstruct
    public void init() {
        base64EncodedSecretKey = Base64.getEncoder().encodeToString(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String getBase64EncodedSecretKey() {
        return base64EncodedSecretKey;
    }

    @Override
    public String generateToken(UserPrincipal auth) {
        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        byte[] decodedKey = Base64.getDecoder().decode(base64EncodedSecretKey);
        SecretKey secretKey = Keys.hmacShaKeyFor(decodedKey);
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(auth.getUsername())
                .claim("roles", authorities)
                .claim("userId", auth.getId())
                .expiration(Date.from(now.plusMillis(JWT_EXPIRATION_TIME)))
                .issuedAt(Date.from(now))
                .signWith(secretKey)
                .compact();
    }

    @Override
    public Authentication getAuthentication(HttpServletRequest request) {
        Claims claims = extractClaims(request);

        if (claims == null) {
            return null;
        }

        String username = claims.getSubject();
        Long userId = claims.get("userId", Long.class);

        // Now, you can safely get the roles from the claims object
        Set<GrantedAuthority> authorities = new HashSet<>();
        Object rolesClaim = claims.get("roles");

        if (rolesClaim != null) {
            String rolesString = rolesClaim.toString();
            System.out.println("Roles from JWT: " + rolesString);

            // Assuming roles are stored as a comma-separated list in the JWT
            authorities = Arrays
                    .stream(rolesString.split(","))
                    .map(SecurityUtils::convertToAuthority)
                    .collect(Collectors.toSet());
        }

        UserPrincipal userPrincipal = new UserPrincipal();
        userPrincipal.setUsername(username);
        userPrincipal.setAuthorities(authorities);
        userPrincipal.setId(userId);

        if (username == null) {
            return null;
        }

        return new UsernamePasswordAuthenticationToken(userPrincipal, null, authorities);
    }

    @Override
    public boolean isTokenValid(HttpServletRequest request) {
        Claims claims = extractClaims(request);

        if (claims == null) {
            return false;
        }

        if (claims.getExpiration().before(new Date())) {
            return false;
        }

        return true;
    }

    private Claims extractClaims(HttpServletRequest request) {
        System.out.println(request);
        String token = SecurityUtils.extractAuthTokenFromRequest(request);

        if (token == null) {
            return null;
        }

        byte[] decodedKey = Base64.getDecoder().decode(base64EncodedSecretKey);
        SecretKey key = Keys.hmacShaKeyFor(decodedKey);

        return Jwts.parser()
                .verifyWith(key) // Set the signing key
                .build() // Build the parser
                .parseSignedClaims(token) // Parse the token
                .getPayload(); // Extract the claims
    }
}
