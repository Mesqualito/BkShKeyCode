package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemSubstitution;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ItemSubstitution}.
 */
public interface ItemSubstitutionService {

    /**
     * Save a itemSubstitution.
     *
     * @param itemSubstitution the entity to save.
     * @return the persisted entity.
     */
    ItemSubstitution save(ItemSubstitution itemSubstitution);

    /**
     * Get all the itemSubstitutions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemSubstitution> findAll(Pageable pageable);


    /**
     * Get the "id" itemSubstitution.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemSubstitution> findOne(Long id);

    /**
     * Delete the "id" itemSubstitution.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
