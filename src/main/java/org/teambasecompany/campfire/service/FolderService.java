package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.FolderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Folder.
 */
public interface FolderService {

    /**
     * Save a folder.
     *
     * @param folderDTO the entity to save
     * @return the persisted entity
     */
    FolderDTO save(FolderDTO folderDTO);

    /**
     * Get all the folders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FolderDTO> findAll(Pageable pageable);

    /**
     * Get all the Folder with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<FolderDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" folder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FolderDTO> findOne(String id);

    /**
     * Delete the "id" folder.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
