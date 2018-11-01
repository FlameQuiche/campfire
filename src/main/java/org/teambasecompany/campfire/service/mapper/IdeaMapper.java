package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.IdeaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Idea and its DTO IdeaDTO.
 */
@Mapper(componentModel = "spring", uses = {UserDetailsMapper.class, TeamMapper.class})
public interface IdeaMapper extends EntityMapper<IdeaDTO, Idea> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "team.name", target = "teamName")
    IdeaDTO toDto(Idea idea);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "teamId", target = "team")
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
