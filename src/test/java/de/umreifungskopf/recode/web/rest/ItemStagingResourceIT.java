package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ItemStaging;
import de.umreifungskopf.recode.repository.ItemStagingRepository;
import de.umreifungskopf.recode.service.ItemStagingService;
import de.umreifungskopf.recode.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static de.umreifungskopf.recode.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemStagingResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemStagingResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    @Autowired
    private ItemStagingRepository itemStagingRepository;

    @Autowired
    private ItemStagingService itemStagingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restItemStagingMockMvc;

    private ItemStaging itemStaging;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemStagingResource itemStagingResource = new ItemStagingResource(itemStagingService);
        this.restItemStagingMockMvc = MockMvcBuilders.standaloneSetup(itemStagingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemStaging createEntity(EntityManager em) {
        ItemStaging itemStaging = new ItemStaging()
            .timestamp(DEFAULT_TIMESTAMP);
        return itemStaging;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemStaging createUpdatedEntity(EntityManager em) {
        ItemStaging itemStaging = new ItemStaging()
            .timestamp(UPDATED_TIMESTAMP);
        return itemStaging;
    }

    @BeforeEach
    public void initTest() {
        itemStaging = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemStaging() throws Exception {
        int databaseSizeBeforeCreate = itemStagingRepository.findAll().size();

        // Create the ItemStaging
        restItemStagingMockMvc.perform(post("/api/item-stagings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemStaging)))
            .andExpect(status().isCreated());

        // Validate the ItemStaging in the database
        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeCreate + 1);
        ItemStaging testItemStaging = itemStagingList.get(itemStagingList.size() - 1);
        assertThat(testItemStaging.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createItemStagingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemStagingRepository.findAll().size();

        // Create the ItemStaging with an existing ID
        itemStaging.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemStagingMockMvc.perform(post("/api/item-stagings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemStaging)))
            .andExpect(status().isBadRequest());

        // Validate the ItemStaging in the database
        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemStagingRepository.findAll().size();
        // set the field null
        itemStaging.setTimestamp(null);

        // Create the ItemStaging, which fails.

        restItemStagingMockMvc.perform(post("/api/item-stagings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemStaging)))
            .andExpect(status().isBadRequest());

        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemStagings() throws Exception {
        // Initialize the database
        itemStagingRepository.saveAndFlush(itemStaging);

        // Get all the itemStagingList
        restItemStagingMockMvc.perform(get("/api/item-stagings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemStaging.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())));
    }
    
    @Test
    @Transactional
    public void getItemStaging() throws Exception {
        // Initialize the database
        itemStagingRepository.saveAndFlush(itemStaging);

        // Get the itemStaging
        restItemStagingMockMvc.perform(get("/api/item-stagings/{id}", itemStaging.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemStaging.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemStaging() throws Exception {
        // Get the itemStaging
        restItemStagingMockMvc.perform(get("/api/item-stagings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemStaging() throws Exception {
        // Initialize the database
        itemStagingService.save(itemStaging);

        int databaseSizeBeforeUpdate = itemStagingRepository.findAll().size();

        // Update the itemStaging
        ItemStaging updatedItemStaging = itemStagingRepository.findById(itemStaging.getId()).get();
        // Disconnect from session so that the updates on updatedItemStaging are not directly saved in db
        em.detach(updatedItemStaging);
        updatedItemStaging
            .timestamp(UPDATED_TIMESTAMP);

        restItemStagingMockMvc.perform(put("/api/item-stagings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemStaging)))
            .andExpect(status().isOk());

        // Validate the ItemStaging in the database
        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeUpdate);
        ItemStaging testItemStaging = itemStagingList.get(itemStagingList.size() - 1);
        assertThat(testItemStaging.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingItemStaging() throws Exception {
        int databaseSizeBeforeUpdate = itemStagingRepository.findAll().size();

        // Create the ItemStaging

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemStagingMockMvc.perform(put("/api/item-stagings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemStaging)))
            .andExpect(status().isBadRequest());

        // Validate the ItemStaging in the database
        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemStaging() throws Exception {
        // Initialize the database
        itemStagingService.save(itemStaging);

        int databaseSizeBeforeDelete = itemStagingRepository.findAll().size();

        // Delete the itemStaging
        restItemStagingMockMvc.perform(delete("/api/item-stagings/{id}", itemStaging.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemStaging> itemStagingList = itemStagingRepository.findAll();
        assertThat(itemStagingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemStaging.class);
        ItemStaging itemStaging1 = new ItemStaging();
        itemStaging1.setId(1L);
        ItemStaging itemStaging2 = new ItemStaging();
        itemStaging2.setId(itemStaging1.getId());
        assertThat(itemStaging1).isEqualTo(itemStaging2);
        itemStaging2.setId(2L);
        assertThat(itemStaging1).isNotEqualTo(itemStaging2);
        itemStaging1.setId(null);
        assertThat(itemStaging1).isNotEqualTo(itemStaging2);
    }
}
