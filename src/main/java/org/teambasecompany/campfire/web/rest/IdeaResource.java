package org.teambasecompany.campfire.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.teambasecompany.campfire.service.IdeaService;
import org.teambasecompany.campfire.web.rest.errors.BadRequestAlertException;
import org.teambasecompany.campfire.web.rest.util.HeaderUtil;
import org.teambasecompany.campfire.web.rest.util.PaginationUtil;
import org.teambasecompany.campfire.service.dto.IdeaDTO;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Idea.
 */
@RestController
@RequestMapping("/api")
public class IdeaResource {

    private final Logger log = LoggerFactory.getLogger(IdeaResource.class);

    private static final String ENTITY_NAME = "idea";

    private IdeaService ideaService;

    public IdeaResource(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    /**
     * POST  /ideas : Create a new idea.
     *
     * @param ideaDTO the ideaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ideaDTO, or with status 400 (Bad Request) if the idea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ideas")
    @Timed
    public ResponseEntity<IdeaDTO> createIdea(@Valid @RequestBody IdeaDTO ideaDTO) throws URISyntaxException {
        log.debug("REST request to save Idea : {}", ideaDTO);
        if (ideaDTO.getId() != null) {
            throw new BadRequestAlertException("A new idea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IdeaDTO result = ideaService.save(ideaDTO);
        return ResponseEntity.created(new URI("/api/ideas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ideas : Updates an existing idea.
     *
     * @param ideaDTO the ideaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ideaDTO,
     * or with status 400 (Bad Request) if the ideaDTO is not valid,
     * or with status 500 (Internal Server Error) if the ideaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ideas")
    @Timed
    public ResponseEntity<IdeaDTO> updateIdea(@Valid @RequestBody IdeaDTO ideaDTO) throws URISyntaxException {
        log.debug("REST request to update Idea : {}", ideaDTO);
        if (ideaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IdeaDTO result = ideaService.save(ideaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ideaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ideas : get all the ideas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ideas in body
     */
    @GetMapping("/ideas")
    @Timed
    public ResponseEntity<List<IdeaDTO>> getAllIdeas(Pageable pageable) {
        log.debug("REST request to get a page of Ideas");
        Page<IdeaDTO> page = ideaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ideas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ideas/:id : get the "id" idea.
     *
     * @param id the id of the ideaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ideaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<IdeaDTO> getIdea(@PathVariable String id) {
        log.debug("REST request to get Idea : {}", id);
        Optional<IdeaDTO> ideaDTO = ideaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ideaDTO);
    }

    /**
     * DELETE  /ideas/:id : delete the "id" idea.
     *
     * @param id the id of the ideaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<Void> deleteIdea(@PathVariable String id) {
        log.debug("REST request to delete Idea : {}", id);
        ideaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
