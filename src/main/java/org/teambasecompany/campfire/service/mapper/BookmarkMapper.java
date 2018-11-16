package org.teambasecompany.campfire.service.mapper;

import org.teambasecompany.campfire.domain.*;
import org.teambasecompany.campfire.service.dto.BookmarkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bookmark and its DTO BookmarkDTO.
 */
@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface BookmarkMapper extends EntityMapper<BookmarkDTO, Bookmark> {

    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "team.name", target = "teamName")
    BookmarkDTO toDto(Bookmark bookmark);

    @Mapping(source = "teamId", target = "team")
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
