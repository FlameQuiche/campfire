package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.IdeaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Idea.
 */
public interface IdeaService {

    /**
     * Save a idea.
     *
     * @param ideaDTO the entity to save
     * @return the persisted entity
     */
    IdeaDTO save(IdeaDTO ideaDTO);

    /**
     * Get all the ideas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IdeaDTO> findAll(Pageable pageable);


    /**
     * Get the "id" idea.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<IdeaDTO> findOne(String id);

    /**
     * Delete the "id" idea.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
