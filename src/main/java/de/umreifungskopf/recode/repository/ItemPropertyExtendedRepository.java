package de.umreifungskopf.recode.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemPropertyExtendedRepository  extends ItemPropertyRepository {

     Page findByCode(Pageable pageable, String code);
}
