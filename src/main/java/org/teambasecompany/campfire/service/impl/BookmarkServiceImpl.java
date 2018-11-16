package org.teambasecompany.campfire.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.teambasecompany.campfire.service.BookmarkService;
import org.teambasecompany.campfire.domain.Bookmark;
import org.teambasecompany.campfire.repository.BookmarkRepository;
import org.teambasecompany.campfire.service.dto.BookmarkDTO;
import org.teambasecompany.campfire.service.mapper.BookmarkMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing Bookmark.
 */
@Service
public class BookmarkServiceImpl implements BookmarkService {

    private final Logger log = LoggerFactory.getLogger(BookmarkServiceImpl.class);

    private BookmarkRepository bookmarkRepository;

    private BookmarkMapper bookmarkMapper;

    public BookmarkServiceImpl(BookmarkRepository bookmarkRepository, BookmarkMapper bookmarkMapper) {
        this.bookmarkRepository = bookmarkRepository;
        this.bookmarkMapper = bookmarkMapper;
    }

    /**
     * Save a bookmark.
     *
     * @param bookmarkDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BookmarkDTO save(BookmarkDTO bookmarkDTO) {
        log.debug("Request to save Bookmark : {}", bookmarkDTO);

        Bookmark bookmark = bookmarkMapper.toEntity(bookmarkDTO);
        bookmark = bookmarkRepository.save(bookmark);
        return bookmarkMapper.toDto(bookmark);
    }

    /**
     * Get all the bookmarks.
     *
     * @param pageable the pagination information
     * @param team the team of the current user
     * @param query the query to filter bookmarks
     * @return the list of entities
     */
    @Override
    public Page<BookmarkDTO> findAll(Pageable pageable, String team, String query) {
        log.debug("Request to get all Bookmarks for team: {} using query : {} ", team, query);
        return StringUtils.isEmpty(query) ? bookmarkRepository.findAllByTeam(pageable, team).map(bookmarkMapper::toDto) :
            bookmarkRepository.findAllByTeamAndTagsContainingIgnoreCaseOrNameContainingIgnoreCaseOrUrlContainingIgnoreCase(
                pageable, team, query, query, query).map(bookmarkMapper::toDto);
    }


    /**
     * Get one bookmark by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<BookmarkDTO> findOne(String id) {
        log.debug("Request to get Bookmark : {}", id);
        return bookmarkRepository.findById(id)
            .map(bookmarkMapper::toDto);
    }

    /**
     * Delete the bookmark by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Bookmark : {}", id);
        bookmarkRepository.deleteById(id);
    }
}
