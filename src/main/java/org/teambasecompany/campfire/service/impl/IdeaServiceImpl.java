package org.teambasecompany.campfire.service.impl;

import org.teambasecompany.campfire.service.IdeaService;
import org.teambasecompany.campfire.domain.Idea;
import org.teambasecompany.campfire.repository.IdeaRepository;
import org.teambasecompany.campfire.service.dto.IdeaDTO;
import org.teambasecompany.campfire.service.mapper.IdeaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing Idea.
 */
@Service
public class IdeaServiceImpl implements IdeaService {

    private final Logger log = LoggerFactory.getLogger(IdeaServiceImpl.class);

    private IdeaRepository ideaRepository;

    private IdeaMapper ideaMapper;

    public IdeaServiceImpl(IdeaRepository ideaRepository, IdeaMapper ideaMapper) {
        this.ideaRepository = ideaRepository;
        this.ideaMapper = ideaMapper;
    }

    /**
     * Save a idea.
     *
     * @param ideaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IdeaDTO save(IdeaDTO ideaDTO) {
        log.debug("Request to save Idea : {}", ideaDTO);

        Idea idea = ideaMapper.toEntity(ideaDTO);
        idea = ideaRepository.save(idea);
        return ideaMapper.toDto(idea);
    }

    /**
     * Get all the ideas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<IdeaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ideas");
        return ideaRepository.findAll(pageable)
            .map(ideaMapper::toDto);
    }


    /**
     * Get one idea by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<IdeaDTO> findOne(String id) {
        log.debug("Request to get Idea : {}", id);
        return ideaRepository.findById(id)
            .map(ideaMapper::toDto);
    }

    /**
     * Delete the idea by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Idea : {}", id);
        ideaRepository.deleteById(id);
    }
}
