package org.teambasecompany.campfire.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserDetails entity.
 */
public class UserDetailsDTO implements Serializable {

    private String id;

    private String userId;

    private String teamId;

    private String teamName;

    public UserDetailsDTO() {
    }

    public UserDetailsDTO(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

        UserDetailsDTO userDetailsDTO = (UserDetailsDTO) o;
        if (userDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserDetailsDTO{" +
            "id=" + getId() +
            ", user=" + getUserId() +
            ", team=" + getTeamId() +
            ", team='" + getTeamName() + "'" +
            "}";
    }
}
