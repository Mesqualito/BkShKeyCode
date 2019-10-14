package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.PropPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link PropPosition}.
 */
public interface PropPositionService {

    /**
     * Save a propPosition.
     *
     * @param propPosition the entity to save.
     * @return the persisted entity.
     */
    PropPosition save(PropPosition propPosition);

    /**
     * Get all the propPositions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PropPosition> findAll(Pageable pageable);


    /**
     * Get the "id" propPosition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PropPosition> findOne(Long id);

    /**
     * Delete the "id" propPosition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
