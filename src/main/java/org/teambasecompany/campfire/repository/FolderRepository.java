package org.teambasecompany.campfire.repository;

import org.teambasecompany.campfire.domain.Folder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Folder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FolderRepository extends MongoRepository<Folder, String> {
    @Query("{}")
    Page<Folder> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Folder> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Folder> findOneWithEagerRelationships(String id);

}
