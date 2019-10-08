package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ExtendedTextLine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ExtendedTextLine}.
 */
public interface ExtendedTextLineService {

    /**
     * Save a extendedTextLine.
     *
     * @param extendedTextLine the entity to save.
     * @return the persisted entity.
     */
    ExtendedTextLine save(ExtendedTextLine extendedTextLine);

    /**
     * Get all the extendedTextLines.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExtendedTextLine> findAll(Pageable pageable);


    /**
     * Get the "id" extendedTextLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExtendedTextLine> findOne(Long id);

    /**
     * Delete the "id" extendedTextLine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
