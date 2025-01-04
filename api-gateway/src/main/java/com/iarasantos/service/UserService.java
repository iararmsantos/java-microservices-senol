package com.iarasantos.service;

import com.iarasantos.model.Role;
import com.iarasantos.model.User;

import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    Optional<User> findUserByUsername(String username);

    void changeRole(Role newRole, String username);
}
