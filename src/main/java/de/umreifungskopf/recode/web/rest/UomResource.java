package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.Uom;
import de.umreifungskopf.recode.service.UomService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.umreifungskopf.recode.domain.Uom}.
 */
@RestController
@RequestMapping("/api")
public class UomResource {

    private final Logger log = LoggerFactory.getLogger(UomResource.class);

    private static final String ENTITY_NAME = "uom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UomService uomService;

    public UomResource(UomService uomService) {
        this.uomService = uomService;
    }

    /**
     * {@code POST  /uoms} : Create a new uom.
     *
     * @param uom the uom to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new uom, or with status {@code 400 (Bad Request)} if the uom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/uoms")
    public ResponseEntity<Uom> createUom(@Valid @RequestBody Uom uom) throws URISyntaxException {
        log.debug("REST request to save Uom : {}", uom);
        if (uom.getId() != null) {
            throw new BadRequestAlertException("A new uom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Uom result = uomService.save(uom);
        return ResponseEntity.created(new URI("/api/uoms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /uoms} : Updates an existing uom.
     *
     * @param uom the uom to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uom,
     * or with status {@code 400 (Bad Request)} if the uom is not valid,
     * or with status {@code 500 (Internal Server Error)} if the uom couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/uoms")
    public ResponseEntity<Uom> updateUom(@Valid @RequestBody Uom uom) throws URISyntaxException {
        log.debug("REST request to update Uom : {}", uom);
        if (uom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Uom result = uomService.save(uom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, uom.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /uoms} : get all the uoms.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of uoms in body.
     */
    @GetMapping("/uoms")
    public ResponseEntity<List<Uom>> getAllUoms(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("propposition-is-null".equals(filter)) {
            log.debug("REST request to get all Uoms where propPosition is null");
            return new ResponseEntity<>(uomService.findAllWherePropPositionIsNull(),
                    HttpStatus.OK);
        }
        if ("itembuom-is-null".equals(filter)) {
            log.debug("REST request to get all Uoms where itemBuom is null");
            return new ResponseEntity<>(uomService.findAllWhereItemBuomIsNull(),
                    HttpStatus.OK);
        }
        if ("itemsuom-is-null".equals(filter)) {
            log.debug("REST request to get all Uoms where itemSuom is null");
            return new ResponseEntity<>(uomService.findAllWhereItemSuomIsNull(),
                    HttpStatus.OK);
        }
        if ("refuom-is-null".equals(filter)) {
            log.debug("REST request to get all Uoms where refUom is null");
            return new ResponseEntity<>(uomService.findAllWhereRefUomIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Uoms");
        Page<Uom> page = uomService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /uoms/:id} : get the "id" uom.
     *
     * @param id the id of the uom to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the uom, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/uoms/{id}")
    public ResponseEntity<Uom> getUom(@PathVariable Long id) {
        log.debug("REST request to get Uom : {}", id);
        Optional<Uom> uom = uomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(uom);
    }

    /**
     * {@code DELETE  /uoms/:id} : delete the "id" uom.
     *
     * @param id the id of the uom to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/uoms/{id}")
    public ResponseEntity<Void> deleteUom(@PathVariable Long id) {
        log.debug("REST request to delete Uom : {}", id);
        uomService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
