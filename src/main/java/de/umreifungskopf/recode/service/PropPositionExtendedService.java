package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.PropPosition;

import java.util.Optional;

public interface PropPositionExtendedService extends PropPositionService {

    Optional<PropPosition> findOneByPosValue(Integer id);

}
