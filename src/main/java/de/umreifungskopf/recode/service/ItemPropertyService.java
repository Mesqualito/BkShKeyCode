package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemProperty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ItemProperty}.
 */
public interface ItemPropertyService {

    /**
     * Save a itemProperty.
     *
     * @param itemProperty the entity to save.
     * @return the persisted entity.
     */
    ItemProperty save(ItemProperty itemProperty);

    /**
     * Get all the itemProperties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemProperty> findAll(Pageable pageable);


    /**
     * Get the "id" itemProperty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemProperty> findOne(Long id);

    /**
     * Delete the "id" itemProperty.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
