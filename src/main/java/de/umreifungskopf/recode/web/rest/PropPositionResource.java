package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.PropPosition;
import de.umreifungskopf.recode.service.PropPositionService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.umreifungskopf.recode.domain.PropPosition}.
 */
@RestController
@RequestMapping("/api")
public class PropPositionResource {

    private final Logger log = LoggerFactory.getLogger(PropPositionResource.class);

    private static final String ENTITY_NAME = "propPosition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropPositionService propPositionService;

    public PropPositionResource(PropPositionService propPositionService) {
        this.propPositionService = propPositionService;
    }

    /**
     * {@code POST  /prop-positions} : Create a new propPosition.
     *
     * @param propPosition the propPosition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new propPosition, or with status {@code 400 (Bad Request)} if the propPosition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prop-positions")
    public ResponseEntity<PropPosition> createPropPosition(@Valid @RequestBody PropPosition propPosition) throws URISyntaxException {
        log.debug("REST request to save PropPosition : {}", propPosition);
        if (propPosition.getId() != null) {
            throw new BadRequestAlertException("A new propPosition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropPosition result = propPositionService.save(propPosition);
        return ResponseEntity.created(new URI("/api/prop-positions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prop-positions} : Updates an existing propPosition.
     *
     * @param propPosition the propPosition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated propPosition,
     * or with status {@code 400 (Bad Request)} if the propPosition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the propPosition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prop-positions")
    public ResponseEntity<PropPosition> updatePropPosition(@Valid @RequestBody PropPosition propPosition) throws URISyntaxException {
        log.debug("REST request to update PropPosition : {}", propPosition);
        if (propPosition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropPosition result = propPositionService.save(propPosition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, propPosition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prop-positions} : get all the propPositions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of propPositions in body.
     */
    @GetMapping("/prop-positions")
    public ResponseEntity<List<PropPosition>> getAllPropPositions(Pageable pageable) {
        log.debug("REST request to get a page of PropPositions");
        Page<PropPosition> page = propPositionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /prop-positions/:id} : get the "id" propPosition.
     *
     * @param id the id of the propPosition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the propPosition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prop-positions/{id}")
    public ResponseEntity<PropPosition> getPropPosition(@PathVariable Long id) {
        log.debug("REST request to get PropPosition : {}", id);
        Optional<PropPosition> propPosition = propPositionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(propPosition);
    }

    /**
     * {@code DELETE  /prop-positions/:id} : delete the "id" propPosition.
     *
     * @param id the id of the propPosition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prop-positions/{id}")
    public ResponseEntity<Void> deletePropPosition(@PathVariable Long id) {
        log.debug("REST request to delete PropPosition : {}", id);
        propPositionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
