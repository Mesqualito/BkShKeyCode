package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ItemHistory;
import de.umreifungskopf.recode.service.ItemHistoryService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ItemHistory}.
 */
@RestController
@RequestMapping("/api")
public class ItemHistoryResource {

    private final Logger log = LoggerFactory.getLogger(ItemHistoryResource.class);

    private static final String ENTITY_NAME = "itemHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemHistoryService itemHistoryService;

    public ItemHistoryResource(ItemHistoryService itemHistoryService) {
        this.itemHistoryService = itemHistoryService;
    }

    /**
     * {@code POST  /item-histories} : Create a new itemHistory.
     *
     * @param itemHistory the itemHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemHistory, or with status {@code 400 (Bad Request)} if the itemHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-histories")
    public ResponseEntity<ItemHistory> createItemHistory(@Valid @RequestBody ItemHistory itemHistory) throws URISyntaxException {
        log.debug("REST request to save ItemHistory : {}", itemHistory);
        if (itemHistory.getId() != null) {
            throw new BadRequestAlertException("A new itemHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemHistory result = itemHistoryService.save(itemHistory);
        return ResponseEntity.created(new URI("/api/item-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-histories} : Updates an existing itemHistory.
     *
     * @param itemHistory the itemHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemHistory,
     * or with status {@code 400 (Bad Request)} if the itemHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-histories")
    public ResponseEntity<ItemHistory> updateItemHistory(@Valid @RequestBody ItemHistory itemHistory) throws URISyntaxException {
        log.debug("REST request to update ItemHistory : {}", itemHistory);
        if (itemHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemHistory result = itemHistoryService.save(itemHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-histories} : get all the itemHistories.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemHistories in body.
     */
    @GetMapping("/item-histories")
    public ResponseEntity<List<ItemHistory>> getAllItemHistories(Pageable pageable) {
        log.debug("REST request to get a page of ItemHistories");
        Page<ItemHistory> page = itemHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-histories/:id} : get the "id" itemHistory.
     *
     * @param id the id of the itemHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-histories/{id}")
    public ResponseEntity<ItemHistory> getItemHistory(@PathVariable Long id) {
        log.debug("REST request to get ItemHistory : {}", id);
        Optional<ItemHistory> itemHistory = itemHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemHistory);
    }

    /**
     * {@code DELETE  /item-histories/:id} : delete the "id" itemHistory.
     *
     * @param id the id of the itemHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-histories/{id}")
    public ResponseEntity<Void> deleteItemHistory(@PathVariable Long id) {
        log.debug("REST request to delete ItemHistory : {}", id);
        itemHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
