package de.umreifungskopf.recode.service.impl;

import de.umreifungskopf.recode.service.RankService;
import de.umreifungskopf.recode.domain.Rank;
import de.umreifungskopf.recode.repository.RankRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Rank}.
 */
@Service
@Transactional
public class RankServiceImpl implements RankService {

    private final Logger log = LoggerFactory.getLogger(RankServiceImpl.class);

    private final RankRepository rankRepository;

    public RankServiceImpl(RankRepository rankRepository) {
        this.rankRepository = rankRepository;
    }

    /**
     * Save a rank.
     *
     * @param rank the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Rank save(Rank rank) {
        log.debug("Request to save Rank : {}", rank);
        return rankRepository.save(rank);
    }

    /**
     * Get all the ranks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Rank> findAll(Pageable pageable) {
        log.debug("Request to get all Ranks");
        return rankRepository.findAll(pageable);
    }



    /**
    *  Get all the ranks where SubsRank is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Rank> findAllWhereSubsRankIsNull() {
        log.debug("Request to get all ranks where SubsRank is null");
        return StreamSupport
            .stream(rankRepository.findAll().spliterator(), false)
            .filter(rank -> rank.getSubsRank() == null)
            .collect(Collectors.toList());
    }


    /**
    *  Get all the ranks where RefRank is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Rank> findAllWhereRefRankIsNull() {
        log.debug("Request to get all ranks where RefRank is null");
        return StreamSupport
            .stream(rankRepository.findAll().spliterator(), false)
            .filter(rank -> rank.getRefRank() == null)
            .collect(Collectors.toList());
    }


    /**
    *  Get all the ranks where ShcodeRank is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Rank> findAllWhereShcodeRankIsNull() {
        log.debug("Request to get all ranks where ShcodeRank is null");
        return StreamSupport
            .stream(rankRepository.findAll().spliterator(), false)
            .filter(rank -> rank.getShcodeRank() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one rank by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Rank> findOne(Long id) {
        log.debug("Request to get Rank : {}", id);
        return rankRepository.findById(id);
    }

    /**
     * Delete the rank by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rank : {}", id);
        rankRepository.deleteById(id);
    }
}
