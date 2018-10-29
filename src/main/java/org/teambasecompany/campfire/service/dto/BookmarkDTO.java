package org.teambasecompany.campfire.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Bookmark entity.
 */
public class BookmarkDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private String url;

    private String folderId;

    private String folderName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookmarkDTO bookmarkDTO = (BookmarkDTO) o;
        if (bookmarkDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookmarkDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookmarkDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", folder=" + getFolderId() +
            ", folder='" + getFolderName() + "'" +
            "}";
    }
}
