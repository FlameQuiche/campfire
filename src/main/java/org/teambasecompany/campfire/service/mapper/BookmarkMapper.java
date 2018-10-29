package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.BookmarkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bookmark and its DTO BookmarkDTO.
 */
@Mapper(componentModel = "spring", uses = {FolderMapper.class})
public interface BookmarkMapper extends EntityMapper<BookmarkDTO, Bookmark> {

    @Mapping(source = "folder.id", target = "folderId")
    @Mapping(source = "folder.name", target = "folderName")
    BookmarkDTO toDto(Bookmark bookmark);

    @Mapping(source = "folderId", target = "folder")
    Bookmark toEntity(BookmarkDTO bookmarkDTO);

    default Bookmark fromId(String id) {
        if (id == null) {
            return null;
        }
        Bookmark bookmark = new Bookmark();
        bookmark.setId(id);
        return bookmark;
    }
}
