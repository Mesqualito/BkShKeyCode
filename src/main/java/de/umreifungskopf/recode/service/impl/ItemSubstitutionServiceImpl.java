package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.ItemSubstitutionService;
import de.umreifungskopf.recode.domain.ItemSubstitution;
import de.umreifungskopf.recode.repository.ItemSubstitutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemSubstitution}.
 */
@Service
@Transactional
public class ItemSubstitutionServiceImpl implements ItemSubstitutionService {

    private final Logger log = LoggerFactory.getLogger(ItemSubstitutionServiceImpl.class);

    private final ItemSubstitutionRepository itemSubstitutionRepository;

    public ItemSubstitutionServiceImpl(ItemSubstitutionRepository itemSubstitutionRepository) {
        this.itemSubstitutionRepository = itemSubstitutionRepository;
    }

    /**
     * Save a itemSubstitution.
     *
     * @param itemSubstitution the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemSubstitution save(ItemSubstitution itemSubstitution) {
        log.debug("Request to save ItemSubstitution : {}", itemSubstitution);
        return itemSubstitutionRepository.save(itemSubstitution);
    }

    /**
     * Get all the itemSubstitutions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemSubstitution> findAll(Pageable pageable) {
        log.debug("Request to get all ItemSubstitutions");
        return itemSubstitutionRepository.findAll(pageable);
    }


    /**
     * Get one itemSubstitution by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemSubstitution> findOne(Long id) {
        log.debug("Request to get ItemSubstitution : {}", id);
        return itemSubstitutionRepository.findById(id);
    }

    /**
     * Delete the itemSubstitution by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemSubstitution : {}", id);
        itemSubstitutionRepository.deleteById(id);
    }
}
