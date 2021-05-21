package com.tripper.Tripper.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CoverImageTrip {

    private Long idTrip;
    private MultipartFile image;
}
