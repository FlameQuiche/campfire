package org.teambasecompany.campfire.service.impl;

import org.mapstruct.ap.internal.util.Collections;
import org.teambasecompany.campfire.domain.User;
import org.teambasecompany.campfire.domain.UserDetails;
import org.teambasecompany.campfire.repository.UserDetailsRepository;
import org.teambasecompany.campfire.service.MailService;
import org.teambasecompany.campfire.service.TeamService;
import org.teambasecompany.campfire.domain.Team;
import org.teambasecompany.campfire.repository.TeamRepository;
import org.teambasecompany.campfire.service.UserService;
import org.teambasecompany.campfire.service.dto.TeamDTO;
import org.teambasecompany.campfire.service.mapper.TeamMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Team.
 */
@Service
public class TeamServiceImpl implements TeamService {

    private final Logger log = LoggerFactory.getLogger(TeamServiceImpl.class);

    private TeamRepository teamRepository;

    private TeamMapper teamMapper;

    private UserDetailsRepository userDetailsRepository;

    private UserService userService;

    private MailService mailService;

    public TeamServiceImpl(TeamRepository teamRepository, TeamMapper teamMapper, UserDetailsRepository userDetailsRepository, UserService userService, MailService mailService) {
        this.teamRepository = teamRepository;
        this.teamMapper = teamMapper;
        this.userDetailsRepository = userDetailsRepository;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * Create a team.
     *
     * @param teamDTO the entity to save
     * @param username creator of the team
     * @return the persisted entity
     */
    @Override
    public TeamDTO create(TeamDTO teamDTO, String username) {
        log.debug("Request to save Team : {}", teamDTO);

        Team team = teamMapper.toEntity(teamDTO);
        Optional<UserDetails> userDetails = userDetailsRepository.findByUser(username);
        if (userDetails.isPresent()) {
            team.setMembers(Collections.asSet(userDetails.get()));
        }
        team = teamRepository.save(team);
        return teamMapper.toDto(team);
    }

    /**
     * Save a team.
     *
     * @param teamDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeamDTO save(TeamDTO teamDTO) {
        log.debug("Request to save Team : {}", teamDTO);

        Team team = teamMapper.toEntity(teamDTO);
        team = teamRepository.save(team);
        return teamMapper.toDto(team);
    }

    /**
     * Get all the teams.
     *
     * @return the list of entities
     */
    @Override
    public List<TeamDTO> findAll(String username) {
        log.debug("Request to get all Teams");
        Optional<UserDetails> userDetails = userDetailsRepository.findByUser(username);
        return teamRepository.findAll().stream()
            .filter(t -> userDetails.isPresent() && t.getMembers().contains(userDetails.get()))
            .map(teamMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one team by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<TeamDTO> findOne(String id) {
        log.debug("Request to get Team : {}", id);
        return teamRepository.findById(id)
            .map(teamMapper::toDto);
    }

    /**
     * Delete the team by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Team : {}", id);
        teamRepository.deleteById(id);
    }

    /**
     * Send invitation to a user to join a specific team
     * @param name Username of invitation sender
     * @param mail target of the mail
     * @param teamId Team id to be joined
     */
    @Override
    public void sendInvitation(String name, String mail, String teamId) {
        User user = userService.getUserWithAuthoritiesByLogin(name).orElse(null);
        Team team = teamRepository.findById(teamId).orElse(null);
        String fromUser = user != null ? user.getLogin() : "CampFire";
        if (user != null && user.getFirstName() != null && user.getLastName() != null) {
            fromUser = user.getFirstName() + " " + user.getLastName();
        }
        Map<String, Object> params = new HashMap<>();
        params.put("fromUser", fromUser);
        params.put("team", team);
        mailService.sendEmailFromTemplate(mail, "mail/joinTeam", "email.join.title", params);
    }

    /**
     * Join team
     * @param teamId Team id to join
     * @param name of the user who join
     */
    @Override
    public void joinTeam(String teamId, String name) {
        teamRepository.findById(teamId).ifPresent(t -> {
            Optional<UserDetails> userDetails = userDetailsRepository.findByUser(name);
            if (userDetails.isPresent() && !t.getMembers().contains(userDetails.get())) {
                t.getMembers().add(userDetails.get());
                teamRepository.save(t);
            }
        });
    }
}
