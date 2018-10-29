package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.IdeaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Idea and its DTO IdeaDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface IdeaMapper extends EntityMapper<IdeaDTO, Idea> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    IdeaDTO toDto(Idea idea);

    @Mapping(source = "userId", target = "user")
    Idea toEntity(IdeaDTO ideaDTO);

    default Idea fromId(String id) {
        if (id == null) {
            return null;
        }
        Idea idea = new Idea();
        idea.setId(id);
        return idea;
    }
}
