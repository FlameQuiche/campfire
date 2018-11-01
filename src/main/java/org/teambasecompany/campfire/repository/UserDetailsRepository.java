package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.UserDetails;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.teambasecompany.campfire.service.dto.UserDetailsDTO;

import java.util.Optional;


/**
 * Spring Data MongoDB repository for the UserDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserDetailsRepository extends MongoRepository<UserDetails, String> {
    Optional<UserDetails> findByUser(String username);
}
