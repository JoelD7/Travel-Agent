package com.tripper.Tripper.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tripper.Tripper.models.Person;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
public class UserDetailsImpl implements UserDetails {

    private Long idPerson;
    private String email;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(Long idPerson, String email, String password) {
        this.idPerson = idPerson;
        this.email = email;
        this.password = password;
    }

    public static UserDetails build(Person person) {
        return new UserDetailsImpl(person.getIdPerson(), person.getEmail(), person.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = Arrays.asList("User")
                .stream()
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
