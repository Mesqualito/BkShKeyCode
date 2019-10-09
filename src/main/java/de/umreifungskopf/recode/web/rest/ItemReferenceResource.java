package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ItemReference;
import de.umreifungskopf.recode.service.ItemReferenceService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ItemReference}.
 */
@RestController
@RequestMapping("/api")
public class ItemReferenceResource {

    private final Logger log = LoggerFactory.getLogger(ItemReferenceResource.class);

    private static final String ENTITY_NAME = "itemReference";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemReferenceService itemReferenceService;

    public ItemReferenceResource(ItemReferenceService itemReferenceService) {
        this.itemReferenceService = itemReferenceService;
    }

    /**
     * {@code POST  /item-references} : Create a new itemReference.
     *
     * @param itemReference the itemReference to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemReference, or with status {@code 400 (Bad Request)} if the itemReference has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-references")
    public ResponseEntity<ItemReference> createItemReference(@Valid @RequestBody ItemReference itemReference) throws URISyntaxException {
        log.debug("REST request to save ItemReference : {}", itemReference);
        if (itemReference.getId() != null) {
            throw new BadRequestAlertException("A new itemReference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemReference result = itemReferenceService.save(itemReference);
        return ResponseEntity.created(new URI("/api/item-references/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-references} : Updates an existing itemReference.
     *
     * @param itemReference the itemReference to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemReference,
     * or with status {@code 400 (Bad Request)} if the itemReference is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemReference couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-references")
    public ResponseEntity<ItemReference> updateItemReference(@Valid @RequestBody ItemReference itemReference) throws URISyntaxException {
        log.debug("REST request to update ItemReference : {}", itemReference);
        if (itemReference.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemReference result = itemReferenceService.save(itemReference);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemReference.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-references} : get all the itemReferences.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemReferences in body.
     */
    @GetMapping("/item-references")
    public ResponseEntity<List<ItemReference>> getAllItemReferences(Pageable pageable) {
        log.debug("REST request to get a page of ItemReferences");
        Page<ItemReference> page = itemReferenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-references/:id} : get the "id" itemReference.
     *
     * @param id the id of the itemReference to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemReference, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-references/{id}")
    public ResponseEntity<ItemReference> getItemReference(@PathVariable Long id) {
        log.debug("REST request to get ItemReference : {}", id);
        Optional<ItemReference> itemReference = itemReferenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemReference);
    }

    /**
     * {@code DELETE  /item-references/:id} : delete the "id" itemReference.
     *
     * @param id the id of the itemReference to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-references/{id}")
    public ResponseEntity<Void> deleteItemReference(@PathVariable Long id) {
        log.debug("REST request to delete ItemReference : {}", id);
        itemReferenceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
