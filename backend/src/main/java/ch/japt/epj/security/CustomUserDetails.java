package ch.japt.epj.security;

import ch.japt.epj.model.data.Person;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

  private long personId;

  private String email;

  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public CustomUserDetails(
      Long personId,
      String email,
      String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.personId = personId;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static CustomUserDetails create(Person person) {
    List<GrantedAuthority> authorities =
        person
            .getRoles()
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().name()))
            .collect(Collectors.toList());

    return new CustomUserDetails(
        person.getPersonId(), person.getEmail(), person.getPassword(), authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getPersonId() {
    return personId;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getUsername() {
    return email;
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
}
