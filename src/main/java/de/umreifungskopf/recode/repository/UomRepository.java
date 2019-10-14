package de.umreifungskopf.recode.repository;

import de.umreifungskopf.recode.domain.Uom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Uom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UomRepository extends JpaRepository<Uom, Long> {

}
