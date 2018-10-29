package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.Mood;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Mood entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoodRepository extends MongoRepository<Mood, String> {

}
