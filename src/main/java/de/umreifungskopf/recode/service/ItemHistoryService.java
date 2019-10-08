package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ItemHistory}.
 */
public interface ItemHistoryService {

    /**
     * Save a itemHistory.
     *
     * @param itemHistory the entity to save.
     * @return the persisted entity.
     */
    ItemHistory save(ItemHistory itemHistory);

    /**
     * Get all the itemHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemHistory> findAll(Pageable pageable);


    /**
     * Get the "id" itemHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemHistory> findOne(Long id);

    /**
     * Delete the "id" itemHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
