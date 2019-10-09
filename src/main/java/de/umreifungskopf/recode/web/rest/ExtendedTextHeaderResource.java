package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ExtendedTextHeader;
import de.umreifungskopf.recode.service.ExtendedTextHeaderService;
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

/**
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ExtendedTextHeader}.
 */
@RestController
@RequestMapping("/api")
public class ExtendedTextHeaderResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedTextHeaderResource.class);

    private static final String ENTITY_NAME = "extendedTextHeader";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendedTextHeaderService extendedTextHeaderService;

    public ExtendedTextHeaderResource(ExtendedTextHeaderService extendedTextHeaderService) {
        this.extendedTextHeaderService = extendedTextHeaderService;
    }

    /**
     * {@code POST  /extended-text-headers} : Create a new extendedTextHeader.
     *
     * @param extendedTextHeader the extendedTextHeader to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendedTextHeader, or with status {@code 400 (Bad Request)} if the extendedTextHeader has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extended-text-headers")
    public ResponseEntity<ExtendedTextHeader> createExtendedTextHeader(@Valid @RequestBody ExtendedTextHeader extendedTextHeader) throws URISyntaxException {
        log.debug("REST request to save ExtendedTextHeader : {}", extendedTextHeader);
        if (extendedTextHeader.getId() != null) {
            throw new BadRequestAlertException("A new extendedTextHeader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendedTextHeader result = extendedTextHeaderService.save(extendedTextHeader);
        return ResponseEntity.created(new URI("/api/extended-text-headers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extended-text-headers} : Updates an existing extendedTextHeader.
     *
     * @param extendedTextHeader the extendedTextHeader to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendedTextHeader,
     * or with status {@code 400 (Bad Request)} if the extendedTextHeader is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendedTextHeader couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extended-text-headers")
    public ResponseEntity<ExtendedTextHeader> updateExtendedTextHeader(@Valid @RequestBody ExtendedTextHeader extendedTextHeader) throws URISyntaxException {
        log.debug("REST request to update ExtendedTextHeader : {}", extendedTextHeader);
        if (extendedTextHeader.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtendedTextHeader result = extendedTextHeaderService.save(extendedTextHeader);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendedTextHeader.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extended-text-headers} : get all the extendedTextHeaders.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendedTextHeaders in body.
     */
    @GetMapping("/extended-text-headers")
    public ResponseEntity<List<ExtendedTextHeader>> getAllExtendedTextHeaders(Pageable pageable) {
        log.debug("REST request to get a page of ExtendedTextHeaders");
        Page<ExtendedTextHeader> page = extendedTextHeaderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /extended-text-headers/:id} : get the "id" extendedTextHeader.
     *
     * @param id the id of the extendedTextHeader to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendedTextHeader, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extended-text-headers/{id}")
    public ResponseEntity<ExtendedTextHeader> getExtendedTextHeader(@PathVariable Long id) {
        log.debug("REST request to get ExtendedTextHeader : {}", id);
        Optional<ExtendedTextHeader> extendedTextHeader = extendedTextHeaderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(extendedTextHeader);
    }

    /**
     * {@code DELETE  /extended-text-headers/:id} : delete the "id" extendedTextHeader.
     *
     * @param id the id of the extendedTextHeader to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extended-text-headers/{id}")
    public ResponseEntity<Void> deleteExtendedTextHeader(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedTextHeader : {}", id);
        extendedTextHeaderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
