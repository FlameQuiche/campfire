package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.Action;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Action entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionRepository extends MongoRepository<Action, String> {

}
