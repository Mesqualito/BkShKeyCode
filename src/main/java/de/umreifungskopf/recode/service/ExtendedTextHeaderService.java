package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ExtendedTextHeader;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ExtendedTextHeader}.
 */
public interface ExtendedTextHeaderService {

    /**
     * Save a extendedTextHeader.
     *
     * @param extendedTextHeader the entity to save.
     * @return the persisted entity.
     */
    ExtendedTextHeader save(ExtendedTextHeader extendedTextHeader);

    /**
     * Get all the extendedTextHeaders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExtendedTextHeader> findAll(Pageable pageable);


    /**
     * Get the "id" extendedTextHeader.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExtendedTextHeader> findOne(Long id);

    /**
     * Delete the "id" extendedTextHeader.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
