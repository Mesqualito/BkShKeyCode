package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ExtendedTextLine;
import de.umreifungskopf.recode.service.ExtendedTextLineService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ExtendedTextLine}.
 */
@RestController
@RequestMapping("/api")
public class ExtendedTextLineResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedTextLineResource.class);

    private static final String ENTITY_NAME = "extendedTextLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtendedTextLineService extendedTextLineService;

    public ExtendedTextLineResource(ExtendedTextLineService extendedTextLineService) {
        this.extendedTextLineService = extendedTextLineService;
    }

    /**
     * {@code POST  /extended-text-lines} : Create a new extendedTextLine.
     *
     * @param extendedTextLine the extendedTextLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extendedTextLine, or with status {@code 400 (Bad Request)} if the extendedTextLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extended-text-lines")
    public ResponseEntity<ExtendedTextLine> createExtendedTextLine(@Valid @RequestBody ExtendedTextLine extendedTextLine) throws URISyntaxException {
        log.debug("REST request to save ExtendedTextLine : {}", extendedTextLine);
        if (extendedTextLine.getId() != null) {
            throw new BadRequestAlertException("A new extendedTextLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendedTextLine result = extendedTextLineService.save(extendedTextLine);
        return ResponseEntity.created(new URI("/api/extended-text-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extended-text-lines} : Updates an existing extendedTextLine.
     *
     * @param extendedTextLine the extendedTextLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extendedTextLine,
     * or with status {@code 400 (Bad Request)} if the extendedTextLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extendedTextLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extended-text-lines")
    public ResponseEntity<ExtendedTextLine> updateExtendedTextLine(@Valid @RequestBody ExtendedTextLine extendedTextLine) throws URISyntaxException {
        log.debug("REST request to update ExtendedTextLine : {}", extendedTextLine);
        if (extendedTextLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtendedTextLine result = extendedTextLineService.save(extendedTextLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extendedTextLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extended-text-lines} : get all the extendedTextLines.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extendedTextLines in body.
     */
    @GetMapping("/extended-text-lines")
    public ResponseEntity<List<ExtendedTextLine>> getAllExtendedTextLines(Pageable pageable) {
        log.debug("REST request to get a page of ExtendedTextLines");
        Page<ExtendedTextLine> page = extendedTextLineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /extended-text-lines/:id} : get the "id" extendedTextLine.
     *
     * @param id the id of the extendedTextLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extendedTextLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extended-text-lines/{id}")
    public ResponseEntity<ExtendedTextLine> getExtendedTextLine(@PathVariable Long id) {
        log.debug("REST request to get ExtendedTextLine : {}", id);
        Optional<ExtendedTextLine> extendedTextLine = extendedTextLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(extendedTextLine);
    }

    /**
     * {@code DELETE  /extended-text-lines/:id} : delete the "id" extendedTextLine.
     *
     * @param id the id of the extendedTextLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extended-text-lines/{id}")
    public ResponseEntity<Void> deleteExtendedTextLine(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedTextLine : {}", id);
        extendedTextLineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
