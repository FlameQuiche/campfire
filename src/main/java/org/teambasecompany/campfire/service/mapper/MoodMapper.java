package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.MoodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mood and its DTO MoodDTO.
 */
@Mapper(componentModel = "spring", uses = {UserDetailsMapper.class, SprintMapper.class})
public interface MoodMapper extends EntityMapper<MoodDTO, Mood> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "sprint.id", target = "sprintId")
    @Mapping(source = "sprint.name", target = "sprintName")
    MoodDTO toDto(Mood mood);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "sprintId", target = "sprint")
    Mood toEntity(MoodDTO moodDTO);

    default Mood fromId(String id) {
        if (id == null) {
            return null;
        }
        Mood mood = new Mood();
        mood.setId(id);
        return mood;
    }
}
