package com.iarasantos.controller;

import com.iarasantos.model.Role;
import com.iarasantos.security.UserPrincipal;
import com.iarasantos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("change/{role}")
    public ResponseEntity<?> changeRole(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Role role) {
        userService.changeRole(role, principal.getUsername());

        return ResponseEntity.ok(true);
    }
}
