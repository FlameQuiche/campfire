package org.teambasecompany.campfire.service.impl;

import org.teambasecompany.campfire.service.UserDetailsService;
import org.teambasecompany.campfire.domain.UserDetails;
import org.teambasecompany.campfire.repository.UserDetailsRepository;
import org.teambasecompany.campfire.service.dto.UserDetailsDTO;
import org.teambasecompany.campfire.service.mapper.UserDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserDetails.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private UserDetailsRepository userDetailsRepository;

    private UserDetailsMapper userDetailsMapper;

    public UserDetailsServiceImpl(UserDetailsRepository userDetailsRepository, UserDetailsMapper userDetailsMapper) {
        this.userDetailsRepository = userDetailsRepository;
        this.userDetailsMapper = userDetailsMapper;
    }

    /**
     * Save a userDetails.
     *
     * @param userDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserDetailsDTO save(UserDetailsDTO userDetailsDTO) {
        log.debug("Request to save UserDetails : {}", userDetailsDTO);

        UserDetails userDetails = userDetailsMapper.toEntity(userDetailsDTO);
        userDetails = userDetailsRepository.save(userDetails);
        return userDetailsMapper.toDto(userDetails);
    }

    /**
     * Get all the userDetails.
     *
     * @return the list of entities
     */
    @Override
    public List<UserDetailsDTO> findAll() {
        log.debug("Request to get all UserDetails");
        return userDetailsRepository.findAll().stream()
            .map(userDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<UserDetailsDTO> findOne(String id) {
        log.debug("Request to get UserDetails : {}", id);
        return userDetailsRepository.findByUser(id)
            .map(userDetailsMapper::toDto);
    }

    /**
     * Delete the userDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete UserDetails : {}", id);
        userDetailsRepository.deleteById(id);
    }
}
