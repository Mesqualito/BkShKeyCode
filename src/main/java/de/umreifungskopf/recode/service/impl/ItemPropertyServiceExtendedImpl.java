package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.domain.ItemProperty;
import de.umreifungskopf.recode.repository.ItemPropertyExtendedRepository;
import de.umreifungskopf.recode.repository.PropPositionExtendedRepository;
import de.umreifungskopf.recode.service.ItemPropertyExtendedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Primary
@Service
@Transactional
public class ItemPropertyServiceExtendedImpl extends ItemPropertyServiceImpl implements ItemPropertyExtendedService {

    private final Logger log = LoggerFactory.getLogger(ItemPropertyServiceExtendedImpl.class);

    private final ItemPropertyExtendedRepository itemPropertyExtendedRepository;
    private final PropPositionExtendedRepository propPositionExtendedRepository;


    public ItemPropertyServiceExtendedImpl(ItemPropertyExtendedRepository itemPropertyExtendedRepository, PropPositionExtendedRepository propPositionExtendedRepository) {
        super(itemPropertyExtendedRepository);
        this.itemPropertyExtendedRepository = itemPropertyExtendedRepository;
        this.propPositionExtendedRepository = propPositionExtendedRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page findByCode(Pageable pageable, String code) {
        log.debug("Request to get all ItemProperties with Code : {}", code);

        return itemPropertyExtendedRepository.findByCode(pageable, code);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ItemProperty> findByCoderank(Pageable pageable, Long propertyId) {
        log.debug("Request to get all ItemProperties with Property-ID : {}", propertyId);

        return itemPropertyExtendedRepository.findByCoderank(pageable,
            propPositionExtendedRepository.findById(propertyId).get());
    }
}
