package ch.japt.epj.model.data;


import sun.security.util.Length;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roleId;

    @Enumerated(EnumType.STRING)
    @Column(length=60)
    private RoleName roleName;

    @ManyToMany(mappedBy = "roles")
    private Collection<Person> persons = new ArrayList<>();

    public long getRoleId() {
        return roleId;
    }

    public RoleName getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleName roleName) {
        this.roleName = roleName;
    }
}
