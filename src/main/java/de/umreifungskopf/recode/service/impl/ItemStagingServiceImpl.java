package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ItemStagingService;
import de.umreifungskopf.recode.domain.ItemStaging;
import de.umreifungskopf.recode.repository.ItemStagingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemStaging}.
 */
@Service
@Transactional
public class ItemStagingServiceImpl implements ItemStagingService {

    private final Logger log = LoggerFactory.getLogger(ItemStagingServiceImpl.class);

    private final ItemStagingRepository itemStagingRepository;

    public ItemStagingServiceImpl(ItemStagingRepository itemStagingRepository) {
        this.itemStagingRepository = itemStagingRepository;
    }

    /**
     * Save a itemStaging.
     *
     * @param itemStaging the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemStaging save(ItemStaging itemStaging) {
        log.debug("Request to save ItemStaging : {}", itemStaging);
        return itemStagingRepository.save(itemStaging);
    }

    /**
     * Get all the itemStagings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemStaging> findAll(Pageable pageable) {
        log.debug("Request to get all ItemStagings");
        return itemStagingRepository.findAll(pageable);
    }


    /**
     * Get one itemStaging by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemStaging> findOne(Long id) {
        log.debug("Request to get ItemStaging : {}", id);
        return itemStagingRepository.findById(id);
    }

    /**
     * Delete the itemStaging by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemStaging : {}", id);
        itemStagingRepository.deleteById(id);
    }
}
