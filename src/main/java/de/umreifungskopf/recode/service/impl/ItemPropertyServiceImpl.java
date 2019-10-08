package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ItemPropertyService;
import de.umreifungskopf.recode.domain.ItemProperty;
import de.umreifungskopf.recode.repository.ItemPropertyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemProperty}.
 */
@Service
@Transactional
public class ItemPropertyServiceImpl implements ItemPropertyService {

    private final Logger log = LoggerFactory.getLogger(ItemPropertyServiceImpl.class);

    private final ItemPropertyRepository itemPropertyRepository;

    public ItemPropertyServiceImpl(ItemPropertyRepository itemPropertyRepository) {
        this.itemPropertyRepository = itemPropertyRepository;
    }

    /**
     * Save a itemProperty.
     *
     * @param itemProperty the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemProperty save(ItemProperty itemProperty) {
        log.debug("Request to save ItemProperty : {}", itemProperty);
        return itemPropertyRepository.save(itemProperty);
    }

    /**
     * Get all the itemProperties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemProperty> findAll(Pageable pageable) {
        log.debug("Request to get all ItemProperties");
        return itemPropertyRepository.findAll(pageable);
    }


    /**
     * Get one itemProperty by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemProperty> findOne(Long id) {
        log.debug("Request to get ItemProperty : {}", id);
        return itemPropertyRepository.findById(id);
    }

    /**
     * Delete the itemProperty by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemProperty : {}", id);
        itemPropertyRepository.deleteById(id);
    }
}
