package com.tripper.Tripper.security;

import java.io.IOException;
import java.util.Collection;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class SameSiteFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        addSameSiteAttribute((HttpServletResponse) response);

        chain.doFilter(request, response);
    }

    private void addSameSiteAttribute(HttpServletResponse response) {
        Collection<String> headers = response.getHeaders("Set-Cookie");
        boolean firstHeader = true;
//        response.setHeader("Set-Cookie", ".");

        for (String header : headers) {
            response.setHeader("Set-Cookie", String.format("%s; %s", header, "SameSite=None"));
            System.out.println("RESPONSE HEADERS after adding SameSite: " + response.getHeaders("Set-Cookie"));
        }

//        System.out.println("======================================");
//        System.out.println("RESPONSE HEADERS after adding SameSite: " + response.getHeaders("Set-Cookie"));
//        System.out.println("======================================");
    }

    @Override
    public void destroy() {
    }
}
