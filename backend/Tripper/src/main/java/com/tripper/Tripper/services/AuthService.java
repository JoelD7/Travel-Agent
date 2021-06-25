package com.tripper.Tripper.services;

import com.tripper.Tripper.dtos.LoginDTO;
import com.tripper.Tripper.dtos.SignUpDTO;
import com.tripper.Tripper.models.Person;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService {

    public Person authenticateUser(LoginDTO loginDto, HttpServletRequest request, HttpServletResponse response);

    public String getUserAuthStatus(HttpServletRequest request, HttpServletResponse response);

    public void registerUser(SignUpDTO signUpDto);

    public void logoutUser(HttpServletRequest request, HttpServletResponse response);
}
