package org.teambasecompany.campfire.service.impl;

import org.teambasecompany.campfire.service.MoodService;
import org.teambasecompany.campfire.domain.Mood;
import org.teambasecompany.campfire.repository.MoodRepository;
import org.teambasecompany.campfire.service.dto.MoodDTO;
import org.teambasecompany.campfire.service.mapper.MoodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Mood.
 */
@Service
public class MoodServiceImpl implements MoodService {

    private final Logger log = LoggerFactory.getLogger(MoodServiceImpl.class);

    private MoodRepository moodRepository;

    private MoodMapper moodMapper;

    public MoodServiceImpl(MoodRepository moodRepository, MoodMapper moodMapper) {
        this.moodRepository = moodRepository;
        this.moodMapper = moodMapper;
    }

    /**
     * Save a mood.
     *
     * @param moodDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MoodDTO save(MoodDTO moodDTO) {
        log.debug("Request to save Mood : {}", moodDTO);

        Mood mood = moodMapper.toEntity(moodDTO);
        mood = moodRepository.save(mood);
        return moodMapper.toDto(mood);
    }

    /**
     * Get all the moods.
     *
     * @return the list of entities
     */
    @Override
    public List<MoodDTO> findAll() {
        log.debug("Request to get all Moods");
        return moodRepository.findAll().stream()
            .map(moodMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mood by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<MoodDTO> findOne(String id) {
        log.debug("Request to get Mood : {}", id);
        return moodRepository.findById(id)
            .map(moodMapper::toDto);
    }

    /**
     * Delete the mood by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Mood : {}", id);
        moodRepository.deleteById(id);
    }
}
