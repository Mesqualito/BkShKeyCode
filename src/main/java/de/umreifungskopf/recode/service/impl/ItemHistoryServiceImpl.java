package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ItemHistoryService;
import de.umreifungskopf.recode.domain.ItemHistory;
import de.umreifungskopf.recode.repository.ItemHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemHistory}.
 */
@Service
@Transactional
public class ItemHistoryServiceImpl implements ItemHistoryService {

    private final Logger log = LoggerFactory.getLogger(ItemHistoryServiceImpl.class);

    private final ItemHistoryRepository itemHistoryRepository;

    public ItemHistoryServiceImpl(ItemHistoryRepository itemHistoryRepository) {
        this.itemHistoryRepository = itemHistoryRepository;
    }

    /**
     * Save a itemHistory.
     *
     * @param itemHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemHistory save(ItemHistory itemHistory) {
        log.debug("Request to save ItemHistory : {}", itemHistory);
        return itemHistoryRepository.save(itemHistory);
    }

    /**
     * Get all the itemHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemHistory> findAll(Pageable pageable) {
        log.debug("Request to get all ItemHistories");
        return itemHistoryRepository.findAll(pageable);
    }


    /**
     * Get one itemHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemHistory> findOne(Long id) {
        log.debug("Request to get ItemHistory : {}", id);
        return itemHistoryRepository.findById(id);
    }

    /**
     * Delete the itemHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemHistory : {}", id);
        itemHistoryRepository.deleteById(id);
    }
}
