package ch.japt.epj.security;

import ch.japt.epj.model.data.Person;
import ch.japt.epj.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
import org.springframework.transaction.annotation.Transactional;
=======
>>>>>>> master

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final PersonRepository repository;

  public CustomUserDetailsService(@Autowired PersonRepository repository) {
    this.repository = repository;
  }

  @Override
<<<<<<< HEAD
  @Transactional
=======
>>>>>>> master
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Person person =
        repository
            .findByEmail(email)
            .orElseThrow(
                () -> new UsernameNotFoundException("User with email " + email + " not found."));
    return CustomUserDetails.create(person);
  }

<<<<<<< HEAD
  @Transactional
=======
>>>>>>> master
  public UserDetails loadUserById(Long id) {
    Person person =
        repository
            .findByPersonId(id)
            .orElseThrow(
                () -> new UsernameNotFoundException("User with id : " + id + " not found."));
    return CustomUserDetails.create(person);
  }
}
