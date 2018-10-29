package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.Bookmark;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Bookmark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookmarkRepository extends MongoRepository<Bookmark, String> {

}
