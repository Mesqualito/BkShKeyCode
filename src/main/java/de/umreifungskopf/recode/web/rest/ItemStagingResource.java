package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ItemStaging;
import de.umreifungskopf.recode.service.ItemStagingService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ItemStaging}.
 */
@RestController
@RequestMapping("/api")
public class ItemStagingResource {

    private final Logger log = LoggerFactory.getLogger(ItemStagingResource.class);

    private static final String ENTITY_NAME = "itemStaging";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemStagingService itemStagingService;

    public ItemStagingResource(ItemStagingService itemStagingService) {
        this.itemStagingService = itemStagingService;
    }

    /**
     * {@code POST  /item-stagings} : Create a new itemStaging.
     *
     * @param itemStaging the itemStaging to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemStaging, or with status {@code 400 (Bad Request)} if the itemStaging has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-stagings")
    public ResponseEntity<ItemStaging> createItemStaging(@Valid @RequestBody ItemStaging itemStaging) throws URISyntaxException {
        log.debug("REST request to save ItemStaging : {}", itemStaging);
        if (itemStaging.getId() != null) {
            throw new BadRequestAlertException("A new itemStaging cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemStaging result = itemStagingService.save(itemStaging);
        return ResponseEntity.created(new URI("/api/item-stagings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-stagings} : Updates an existing itemStaging.
     *
     * @param itemStaging the itemStaging to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemStaging,
     * or with status {@code 400 (Bad Request)} if the itemStaging is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemStaging couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-stagings")
    public ResponseEntity<ItemStaging> updateItemStaging(@Valid @RequestBody ItemStaging itemStaging) throws URISyntaxException {
        log.debug("REST request to update ItemStaging : {}", itemStaging);
        if (itemStaging.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemStaging result = itemStagingService.save(itemStaging);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemStaging.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-stagings} : get all the itemStagings.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemStagings in body.
     */
    @GetMapping("/item-stagings")
    public ResponseEntity<List<ItemStaging>> getAllItemStagings(Pageable pageable) {
        log.debug("REST request to get a page of ItemStagings");
        Page<ItemStaging> page = itemStagingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-stagings/:id} : get the "id" itemStaging.
     *
     * @param id the id of the itemStaging to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemStaging, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-stagings/{id}")
    public ResponseEntity<ItemStaging> getItemStaging(@PathVariable Long id) {
        log.debug("REST request to get ItemStaging : {}", id);
        Optional<ItemStaging> itemStaging = itemStagingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemStaging);
    }

    /**
     * {@code DELETE  /item-stagings/:id} : delete the "id" itemStaging.
     *
     * @param id the id of the itemStaging to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-stagings/{id}")
    public ResponseEntity<Void> deleteItemStaging(@PathVariable Long id) {
        log.debug("REST request to delete ItemStaging : {}", id);
        itemStagingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
