package com.tripper.Tripper.security;

import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.utils.CookieName;
import java.io.IOException;
import java.util.stream.Stream;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class LoggedUserFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
//
//        Cookie personUuidCookie = new Cookie(CookieName.PERSON_UUID.toString(), user.getUuid());
//        personUuidCookie.setDomain("localhost");
//        personUuidCookie.setPath("/");
//        System.out.println(String.format("name: %s, value: %s\n", personUuidCookie.getName(), personUuidCookie.getValue()));
//        response.addCookie(personUuidCookie);

        filterChain.doFilter(request, response);
//        System.out.println("After passing request and response to filter");
    }

}
