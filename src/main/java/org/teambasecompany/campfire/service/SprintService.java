package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.SprintDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Sprint.
 */
public interface SprintService {

    /**
     * Save a sprint.
     *
     * @param sprintDTO the entity to save
     * @return the persisted entity
     */
    SprintDTO save(SprintDTO sprintDTO);

    /**
     * Get all the sprints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SprintDTO> findAll(Pageable pageable);


    /**
     * Get the "id" sprint.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SprintDTO> findOne(String id);

    /**
     * Delete the "id" sprint.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
