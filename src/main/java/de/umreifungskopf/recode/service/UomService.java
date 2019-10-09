package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.Uom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Uom}.
 */
public interface UomService {

    /**
     * Save a uom.
     *
     * @param uom the entity to save.
     * @return the persisted entity.
     */
    Uom save(Uom uom);

    /**
     * Get all the uoms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Uom> findAll(Pageable pageable);
    /**
     * Get all the UomDTO where PropPosition is {@code null}.
     *
     * @return the list of entities.
     */
    List<Uom> findAllWherePropPositionIsNull();
    /**
     * Get all the UomDTO where ItemBuom is {@code null}.
     *
     * @return the list of entities.
     */
    List<Uom> findAllWhereItemBuomIsNull();
    /**
     * Get all the UomDTO where ItemSuom is {@code null}.
     *
     * @return the list of entities.
     */
    List<Uom> findAllWhereItemSuomIsNull();
    /**
     * Get all the UomDTO where RefUom is {@code null}.
     *
     * @return the list of entities.
     */
    List<Uom> findAllWhereRefUomIsNull();


    /**
     * Get the "id" uom.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Uom> findOne(Long id);

    /**
     * Delete the "id" uom.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
