package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ExtendedTextLineService;
import de.umreifungskopf.recode.domain.ExtendedTextLine;
import de.umreifungskopf.recode.repository.ExtendedTextLineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ExtendedTextLine}.
 */
@Service
@Transactional
public class ExtendedTextLineServiceImpl implements ExtendedTextLineService {

    private final Logger log = LoggerFactory.getLogger(ExtendedTextLineServiceImpl.class);

    private final ExtendedTextLineRepository extendedTextLineRepository;

    public ExtendedTextLineServiceImpl(ExtendedTextLineRepository extendedTextLineRepository) {
        this.extendedTextLineRepository = extendedTextLineRepository;
    }

    /**
     * Save a extendedTextLine.
     *
     * @param extendedTextLine the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ExtendedTextLine save(ExtendedTextLine extendedTextLine) {
        log.debug("Request to save ExtendedTextLine : {}", extendedTextLine);
        return extendedTextLineRepository.save(extendedTextLine);
    }

    /**
     * Get all the extendedTextLines.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExtendedTextLine> findAll(Pageable pageable) {
        log.debug("Request to get all ExtendedTextLines");
        return extendedTextLineRepository.findAll(pageable);
    }


    /**
     * Get one extendedTextLine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ExtendedTextLine> findOne(Long id) {
        log.debug("Request to get ExtendedTextLine : {}", id);
        return extendedTextLineRepository.findById(id);
    }

    /**
     * Delete the extendedTextLine by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExtendedTextLine : {}", id);
        extendedTextLineRepository.deleteById(id);
    }
}
