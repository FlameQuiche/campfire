package org.teambasecompany.campfire.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Folder entity.
 */
public class FolderDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    private String teamId;

    private String teamName;

    private Set<FolderDTO> subFolders = new HashSet<>();

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

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Set<FolderDTO> getSubFolders() {
        return subFolders;
    }

    public void setSubFolders(Set<FolderDTO> folders) {
        this.subFolders = folders;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FolderDTO folderDTO = (FolderDTO) o;
        if (folderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), folderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FolderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", team=" + getTeamId() +
            ", team='" + getTeamName() + "'" +
            "}";
    }
}
