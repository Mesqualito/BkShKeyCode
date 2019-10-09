package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemReference;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ItemReference}.
 */
public interface ItemReferenceService {

    /**
     * Save a itemReference.
     *
     * @param itemReference the entity to save.
     * @return the persisted entity.
     */
    ItemReference save(ItemReference itemReference);

    /**
     * Get all the itemReferences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemReference> findAll(Pageable pageable);


    /**
     * Get the "id" itemReference.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemReference> findOne(Long id);

    /**
     * Delete the "id" itemReference.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
