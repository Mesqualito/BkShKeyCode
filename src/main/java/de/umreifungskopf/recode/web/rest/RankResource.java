package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.Rank;
import de.umreifungskopf.recode.service.RankService;
import de.umreifungskopf.recode.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link de.umreifungskopf.recode.domain.Rank}.
 */
@RestController
@RequestMapping("/api")
public class RankResource {

    private final Logger log = LoggerFactory.getLogger(RankResource.class);

    private static final String ENTITY_NAME = "rank";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RankService rankService;

    public RankResource(RankService rankService) {
        this.rankService = rankService;
    }

    /**
     * {@code POST  /ranks} : Create a new rank.
     *
     * @param rank the rank to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rank, or with status {@code 400 (Bad Request)} if the rank has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ranks")
    public ResponseEntity<Rank> createRank(@Valid @RequestBody Rank rank) throws URISyntaxException {
        log.debug("REST request to save Rank : {}", rank);
        if (rank.getId() != null) {
            throw new BadRequestAlertException("A new rank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rank result = rankService.save(rank);
        return ResponseEntity.created(new URI("/api/ranks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ranks} : Updates an existing rank.
     *
     * @param rank the rank to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rank,
     * or with status {@code 400 (Bad Request)} if the rank is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rank couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ranks")
    public ResponseEntity<Rank> updateRank(@Valid @RequestBody Rank rank) throws URISyntaxException {
        log.debug("REST request to update Rank : {}", rank);
        if (rank.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rank result = rankService.save(rank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rank.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ranks} : get all the ranks.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ranks in body.
     */
    @GetMapping("/ranks")
    public ResponseEntity<List<Rank>> getAllRanks(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("subsrank-is-null".equals(filter)) {
            log.debug("REST request to get all Ranks where subsRank is null");
            return new ResponseEntity<>(rankService.findAllWhereSubsRankIsNull(),
                    HttpStatus.OK);
        }
        if ("refrank-is-null".equals(filter)) {
            log.debug("REST request to get all Ranks where refRank is null");
            return new ResponseEntity<>(rankService.findAllWhereRefRankIsNull(),
                    HttpStatus.OK);
        }
        if ("shcoderank-is-null".equals(filter)) {
            log.debug("REST request to get all Ranks where shcodeRank is null");
            return new ResponseEntity<>(rankService.findAllWhereShcodeRankIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Ranks");
        Page<Rank> page = rankService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ranks/:id} : get the "id" rank.
     *
     * @param id the id of the rank to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rank, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ranks/{id}")
    public ResponseEntity<Rank> getRank(@PathVariable Long id) {
        log.debug("REST request to get Rank : {}", id);
        Optional<Rank> rank = rankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rank);
    }

    /**
     * {@code DELETE  /ranks/:id} : delete the "id" rank.
     *
     * @param id the id of the rank to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ranks/{id}")
    public ResponseEntity<Void> deleteRank(@PathVariable Long id) {
        log.debug("REST request to delete Rank : {}", id);
        rankService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
