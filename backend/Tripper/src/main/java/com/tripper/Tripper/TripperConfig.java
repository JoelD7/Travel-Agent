package com.tripper.Tripper;

import java.util.Arrays;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@PropertySources({
    @PropertySource("classpath:keys.properties")})
public class TripperConfig {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

}
