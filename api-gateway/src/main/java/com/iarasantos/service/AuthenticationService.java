package com.iarasantos.service;

import com.iarasantos.model.User;

public interface AuthenticationService {
    User signin(User signinRequest);
}
