package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.Idea;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Idea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdeaRepository extends MongoRepository<Idea, String> {

}
