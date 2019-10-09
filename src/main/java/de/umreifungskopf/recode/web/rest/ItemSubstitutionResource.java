package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.domain.ItemSubstitution;
import de.umreifungskopf.recode.service.ItemSubstitutionService;
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
 * REST controller for managing {@link de.umreifungskopf.recode.domain.ItemSubstitution}.
 */
@RestController
@RequestMapping("/api")
public class ItemSubstitutionResource {

    private final Logger log = LoggerFactory.getLogger(ItemSubstitutionResource.class);

    private static final String ENTITY_NAME = "itemSubstitution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemSubstitutionService itemSubstitutionService;

    public ItemSubstitutionResource(ItemSubstitutionService itemSubstitutionService) {
        this.itemSubstitutionService = itemSubstitutionService;
    }

    /**
     * {@code POST  /item-substitutions} : Create a new itemSubstitution.
     *
     * @param itemSubstitution the itemSubstitution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemSubstitution, or with status {@code 400 (Bad Request)} if the itemSubstitution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-substitutions")
    public ResponseEntity<ItemSubstitution> createItemSubstitution(@Valid @RequestBody ItemSubstitution itemSubstitution) throws URISyntaxException {
        log.debug("REST request to save ItemSubstitution : {}", itemSubstitution);
        if (itemSubstitution.getId() != null) {
            throw new BadRequestAlertException("A new itemSubstitution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemSubstitution result = itemSubstitutionService.save(itemSubstitution);
        return ResponseEntity.created(new URI("/api/item-substitutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-substitutions} : Updates an existing itemSubstitution.
     *
     * @param itemSubstitution the itemSubstitution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemSubstitution,
     * or with status {@code 400 (Bad Request)} if the itemSubstitution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemSubstitution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-substitutions")
    public ResponseEntity<ItemSubstitution> updateItemSubstitution(@Valid @RequestBody ItemSubstitution itemSubstitution) throws URISyntaxException {
        log.debug("REST request to update ItemSubstitution : {}", itemSubstitution);
        if (itemSubstitution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemSubstitution result = itemSubstitutionService.save(itemSubstitution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemSubstitution.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-substitutions} : get all the itemSubstitutions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemSubstitutions in body.
     */
    @GetMapping("/item-substitutions")
    public ResponseEntity<List<ItemSubstitution>> getAllItemSubstitutions(Pageable pageable) {
        log.debug("REST request to get a page of ItemSubstitutions");
        Page<ItemSubstitution> page = itemSubstitutionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-substitutions/:id} : get the "id" itemSubstitution.
     *
     * @param id the id of the itemSubstitution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemSubstitution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-substitutions/{id}")
    public ResponseEntity<ItemSubstitution> getItemSubstitution(@PathVariable Long id) {
        log.debug("REST request to get ItemSubstitution : {}", id);
        Optional<ItemSubstitution> itemSubstitution = itemSubstitutionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemSubstitution);
    }

    /**
     * {@code DELETE  /item-substitutions/:id} : delete the "id" itemSubstitution.
     *
     * @param id the id of the itemSubstitution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-substitutions/{id}")
    public ResponseEntity<Void> deleteItemSubstitution(@PathVariable Long id) {
        log.debug("REST request to delete ItemSubstitution : {}", id);
        itemSubstitutionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
