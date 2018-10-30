package org.teambasecompany.campfire.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Idea entity.
 */
public class IdeaDTO implements Serializable {

    private String id;

    @NotNull
    private String description;

    private String userId;

    private String teamId;

    private String teamName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userDetailsId) {
        this.userId = userDetailsId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IdeaDTO ideaDTO = (IdeaDTO) o;
        if (ideaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ideaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IdeaDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", user=" + getUserId() +
            ", team=" + getTeamId() +
            ", team='" + getTeamName() + "'" +
            "}";
    }
}
