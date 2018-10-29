package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.FolderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Folder and its DTO FolderDTO.
 */
@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface FolderMapper extends EntityMapper<FolderDTO, Folder> {

    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "team.name", target = "teamName")
    FolderDTO toDto(Folder folder);

    @Mapping(source = "teamId", target = "team")
    @Mapping(target = "bookmarks", ignore = true)
    Folder toEntity(FolderDTO folderDTO);

    default Folder fromId(String id) {
        if (id == null) {
            return null;
        }
        Folder folder = new Folder();
        folder.setId(id);
        return folder;
    }
}
