package de.umreifungskopf.recode.repository;
import de.umreifungskopf.recode.domain.ItemHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemHistoryRepository extends JpaRepository<ItemHistory, Long> {

}
