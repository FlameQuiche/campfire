package org.teambasecompany.campfire.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.teambasecompany.campfire.service.UserDetailsService;

import java.net.URISyntaxException;

/**
 * REST controller for managing UserDetails.
 */
@RestController
@RequestMapping("/api")
@Deprecated
public class UserDetailsResource {

    private final Logger log = LoggerFactory.getLogger(UserDetailsResource.class);

    private static final String ENTITY_NAME = "userDetails";

    private UserDetailsService userDetailsService;

    public UserDetailsResource(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * POST  /user-details : Create a new userDetails.
     *
     * @param userDetailsDTO the userDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userDetailsDTO, or with status 400 (Bad Request) if the userDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    /*@PostMapping("/user-details")
    @Timed
    public ResponseEntity<UserDetailsDTO> createUserDetails(@RequestBody UserDetailsDTO userDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save UserDetails : {}", userDetailsDTO);
        if (userDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new userDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserDetailsDTO result = userDetailsService.save(userDetailsDTO);
        return ResponseEntity.created(new URI("/api/user-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }*/

    /**
     * PUT  /user-details : Updates an existing userDetails.
     *
     * @param userDetailsDTO the userDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userDetailsDTO,
     * or with status 400 (Bad Request) if the userDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the userDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    /*@PutMapping("/user-details")
    @Timed
    public ResponseEntity<UserDetailsDTO> updateUserDetails(@RequestBody UserDetailsDTO userDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update UserDetails : {}", userDetailsDTO);
        if (userDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserDetailsDTO result = userDetailsService.save(userDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userDetailsDTO.getId().toString()))
            .body(result);
    }*/

    /**
     * GET  /user-details : get all the userDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userDetails in body
     */
    /*@GetMapping("/user-details")
    @Timed
    public List<UserDetailsDTO> getAllUserDetails() {
        log.debug("REST request to get all UserDetails");
        return userDetailsService.findAll();
    }*/

    /**
     * GET  /user-details/:id : get the "id" userDetails.
     *
     * @param id the id of the userDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userDetailsDTO, or with status 404 (Not Found)
     */
    /*@GetMapping("/user-details/{id}")
    @Timed
    public ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable String id) {
        log.debug("REST request to get UserDetails : {}", id);
        Optional<UserDetailsDTO> userDetailsDTO = userDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userDetailsDTO);
    }*/

    /**
     * DELETE  /user-details/:id : delete the "id" userDetails.
     *
     * @param id the id of the userDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    /*@DeleteMapping("/user-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserDetails(@PathVariable String id) {
        log.debug("REST request to delete UserDetails : {}", id);
        userDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }*/
}
