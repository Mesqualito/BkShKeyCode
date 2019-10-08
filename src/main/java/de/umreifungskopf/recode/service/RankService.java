package de.umreifungskopf.recode.service;

import de.umreifungskopf.recode.domain.Rank;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Rank}.
 */
public interface RankService {

    /**
     * Save a rank.
     *
     * @param rank the entity to save.
     * @return the persisted entity.
     */
    Rank save(Rank rank);

    /**
     * Get all the ranks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Rank> findAll(Pageable pageable);
    /**
     * Get all the RankDTO where SubsRank is {@code null}.
     *
     * @return the list of entities.
     */
    List<Rank> findAllWhereSubsRankIsNull();
    /**
     * Get all the RankDTO where RefRank is {@code null}.
     *
     * @return the list of entities.
     */
    List<Rank> findAllWhereRefRankIsNull();
    /**
     * Get all the RankDTO where ShcodeRank is {@code null}.
     *
     * @return the list of entities.
     */
    List<Rank> findAllWhereShcodeRankIsNull();


    /**
     * Get the "id" rank.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Rank> findOne(Long id);

    /**
     * Delete the "id" rank.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
