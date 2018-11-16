package org.teambasecompany.campfire.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<Bookmark> findAllByTeam(Pageable page, String team);
    Page<Bookmark> findAllByTeamAndTagsContainingIgnoreCaseOrNameContainingIgnoreCaseOrUrlContainingIgnoreCase(Pageable page,
                                                                                                        String team,
                                                                                                        String searchTag,
                                                                                                        String searchName,
                                                                                                        String searchUrl);

}
