package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.domain.Uom;
import de.umreifungskopf.recode.repository.UomRepository;
import de.umreifungskopf.recode.service.UomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Uom}.
 */
@Service
@Transactional
public class UomServiceImpl implements UomService {

    private final Logger log = LoggerFactory.getLogger(UomServiceImpl.class);

    private final UomRepository uomRepository;

    public UomServiceImpl(UomRepository uomRepository) {
        this.uomRepository = uomRepository;
    }

    /**
     * Save a uom.
     *
     * @param uom the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Uom save(Uom uom) {
        log.debug("Request to save Uom : {}", uom);
        return uomRepository.save(uom);
    }

    /**
     * Get all the uoms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Uom> findAll(Pageable pageable) {
        log.debug("Request to get all Uoms");
        return uomRepository.findAll(pageable);
    }



    /**
    *  Get all the uoms where PropPosition is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Uom> findAllWherePropPositionIsNull() {
        log.debug("Request to get all uoms where PropPosition is null");
        return StreamSupport
            .stream(uomRepository.findAll().spliterator(), false)
            .filter(uom -> uom.getPropPosition() == null)
            .collect(Collectors.toList());
    }


    /**
    *  Get all the uoms where ItemBuom is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Uom> findAllWhereItemBuomIsNull() {
        log.debug("Request to get all uoms where ItemBuom is null");
        return StreamSupport
            .stream(uomRepository.findAll().spliterator(), false)
            .filter(uom -> uom.getItemBuom() == null)
            .collect(Collectors.toList());
    }


    /**
    *  Get all the uoms where ItemSuom is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Uom> findAllWhereItemSuomIsNull() {
        log.debug("Request to get all uoms where ItemSuom is null");
        return StreamSupport
            .stream(uomRepository.findAll().spliterator(), false)
            .filter(uom -> uom.getItemSuom() == null)
            .collect(Collectors.toList());
    }


    /**
    *  Get all the uoms where RefUom is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Uom> findAllWhereRefUomIsNull() {
        log.debug("Request to get all uoms where RefUom is null");
        return StreamSupport
            .stream(uomRepository.findAll().spliterator(), false)
            .filter(uom -> uom.getRefUom() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one uom by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Uom> findOne(Long id) {
        log.debug("Request to get Uom : {}", id);
        return uomRepository.findById(id);
    }

    /**
     * Delete the uom by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Uom : {}", id);
        uomRepository.deleteById(id);
    }
}
