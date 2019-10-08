package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ExtendedTextHeaderService;
import de.umreifungskopf.recode.domain.ExtendedTextHeader;
import de.umreifungskopf.recode.repository.ExtendedTextHeaderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ExtendedTextHeader}.
 */
@Service
@Transactional
public class ExtendedTextHeaderServiceImpl implements ExtendedTextHeaderService {

    private final Logger log = LoggerFactory.getLogger(ExtendedTextHeaderServiceImpl.class);

    private final ExtendedTextHeaderRepository extendedTextHeaderRepository;

    public ExtendedTextHeaderServiceImpl(ExtendedTextHeaderRepository extendedTextHeaderRepository) {
        this.extendedTextHeaderRepository = extendedTextHeaderRepository;
    }

    /**
     * Save a extendedTextHeader.
     *
     * @param extendedTextHeader the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ExtendedTextHeader save(ExtendedTextHeader extendedTextHeader) {
        log.debug("Request to save ExtendedTextHeader : {}", extendedTextHeader);
        return extendedTextHeaderRepository.save(extendedTextHeader);
    }

    /**
     * Get all the extendedTextHeaders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExtendedTextHeader> findAll(Pageable pageable) {
        log.debug("Request to get all ExtendedTextHeaders");
        return extendedTextHeaderRepository.findAll(pageable);
    }


    /**
     * Get one extendedTextHeader by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ExtendedTextHeader> findOne(Long id) {
        log.debug("Request to get ExtendedTextHeader : {}", id);
        return extendedTextHeaderRepository.findById(id);
    }

    /**
     * Delete the extendedTextHeader by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExtendedTextHeader : {}", id);
        extendedTextHeaderRepository.deleteById(id);
    }
}
