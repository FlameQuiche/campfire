package org.teambasecompany.campfire.service.impl;

import org.teambasecompany.campfire.service.SprintService;
import org.teambasecompany.campfire.domain.Sprint;
import org.teambasecompany.campfire.repository.SprintRepository;
import org.teambasecompany.campfire.service.dto.SprintDTO;
import org.teambasecompany.campfire.service.mapper.SprintMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing Sprint.
 */
@Service
public class SprintServiceImpl implements SprintService {

    private final Logger log = LoggerFactory.getLogger(SprintServiceImpl.class);

    private SprintRepository sprintRepository;

    private SprintMapper sprintMapper;

    public SprintServiceImpl(SprintRepository sprintRepository, SprintMapper sprintMapper) {
        this.sprintRepository = sprintRepository;
        this.sprintMapper = sprintMapper;
    }

    /**
     * Save a sprint.
     *
     * @param sprintDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SprintDTO save(SprintDTO sprintDTO) {
        log.debug("Request to save Sprint : {}", sprintDTO);

        Sprint sprint = sprintMapper.toEntity(sprintDTO);
        sprint = sprintRepository.save(sprint);
        return sprintMapper.toDto(sprint);
    }

    /**
     * Get all the sprints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<SprintDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Sprints");
        return sprintRepository.findAll(pageable)
            .map(sprintMapper::toDto);
    }


    /**
     * Get one sprint by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<SprintDTO> findOne(String id) {
        log.debug("Request to get Sprint : {}", id);
        return sprintRepository.findById(id)
            .map(sprintMapper::toDto);
    }

    /**
     * Delete the sprint by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Sprint : {}", id);
        sprintRepository.deleteById(id);
    }
}
