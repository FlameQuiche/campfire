package org.teambasecompany.campfire.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.apache.commons.lang3.StringUtils;
import org.teambasecompany.campfire.service.BookmarkService;
import org.teambasecompany.campfire.service.TeamService;
import org.teambasecompany.campfire.service.dto.TeamDTO;
import org.teambasecompany.campfire.web.rest.errors.BadRequestAlertException;
import org.teambasecompany.campfire.web.rest.util.HeaderUtil;
import org.teambasecompany.campfire.web.rest.util.PaginationUtil;
import org.teambasecompany.campfire.service.dto.BookmarkDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Bookmark.
 */
@RestController
@RequestMapping("/api")
public class BookmarkResource {

    private final Logger log = LoggerFactory.getLogger(BookmarkResource.class);

    private static final String ENTITY_NAME = "bookmark";

    private BookmarkService bookmarkService;
    private TeamService teamService;

    public BookmarkResource(BookmarkService bookmarkService, TeamService teamService) {
        this.bookmarkService = bookmarkService;
        this.teamService = teamService;
    }

    /**
     * POST  /bookmarks : Create a new bookmark.
     *
     * @param bookmarkDTO the bookmarkDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bookmarkDTO, or with status 400 (Bad Request) if the bookmark has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bookmarks")
    @Timed
    public ResponseEntity<BookmarkDTO> createBookmark(@Valid @RequestBody BookmarkDTO bookmarkDTO) throws URISyntaxException {
        log.debug("REST request to save Bookmark : {}", bookmarkDTO);
        if (bookmarkDTO.getId() != null) {
            throw new BadRequestAlertException("A new bookmark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookmarkDTO result = bookmarkService.save(bookmarkDTO);
        return ResponseEntity.created(new URI("/api/bookmarks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bookmarks : Updates an existing bookmark.
     *
     * @param bookmarkDTO the bookmarkDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bookmarkDTO,
     * or with status 400 (Bad Request) if the bookmarkDTO is not valid,
     * or with status 500 (Internal Server Error) if the bookmarkDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bookmarks")
    @Timed
    public ResponseEntity<BookmarkDTO> updateBookmark(@Valid @RequestBody BookmarkDTO bookmarkDTO) throws URISyntaxException {
        log.debug("REST request to update Bookmark : {}", bookmarkDTO);
        if (bookmarkDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookmarkDTO result = bookmarkService.save(bookmarkDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bookmarkDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bookmarks : get all the bookmarks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bookmarks in body
     */
    @GetMapping("/bookmarks")
    @Timed
    public ResponseEntity<List<BookmarkDTO>> getAllBookmarks(Pageable pageable, @RequestParam(required = false) String team,
                                                             @RequestParam(required = false) String query, Principal principal) {
        log.debug("REST request to get a page of Bookmarks");
        if (StringUtils.isEmpty(team)) {
            List<TeamDTO> teams = teamService.findAll(principal.getName());
            if (teams.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            team = teams.get(0).getId();
        }
        Page<BookmarkDTO> page = bookmarkService.findAll(pageable, team, query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bookmarks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bookmarks/:id : get the "id" bookmark.
     *
     * @param id the id of the bookmarkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bookmarkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bookmarks/{id}")
    @Timed
    public ResponseEntity<BookmarkDTO> getBookmark(@PathVariable String id) {
        log.debug("REST request to get Bookmark : {}", id);
        Optional<BookmarkDTO> bookmarkDTO = bookmarkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookmarkDTO);
    }

    /**
     * DELETE  /bookmarks/:id : delete the "id" bookmark.
     *
     * @param id the id of the bookmarkDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bookmarks/{id}")
    @Timed
    public ResponseEntity<Void> deleteBookmark(@PathVariable String id) {
        log.debug("REST request to delete Bookmark : {}", id);
        bookmarkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
