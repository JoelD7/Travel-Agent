package com.tripper.Tripper.security;

import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.models.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PersonRepository personRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + email + " does not exists."));

        return UserDetailsImpl.build(person);
    }

}
