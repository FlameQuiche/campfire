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
    @Field("bookmark")
    private Set<Bookmark> bookmarks = new HashSet<>();
    @DBRef
    @Field("member")
    private Set<UserDetails> members = new HashSet<>();
    @DBRef
    @Field("idea")
    private Set<Idea> ideas = new HashSet<>();
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

    public Set<Bookmark> getBookmarks() {
        return bookmarks;
    }

    public Team bookmarks(Set<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
        return this;
    }

    public Team addBookmark(Bookmark bookmark) {
        this.bookmarks.add(bookmark);
        bookmark.setTeam(this);
        return this;
    }

    public Team removeBookmark(Bookmark bookmark) {
        this.bookmarks.remove(bookmark);
        bookmark.setTeam(null);
        return this;
    }

    public void setBookmarks(Set<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public Set<UserDetails> getMembers() {
        return members;
    }

    public Team members(Set<UserDetails> userDetails) {
        this.members = userDetails;
        return this;
    }

    public Team addMember(UserDetails userDetails) {
        this.members.add(userDetails);
        userDetails.setTeam(this);
        return this;
    }

    public Team removeMember(UserDetails userDetails) {
        this.members.remove(userDetails);
        userDetails.setTeam(null);
        return this;
    }

    public void setMembers(Set<UserDetails> userDetails) {
        this.members = userDetails;
    }

    public Set<Idea> getIdeas() {
        return ideas;
    }

    public Team ideas(Set<Idea> ideas) {
        this.ideas = ideas;
        return this;
    }

    public Team addIdea(Idea idea) {
        this.ideas.add(idea);
        idea.setTeam(this);
        return this;
    }

    public Team removeIdea(Idea idea) {
        this.ideas.remove(idea);
        idea.setTeam(null);
        return this;
    }

    public void setIdeas(Set<Idea> ideas) {
        this.ideas = ideas;
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
