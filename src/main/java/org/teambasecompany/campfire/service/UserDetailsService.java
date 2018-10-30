package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.UserDetailsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing UserDetails.
 */
public interface UserDetailsService {

    /**
     * Save a userDetails.
     *
     * @param userDetailsDTO the entity to save
     * @return the persisted entity
     */
    UserDetailsDTO save(UserDetailsDTO userDetailsDTO);

    /**
     * Get all the userDetails.
     *
     * @return the list of entities
     */
    List<UserDetailsDTO> findAll();


    /**
     * Get the "id" userDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UserDetailsDTO> findOne(String id);

    /**
     * Delete the "id" userDetails.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
