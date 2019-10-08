package de.umreifungskopf.recode.repository;

import de.umreifungskopf.recode.domain.PropPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PropPosition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropPositionRepository extends JpaRepository<PropPosition, Long> {

}
