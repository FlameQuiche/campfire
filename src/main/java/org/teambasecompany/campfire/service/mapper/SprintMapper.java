package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.SprintDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Sprint and its DTO SprintDTO.
 */
@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface SprintMapper extends EntityMapper<SprintDTO, Sprint> {

    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "team.name", target = "teamName")
    SprintDTO toDto(Sprint sprint);

    @Mapping(source = "teamId", target = "team")
    @Mapping(target = "moods", ignore = true)
    @Mapping(target = "actions", ignore = true)
    Sprint toEntity(SprintDTO sprintDTO);

    default Sprint fromId(String id) {
        if (id == null) {
            return null;
        }
        Sprint sprint = new Sprint();
        sprint.setId(id);
        return sprint;
    }
}
