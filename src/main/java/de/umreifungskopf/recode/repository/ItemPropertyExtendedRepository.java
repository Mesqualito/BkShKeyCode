package de.umreifungskopf.recode.repository;

import de.umreifungskopf.recode.domain.PropPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemPropertyExtendedRepository  extends ItemPropertyRepository {

     Page findByCode(Pageable pageable, String code);

     Page findByCoderank(Pageable pageable, PropPosition coderank);
}
