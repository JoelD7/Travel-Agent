package com.tripper.Tripper.models;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "persistent_logins")
public class PersistentLogin {

    @Id
    private String series;
    private String username;
    private String token;

    @Column(name = "last_used")
    private LocalDateTime lastUsed;
}
