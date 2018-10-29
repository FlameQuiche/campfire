package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.MoodDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Mood.
 */
public interface MoodService {

    /**
     * Save a mood.
     *
     * @param moodDTO the entity to save
     * @return the persisted entity
     */
    MoodDTO save(MoodDTO moodDTO);

    /**
     * Get all the moods.
     *
     * @return the list of entities
     */
    List<MoodDTO> findAll();


    /**
     * Get the "id" mood.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MoodDTO> findOne(String id);

    /**
     * Delete the "id" mood.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
