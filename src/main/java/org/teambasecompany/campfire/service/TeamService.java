package org.teambasecompany.campfire.service;

import org.teambasecompany.campfire.service.dto.TeamDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Team.
 */
public interface TeamService {

    /**
     * Save a team.
     *
     * @param teamDTO the entity to save
     * @return the persisted entity
     */
    TeamDTO save(TeamDTO teamDTO);

    /**
     * Save a team.
     *
     * @param teamDTO the entity to save
     * @param username
     * @return the persisted entity
     */
    TeamDTO create(TeamDTO teamDTO, String username);

    /**
     * Get all the teams.
     *
     * @return the list of entities
     */
    List<TeamDTO> findAll(String username);


    /**
     * Get the "id" team.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TeamDTO> findOne(String id);

    /**
     * Delete the "id" team.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Send invitation to a user to join a specific team
     * @param name Username of invitation sender
     * @param mail target of the mail
     * @param teamId Team id to be joined
     */
    void sendInvitation(String name, String mail, String teamId);

    /**
     * Join team
     * @param teamId Team id to join
     * @param name of the user who join
     */
    void joinTeam(String teamId, String name);
}
