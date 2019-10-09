package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ItemProperty;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemProperty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPropertyRepository extends JpaRepository<ItemProperty, Long> {

}
