package de.umreifungskopf.recode.repository;

import de.umreifungskopf.recode.domain.PropPosition;

public interface PropPositionExtendedRepository extends PropPositionRepository {

    PropPosition findOneByPosValue(Integer id);
}
