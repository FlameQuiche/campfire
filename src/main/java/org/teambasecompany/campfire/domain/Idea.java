package org.teambasecompany.campfire.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Idea.
 */
@Document(collection = "idea")
public class Idea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("description")
    private String description;

    @DBRef
    @Field("user")
    @JsonIgnoreProperties("")
    private UserDetails user;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties("ideas")
    private Team team;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Idea description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDetails getUser() {
        return user;
    }

    public Idea user(UserDetails userDetails) {
        this.user = userDetails;
        return this;
    }

    public void setUser(UserDetails userDetails) {
        this.user = userDetails;
    }

    public Team getTeam() {
        return team;
    }

    public Idea team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
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
        Idea idea = (Idea) o;
        if (idea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), idea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Idea{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
