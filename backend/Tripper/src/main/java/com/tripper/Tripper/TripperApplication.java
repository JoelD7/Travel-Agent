package com.tripper.Tripper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class TripperApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripperApplication.class, args);
    }

}
