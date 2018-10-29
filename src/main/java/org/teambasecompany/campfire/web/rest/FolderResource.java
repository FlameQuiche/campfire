package org.teambasecompany.campfire.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.teambasecompany.campfire.service.FolderService;
import org.teambasecompany.campfire.web.rest.errors.BadRequestAlertException;
import org.teambasecompany.campfire.web.rest.util.HeaderUtil;
import org.teambasecompany.campfire.web.rest.util.PaginationUtil;
import org.teambasecompany.campfire.service.dto.FolderDTO;
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
 * REST controller for managing Folder.
 */
@RestController
@RequestMapping("/api")
public class FolderResource {

    private final Logger log = LoggerFactory.getLogger(FolderResource.class);

    private static final String ENTITY_NAME = "folder";

    private FolderService folderService;

    public FolderResource(FolderService folderService) {
        this.folderService = folderService;
    }

    /**
     * POST  /folders : Create a new folder.
     *
     * @param folderDTO the folderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new folderDTO, or with status 400 (Bad Request) if the folder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/folders")
    @Timed
    public ResponseEntity<FolderDTO> createFolder(@Valid @RequestBody FolderDTO folderDTO) throws URISyntaxException {
        log.debug("REST request to save Folder : {}", folderDTO);
        if (folderDTO.getId() != null) {
            throw new BadRequestAlertException("A new folder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FolderDTO result = folderService.save(folderDTO);
        return ResponseEntity.created(new URI("/api/folders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /folders : Updates an existing folder.
     *
     * @param folderDTO the folderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated folderDTO,
     * or with status 400 (Bad Request) if the folderDTO is not valid,
     * or with status 500 (Internal Server Error) if the folderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/folders")
    @Timed
    public ResponseEntity<FolderDTO> updateFolder(@Valid @RequestBody FolderDTO folderDTO) throws URISyntaxException {
        log.debug("REST request to update Folder : {}", folderDTO);
        if (folderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FolderDTO result = folderService.save(folderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, folderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /folders : get all the folders.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of folders in body
     */
    @GetMapping("/folders")
    @Timed
    public ResponseEntity<List<FolderDTO>> getAllFolders(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Folders");
        Page<FolderDTO> page;
        if (eagerload) {
            page = folderService.findAllWithEagerRelationships(pageable);
        } else {
            page = folderService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/folders?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /folders/:id : get the "id" folder.
     *
     * @param id the id of the folderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the folderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/folders/{id}")
    @Timed
    public ResponseEntity<FolderDTO> getFolder(@PathVariable String id) {
        log.debug("REST request to get Folder : {}", id);
        Optional<FolderDTO> folderDTO = folderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(folderDTO);
    }

    /**
     * DELETE  /folders/:id : delete the "id" folder.
     *
     * @param id the id of the folderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/folders/{id}")
    @Timed
    public ResponseEntity<Void> deleteFolder(@PathVariable String id) {
        log.debug("REST request to delete Folder : {}", id);
        folderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
