package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.domain.PropPosition;
import de.umreifungskopf.recode.repository.PropPositionRepository;
import de.umreifungskopf.recode.service.PropPositionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PropPosition}.
 */
@Service
@Transactional
public class PropPositionServiceImpl implements PropPositionService {

    private final Logger log = LoggerFactory.getLogger(PropPositionServiceImpl.class);

    private final PropPositionRepository propPositionRepository;

    public PropPositionServiceImpl(PropPositionRepository propPositionRepository) {
        this.propPositionRepository = propPositionRepository;
    }

    /**
     * Save a propPosition.
     *
     * @param propPosition the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PropPosition save(PropPosition propPosition) {
        log.debug("Request to save PropPosition : {}", propPosition);
        return propPositionRepository.save(propPosition);
    }

    /**
     * Get all the propPositions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PropPosition> findAll(Pageable pageable) {
        log.debug("Request to get all PropPositions");
        return propPositionRepository.findAll(pageable);
    }


    /**
     * Get one propPosition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PropPosition> findOne(Long id) {
        log.debug("Request to get PropPosition : {}", id);
        return propPositionRepository.findById(id);
    }

    /**
     * Delete the propPosition by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PropPosition : {}", id);
        propPositionRepository.deleteById(id);
    }
}
