package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ItemReferenceService;
import de.umreifungskopf.recode.domain.ItemReference;
import de.umreifungskopf.recode.repository.ItemReferenceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemReference}.
 */
@Service
@Transactional
public class ItemReferenceServiceImpl implements ItemReferenceService {

    private final Logger log = LoggerFactory.getLogger(ItemReferenceServiceImpl.class);

    private final ItemReferenceRepository itemReferenceRepository;

    public ItemReferenceServiceImpl(ItemReferenceRepository itemReferenceRepository) {
        this.itemReferenceRepository = itemReferenceRepository;
    }

    /**
     * Save a itemReference.
     *
     * @param itemReference the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemReference save(ItemReference itemReference) {
        log.debug("Request to save ItemReference : {}", itemReference);
        return itemReferenceRepository.save(itemReference);
    }

    /**
     * Get all the itemReferences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemReference> findAll(Pageable pageable) {
        log.debug("Request to get all ItemReferences");
        return itemReferenceRepository.findAll(pageable);
    }


    /**
     * Get one itemReference by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemReference> findOne(Long id) {
        log.debug("Request to get ItemReference : {}", id);
        return itemReferenceRepository.findById(id);
    }

    /**
     * Delete the itemReference by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemReference : {}", id);
        itemReferenceRepository.deleteById(id);
    }
}
