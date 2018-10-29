package org.teambasecompany.campfire.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.teambasecompany.campfire.service.MoodService;
import org.teambasecompany.campfire.web.rest.errors.BadRequestAlertException;
import org.teambasecompany.campfire.web.rest.util.HeaderUtil;
import org.teambasecompany.campfire.service.dto.MoodDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mood.
 */
@RestController
@RequestMapping("/api")
public class MoodResource {

    private final Logger log = LoggerFactory.getLogger(MoodResource.class);

    private static final String ENTITY_NAME = "mood";

    private MoodService moodService;

    public MoodResource(MoodService moodService) {
        this.moodService = moodService;
    }

    /**
     * POST  /moods : Create a new mood.
     *
     * @param moodDTO the moodDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new moodDTO, or with status 400 (Bad Request) if the mood has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/moods")
    @Timed
    public ResponseEntity<MoodDTO> createMood(@Valid @RequestBody MoodDTO moodDTO) throws URISyntaxException {
        log.debug("REST request to save Mood : {}", moodDTO);
        if (moodDTO.getId() != null) {
            throw new BadRequestAlertException("A new mood cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MoodDTO result = moodService.save(moodDTO);
        return ResponseEntity.created(new URI("/api/moods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /moods : Updates an existing mood.
     *
     * @param moodDTO the moodDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated moodDTO,
     * or with status 400 (Bad Request) if the moodDTO is not valid,
     * or with status 500 (Internal Server Error) if the moodDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/moods")
    @Timed
    public ResponseEntity<MoodDTO> updateMood(@Valid @RequestBody MoodDTO moodDTO) throws URISyntaxException {
        log.debug("REST request to update Mood : {}", moodDTO);
        if (moodDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MoodDTO result = moodService.save(moodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, moodDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /moods : get all the moods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of moods in body
     */
    @GetMapping("/moods")
    @Timed
    public List<MoodDTO> getAllMoods() {
        log.debug("REST request to get all Moods");
        return moodService.findAll();
    }

    /**
     * GET  /moods/:id : get the "id" mood.
     *
     * @param id the id of the moodDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the moodDTO, or with status 404 (Not Found)
     */
    @GetMapping("/moods/{id}")
    @Timed
    public ResponseEntity<MoodDTO> getMood(@PathVariable String id) {
        log.debug("REST request to get Mood : {}", id);
        Optional<MoodDTO> moodDTO = moodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(moodDTO);
    }

    /**
     * DELETE  /moods/:id : delete the "id" mood.
     *
     * @param id the id of the moodDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/moods/{id}")
    @Timed
    public ResponseEntity<Void> deleteMood(@PathVariable String id) {
        log.debug("REST request to delete Mood : {}", id);
        moodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
