package com.tripper.Tripper.dtos;

import lombok.Data;

@Data
public class JwtResponseDTO {

    private String token;
    private String type = "Bearer";
    private Long idPerson;
    private String email;

    public JwtResponseDTO(String token, Long idPerson, String email) {
        this.token = token;
        this.idPerson = idPerson;
        this.email = email;
    }

}
