package com.tripper.Tripper;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "api.cred")
@Data
@NoArgsConstructor
public class APICredentialsProps {

    private String CURRENCY_API_KEY;
    private String PLACES_API_KEY;
    private String FOURSQUARE_CLIENT_ID;
    private String FOURSQUARE_CLIENT_SECRET;
    private String AMADEUS_KEY;
    private String AMADEUS_SECRET;
    private String HOTELBEDS_KEY;
    private String HOTELBEDS_SECRET;
    private String YELP_KEY;
    private String AVIS_ID;
    private String AVIS_SECRET;
}
