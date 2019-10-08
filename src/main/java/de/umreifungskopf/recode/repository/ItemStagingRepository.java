package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ItemStaging;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemStaging entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemStagingRepository extends JpaRepository<ItemStaging, Long> {

}
