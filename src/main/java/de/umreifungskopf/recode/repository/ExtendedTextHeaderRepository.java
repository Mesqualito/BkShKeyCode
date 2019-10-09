package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ExtendedTextHeader;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExtendedTextHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTextHeaderRepository extends JpaRepository<ExtendedTextHeader, Long> {

}
