package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.BookmarkDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Bookmark.
 */
public interface BookmarkService {

    /**
     * Save a bookmark.
     *
     * @param bookmarkDTO the entity to save
     * @return the persisted entity
     */
    BookmarkDTO save(BookmarkDTO bookmarkDTO);

    /**
     * Get all the bookmarks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BookmarkDTO> findAll(Pageable pageable);


    /**
     * Get the "id" bookmark.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BookmarkDTO> findOne(String id);

    /**
     * Delete the "id" bookmark.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
