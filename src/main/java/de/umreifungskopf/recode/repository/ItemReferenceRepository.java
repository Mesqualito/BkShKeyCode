package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ItemReference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemReference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemReferenceRepository extends JpaRepository<ItemReference, Long> {

}
