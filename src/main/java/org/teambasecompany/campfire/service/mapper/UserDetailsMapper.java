package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.UserDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserDetails and its DTO UserDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TeamMapper.class})
public interface UserDetailsMapper extends EntityMapper<UserDetailsDTO, UserDetails> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "team.name", target = "teamName")
    UserDetailsDTO toDto(UserDetails userDetails);

    @Mapping(source = "userId", target = "id")
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "teamId", target = "team")
    UserDetails toEntity(UserDetailsDTO userDetailsDTO);

    default UserDetails fromId(String id) {
        if (id == null) {
            return null;
        }
        UserDetails userDetails = new UserDetails();
        userDetails.setId(id);
        return userDetails;
    }
}
