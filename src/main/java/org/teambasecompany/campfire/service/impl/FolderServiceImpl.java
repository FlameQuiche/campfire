package org.teambasecompany.campfire.service.impl;

import org.teambasecompany.campfire.service.FolderService;
import org.teambasecompany.campfire.domain.Folder;
import org.teambasecompany.campfire.repository.FolderRepository;
import org.teambasecompany.campfire.service.dto.FolderDTO;
import org.teambasecompany.campfire.service.mapper.FolderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing Folder.
 */
@Service
public class FolderServiceImpl implements FolderService {

    private final Logger log = LoggerFactory.getLogger(FolderServiceImpl.class);

    private FolderRepository folderRepository;

    private FolderMapper folderMapper;

    public FolderServiceImpl(FolderRepository folderRepository, FolderMapper folderMapper) {
        this.folderRepository = folderRepository;
        this.folderMapper = folderMapper;
    }

    /**
     * Save a folder.
     *
     * @param folderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FolderDTO save(FolderDTO folderDTO) {
        log.debug("Request to save Folder : {}", folderDTO);

        Folder folder = folderMapper.toEntity(folderDTO);
        folder = folderRepository.save(folder);
        return folderMapper.toDto(folder);
    }

    /**
     * Get all the folders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<FolderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Folders");
        return folderRepository.findAll(pageable)
            .map(folderMapper::toDto);
    }

    /**
     * Get all the Folder with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<FolderDTO> findAllWithEagerRelationships(Pageable pageable) {
        return folderRepository.findAllWithEagerRelationships(pageable).map(folderMapper::toDto);
    }
    

    /**
     * Get one folder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<FolderDTO> findOne(String id) {
        log.debug("Request to get Folder : {}", id);
        return folderRepository.findOneWithEagerRelationships(id)
            .map(folderMapper::toDto);
    }

    /**
     * Delete the folder by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Folder : {}", id);
        folderRepository.deleteById(id);
    }
}
