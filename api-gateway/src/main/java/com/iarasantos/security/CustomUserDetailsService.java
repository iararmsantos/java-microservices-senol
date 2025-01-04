package com.iarasantos.security;

import com.iarasantos.model.User;
import com.iarasantos.service.UserService;
import com.iarasantos.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Unable to find user with username: " + username));

        //authorities
        Set<GrantedAuthority> authorities = Set.of(
                SecurityUtils.convertToAuthority(user.getRole().name()));

        //userDetails

        UserPrincipal userPrincipal = new UserPrincipal();
        userPrincipal.setUser(user);
        userPrincipal.setId(user.getId());
        userPrincipal.setUsername(user.getUsername());
        userPrincipal.setPassword(user.getPassword());
        userPrincipal.setAuthorities(authorities);

        return userPrincipal;
    }
}
