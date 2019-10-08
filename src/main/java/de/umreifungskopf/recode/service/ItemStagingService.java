package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemStaging;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ItemStaging}.
 */
public interface ItemStagingService {

    /**
     * Save a itemStaging.
     *
     * @param itemStaging the entity to save.
     * @return the persisted entity.
     */
    ItemStaging save(ItemStaging itemStaging);

    /**
     * Get all the itemStagings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemStaging> findAll(Pageable pageable);


    /**
     * Get the "id" itemStaging.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemStaging> findOne(Long id);

    /**
     * Delete the "id" itemStaging.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
