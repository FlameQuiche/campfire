package org.teambasecompany.campfire.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Mood entity.
 */
public class MoodDTO implements Serializable {

    private String id;

    @NotNull
    private Integer rank;

    @NotNull
    private LocalDate date;

    private String userId;

    private String sprintId;

    private String sprintName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userDetailsId) {
        this.userId = userDetailsId;
    }

    public String getSprintId() {
        return sprintId;
    }

    public void setSprintId(String sprintId) {
        this.sprintId = sprintId;
    }

    public String getSprintName() {
        return sprintName;
    }

    public void setSprintName(String sprintName) {
        this.sprintName = sprintName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MoodDTO moodDTO = (MoodDTO) o;
        if (moodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MoodDTO{" +
            "id=" + getId() +
            ", rank=" + getRank() +
            ", date='" + getDate() + "'" +
            ", user=" + getUserId() +
            ", sprint=" + getSprintId() +
            ", sprint='" + getSprintName() + "'" +
            "}";
    }
}
