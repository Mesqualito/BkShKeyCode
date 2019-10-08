package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ItemSubstitution;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemSubstitution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemSubstitutionRepository extends JpaRepository<ItemSubstitution, Long> {

}
