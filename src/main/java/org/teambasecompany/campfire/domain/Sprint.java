package org.teambasecompany.campfire.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sprint.
 */
@Document(collection = "sprint")
public class Sprint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("begin_date")
    private LocalDate beginDate;

    @NotNull
    @Field("end_date")
    private LocalDate endDate;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties("sprints")
    private Team team;

    @DBRef
    @Field("mood")
    private Set<Mood> moods = new HashSet<>();
    @DBRef
    @Field("action")
    private Set<Action> actions = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Sprint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public Sprint beginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
        return this;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Sprint endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Team getTeam() {
        return team;
    }

    public Sprint team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Set<Mood> getMoods() {
        return moods;
    }

    public Sprint moods(Set<Mood> moods) {
        this.moods = moods;
        return this;
    }

    public Sprint addMood(Mood mood) {
        this.moods.add(mood);
        mood.setSprint(this);
        return this;
    }

    public Sprint removeMood(Mood mood) {
        this.moods.remove(mood);
        mood.setSprint(null);
        return this;
    }

    public void setMoods(Set<Mood> moods) {
        this.moods = moods;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public Sprint actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public Sprint addAction(Action action) {
        this.actions.add(action);
        action.setSprint(this);
        return this;
    }

    public Sprint removeAction(Action action) {
        this.actions.remove(action);
        action.setSprint(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
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
        Sprint sprint = (Sprint) o;
        if (sprint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sprint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sprint{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", beginDate='" + getBeginDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
