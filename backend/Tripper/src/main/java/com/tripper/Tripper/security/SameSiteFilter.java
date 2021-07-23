package com.tripper.Tripper.security;

import com.tripper.Tripper.utils.CookieName;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

public class SameSiteFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        chain.doFilter(request, response);
        addSameSiteAttribute((HttpServletResponse) response, (HttpServletRequest) request);
    }

    private void addSameSiteAttribute(HttpServletResponse response, HttpServletRequest request) {
        Collection<String> headers = response.getHeaders("Set-Cookie");
        boolean firstHeader = true;
        System.out.println("======================================");
        System.out.println("RESPONSE HEADERS: " + response.getHeaders("Set-Cookie"));
        System.out.println("======================================");

        List<ResponseCookie> responseCookies = Stream.of(request.getCookies())
                .map(cookie -> {
                    return ResponseCookie.from(cookie.getName(), cookie.getValue())
                            .domain(cookie.getDomain())
                            .path(cookie.getPath())
                            .maxAge(cookie.getMaxAge())
                            .sameSite("None")
                            .build();
                })
                .collect(Collectors.toList());

        for (ResponseCookie cookie : responseCookies) {
            if (firstHeader) {
                response.setHeader("Set-Cookie", cookie.toString());
                firstHeader = false;
                continue;
            }

            response.addHeader("Set-Cookie", cookie.toString());
        }

        System.out.println("RESPONSE HEADERS after adding SameSite: " + response.getHeaders("Set-Cookie"));

//        System.out.println("======================================");
//        System.out.println("RESPONSE HEADERS after adding SameSite: " + response.getHeaders("Set-Cookie"));
//        System.out.println("======================================");
    }

    @Override
    public void destroy() {
    }
}
