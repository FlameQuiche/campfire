package org.teambasecompany.campfire.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Folder.
 */
@Document(collection = "folder")
public class Folder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties("folders")
    private Team team;

    @DBRef
    @Field("subFolders")
    private Set<Folder> subFolders = new HashSet<>();

    @DBRef
    @Field("bookmark")
    private Set<Bookmark> bookmarks = new HashSet<>();
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

    public Folder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Team getTeam() {
        return team;
    }

    public Folder team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Set<Folder> getSubFolders() {
        return subFolders;
    }

    public Folder subFolders(Set<Folder> folders) {
        this.subFolders = folders;
        return this;
    }

    public Folder addSubFolder(Folder folder) {
        this.subFolders.add(folder);
        return this;
    }

    public Folder removeSubFolder(Folder folder) {
        this.subFolders.remove(folder);
        return this;
    }

    public void setSubFolders(Set<Folder> folders) {
        this.subFolders = folders;
    }

    public Set<Bookmark> getBookmarks() {
        return bookmarks;
    }

    public Folder bookmarks(Set<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
        return this;
    }

    public Folder addBookmark(Bookmark bookmark) {
        this.bookmarks.add(bookmark);
        bookmark.setFolder(this);
        return this;
    }

    public Folder removeBookmark(Bookmark bookmark) {
        this.bookmarks.remove(bookmark);
        bookmark.setFolder(null);
        return this;
    }

    public void setBookmarks(Set<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
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
        Folder folder = (Folder) o;
        if (folder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), folder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Folder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
