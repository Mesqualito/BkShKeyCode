package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.domain.PropPosition;
import de.umreifungskopf.recode.repository.PropPositionExtendedRepository;
import de.umreifungskopf.recode.service.PropPositionExtendedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Primary
@Service
@Transactional
public class PropPositionServiceExtendedImpl extends PropPositionServiceImpl implements PropPositionExtendedService {

    private final Logger log = LoggerFactory.getLogger(PropPositionServiceExtendedImpl.class);

    private final PropPositionExtendedRepository propPositionExtendedRepository;

    public PropPositionServiceExtendedImpl(PropPositionExtendedRepository propPositionExtendedRepository) {
        super(propPositionExtendedRepository);
        this.propPositionExtendedRepository = propPositionExtendedRepository;
    }

    @Override
    public Optional<PropPosition> findOneByPosValue(Integer id) {
        log.debug("Request to get PropPosition with posValue : {}", id);
        return Optional.of(propPositionExtendedRepository.findOneByPosValue(id));
    }
}
