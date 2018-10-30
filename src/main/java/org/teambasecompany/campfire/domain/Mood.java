package org.teambasecompany.campfire.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Mood.
 */
@Document(collection = "mood")
public class Mood implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("rank")
    private Integer rank;

    @NotNull
    @Field("date")
    private LocalDate date;

    @DBRef
    @Field("user")
    @JsonIgnoreProperties("")
    private UserDetails user;

    @DBRef
    @Field("sprint")
    @JsonIgnoreProperties("moods")
    private Sprint sprint;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRank() {
        return rank;
    }

    public Mood rank(Integer rank) {
        this.rank = rank;
        return this;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public LocalDate getDate() {
        return date;
    }

    public Mood date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public UserDetails getUser() {
        return user;
    }

    public Mood user(UserDetails userDetails) {
        this.user = userDetails;
        return this;
    }

    public void setUser(UserDetails userDetails) {
        this.user = userDetails;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public Mood sprint(Sprint sprint) {
        this.sprint = sprint;
        return this;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mood mood = (Mood) o;
        if (mood.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mood.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mood{" +
            "id=" + getId() +
            ", rank=" + getRank() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
