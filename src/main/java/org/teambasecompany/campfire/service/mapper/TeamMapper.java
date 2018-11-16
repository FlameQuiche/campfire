package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.TeamDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Team and its DTO TeamDTO.
 */
@Mapper(componentModel = "spring", uses = {MembersMapper.class})
public interface TeamMapper extends EntityMapper<TeamDTO, Team> {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "members", target = "members")
    TeamDTO toDto(Team team);

    @Mapping(target = "sprints", ignore = true)
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "ideas", ignore = true)
    Team toEntity(TeamDTO teamDTO);

    default Team fromId(String id) {
        if (id == null) {
            return null;
        }
        Team team = new Team();
        team.setId(id);
        return team;
    }
}
