package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.ActionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Action and its DTO ActionDTO.
 */
@Mapper(componentModel = "spring", uses = {SprintMapper.class})
public interface ActionMapper extends EntityMapper<ActionDTO, Action> {

    @Mapping(source = "sprint.id", target = "sprintId")
    @Mapping(source = "sprint.name", target = "sprintName")
    ActionDTO toDto(Action action);

    @Mapping(source = "sprintId", target = "sprint")
    Action toEntity(ActionDTO actionDTO);

    default Action fromId(String id) {
        if (id == null) {
            return null;
        }
        Action action = new Action();
        action.setId(id);
        return action;
    }
}
