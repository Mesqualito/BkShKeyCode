package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.ItemProperty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemPropertyExtendedService extends ItemPropertyService {

    Page<ItemProperty> findByCode(Pageable pageable, String code);

    Page<ItemProperty> findByCoderank(Pageable pageable, Long propertyId);
}
