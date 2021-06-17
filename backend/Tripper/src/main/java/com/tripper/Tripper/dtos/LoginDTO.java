package com.tripper.Tripper.dtos;

import lombok.Data;

@Data
public class LoginDTO {

    private String email;
    private String password;
    private String rememberMe;
}
