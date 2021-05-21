package com.tripper.Tripper.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import javax.sql.rowset.serial.SerialBlob;
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
//    @JsonIgnore
//    private byte[] coverPhoto;
}
