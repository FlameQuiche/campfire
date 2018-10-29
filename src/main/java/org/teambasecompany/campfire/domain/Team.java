package org.teambasecompany.campfire.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Team.
 */
@Document(collection = "team")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @DBRef
    @Field("sprint")
    private Set<Sprint> sprints = new HashSet<>();
    @DBRef
    @Field("folder")
    private Set<Folder> folders = new HashSet<>();
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

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Sprint> getSprints() {
        return sprints;
    }

    public Team sprints(Set<Sprint> sprints) {
        this.sprints = sprints;
        return this;
    }

    public Team addSprint(Sprint sprint) {
        this.sprints.add(sprint);
        sprint.setTeam(this);
        return this;
    }

    public Team removeSprint(Sprint sprint) {
        this.sprints.remove(sprint);
        sprint.setTeam(null);
        return this;
    }

    public void setSprints(Set<Sprint> sprints) {
        this.sprints = sprints;
    }

    public Set<Folder> getFolders() {
        return folders;
    }

    public Team folders(Set<Folder> folders) {
        this.folders = folders;
        return this;
    }

    public Team addFolder(Folder folder) {
        this.folders.add(folder);
        folder.setTeam(this);
        return this;
    }

    public Team removeFolder(Folder folder) {
        this.folders.remove(folder);
        folder.setTeam(null);
        return this;
    }

    public void setFolders(Set<Folder> folders) {
        this.folders = folders;
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
        Team team = (Team) o;
        if (team.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), team.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
