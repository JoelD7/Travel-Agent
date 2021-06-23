package com.tripper.Tripper.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ProfileDTO {

    private String uuid;

    private String firstName;
    private String lastName;
    private String email;
    private String curPassword;
    private String newPassword;
    private String profilePic;
}
