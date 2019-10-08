package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ExtendedTextLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExtendedTextLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTextLineRepository extends JpaRepository<ExtendedTextLine, Long> {

}
