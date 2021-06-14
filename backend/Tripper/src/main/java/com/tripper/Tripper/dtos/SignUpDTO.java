package com.tripper.Tripper.dtos;

import lombok.Data;

@Data
public class SignUpDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
