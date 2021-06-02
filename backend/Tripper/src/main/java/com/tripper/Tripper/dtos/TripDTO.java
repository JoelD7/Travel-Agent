package com.tripper.Tripper.dtos;

import java.time.LocalDate;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TripDTO {

    private Long idPerson;
    private String name;
    private String countries;
    private Double budget;
    private LocalDate startDate;
    private LocalDate endDate;
    private String coverPhoto;
}
