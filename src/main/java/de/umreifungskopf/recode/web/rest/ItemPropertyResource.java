package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ItemProperty;
import de.umreifungskopf.recode.service.ItemPropertyService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ItemProperty}.
 */
@RestController
@RequestMapping("/api")
public class ItemPropertyResource {

    private final Logger log = LoggerFactory.getLogger(ItemPropertyResource.class);

    private static final String ENTITY_NAME = "itemProperty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPropertyService itemPropertyService;

    public ItemPropertyResource(ItemPropertyService itemPropertyService) {
        this.itemPropertyService = itemPropertyService;
    }

    /**
     * {@code POST  /item-properties} : Create a new itemProperty.
     *
     * @param itemProperty the itemProperty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemProperty, or with status {@code 400 (Bad Request)} if the itemProperty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-properties")
    public ResponseEntity<ItemProperty> createItemProperty(@Valid @RequestBody ItemProperty itemProperty) throws URISyntaxException {
        log.debug("REST request to save ItemProperty : {}", itemProperty);
        if (itemProperty.getId() != null) {
            throw new BadRequestAlertException("A new itemProperty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemProperty result = itemPropertyService.save(itemProperty);
        return ResponseEntity.created(new URI("/api/item-properties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-properties} : Updates an existing itemProperty.
     *
     * @param itemProperty the itemProperty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemProperty,
     * or with status {@code 400 (Bad Request)} if the itemProperty is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemProperty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-properties")
    public ResponseEntity<ItemProperty> updateItemProperty(@Valid @RequestBody ItemProperty itemProperty) throws URISyntaxException {
        log.debug("REST request to update ItemProperty : {}", itemProperty);
        if (itemProperty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemProperty result = itemPropertyService.save(itemProperty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemProperty.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-properties} : get all the itemProperties.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemProperties in body.
     */
    @GetMapping("/item-properties")
    public ResponseEntity<List<ItemProperty>> getAllItemProperties(Pageable pageable) {
        log.debug("REST request to get a page of ItemProperties");
        Page<ItemProperty> page = itemPropertyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-properties/:id} : get the "id" itemProperty.
     *
     * @param id the id of the itemProperty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemProperty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-properties/{id}")
    public ResponseEntity<ItemProperty> getItemProperty(@PathVariable Long id) {
        log.debug("REST request to get ItemProperty : {}", id);
        Optional<ItemProperty> itemProperty = itemPropertyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemProperty);
    }

    /**
     * {@code DELETE  /item-properties/:id} : delete the "id" itemProperty.
     *
     * @param id the id of the itemProperty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-properties/{id}")
    public ResponseEntity<Void> deleteItemProperty(@PathVariable Long id) {
        log.debug("REST request to delete ItemProperty : {}", id);
        itemPropertyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
