package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ItemHistory;
import de.umreifungskopf.recode.repository.ItemHistoryRepository;
import de.umreifungskopf.recode.service.ItemHistoryService;
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
 * Integration tests for the {@link ItemHistoryResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemHistoryResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_MODIFICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_MODIFICATION_DATE = Instant.ofEpochMilli(-1L);

    private static final Boolean DEFAULT_MODIFIED = false;
    private static final Boolean UPDATED_MODIFIED = true;

    @Autowired
    private ItemHistoryRepository itemHistoryRepository;

    @Autowired
    private ItemHistoryService itemHistoryService;

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

    private MockMvc restItemHistoryMockMvc;

    private ItemHistory itemHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemHistoryResource itemHistoryResource = new ItemHistoryResource(itemHistoryService);
        this.restItemHistoryMockMvc = MockMvcBuilders.standaloneSetup(itemHistoryResource)
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
    public static ItemHistory createEntity(EntityManager em) {
        ItemHistory itemHistory = new ItemHistory()
            .timestamp(DEFAULT_TIMESTAMP)
            .modificationDate(DEFAULT_MODIFICATION_DATE)
            .modified(DEFAULT_MODIFIED);
        return itemHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemHistory createUpdatedEntity(EntityManager em) {
        ItemHistory itemHistory = new ItemHistory()
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .modified(UPDATED_MODIFIED);
        return itemHistory;
    }

    @BeforeEach
    public void initTest() {
        itemHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemHistory() throws Exception {
        int databaseSizeBeforeCreate = itemHistoryRepository.findAll().size();

        // Create the ItemHistory
        restItemHistoryMockMvc.perform(post("/api/item-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemHistory)))
            .andExpect(status().isCreated());

        // Validate the ItemHistory in the database
        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        ItemHistory testItemHistory = itemHistoryList.get(itemHistoryList.size() - 1);
        assertThat(testItemHistory.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItemHistory.getModificationDate()).isEqualTo(DEFAULT_MODIFICATION_DATE);
        assertThat(testItemHistory.isModified()).isEqualTo(DEFAULT_MODIFIED);
    }

    @Test
    @Transactional
    public void createItemHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemHistoryRepository.findAll().size();

        // Create the ItemHistory with an existing ID
        itemHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemHistoryMockMvc.perform(post("/api/item-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemHistory)))
            .andExpect(status().isBadRequest());

        // Validate the ItemHistory in the database
        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemHistoryRepository.findAll().size();
        // set the field null
        itemHistory.setTimestamp(null);

        // Create the ItemHistory, which fails.

        restItemHistoryMockMvc.perform(post("/api/item-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemHistory)))
            .andExpect(status().isBadRequest());

        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemHistories() throws Exception {
        // Initialize the database
        itemHistoryRepository.saveAndFlush(itemHistory);

        // Get all the itemHistoryList
        restItemHistoryMockMvc.perform(get("/api/item-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].modificationDate").value(hasItem(DEFAULT_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].modified").value(hasItem(DEFAULT_MODIFIED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getItemHistory() throws Exception {
        // Initialize the database
        itemHistoryRepository.saveAndFlush(itemHistory);

        // Get the itemHistory
        restItemHistoryMockMvc.perform(get("/api/item-histories/{id}", itemHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemHistory.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.modificationDate").value(DEFAULT_MODIFICATION_DATE.toString()))
            .andExpect(jsonPath("$.modified").value(DEFAULT_MODIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItemHistory() throws Exception {
        // Get the itemHistory
        restItemHistoryMockMvc.perform(get("/api/item-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemHistory() throws Exception {
        // Initialize the database
        itemHistoryService.save(itemHistory);

        int databaseSizeBeforeUpdate = itemHistoryRepository.findAll().size();

        // Update the itemHistory
        ItemHistory updatedItemHistory = itemHistoryRepository.findById(itemHistory.getId()).get();
        // Disconnect from session so that the updates on updatedItemHistory are not directly saved in db
        em.detach(updatedItemHistory);
        updatedItemHistory
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .modified(UPDATED_MODIFIED);

        restItemHistoryMockMvc.perform(put("/api/item-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemHistory)))
            .andExpect(status().isOk());

        // Validate the ItemHistory in the database
        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeUpdate);
        ItemHistory testItemHistory = itemHistoryList.get(itemHistoryList.size() - 1);
        assertThat(testItemHistory.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItemHistory.getModificationDate()).isEqualTo(UPDATED_MODIFICATION_DATE);
        assertThat(testItemHistory.isModified()).isEqualTo(UPDATED_MODIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingItemHistory() throws Exception {
        int databaseSizeBeforeUpdate = itemHistoryRepository.findAll().size();

        // Create the ItemHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemHistoryMockMvc.perform(put("/api/item-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemHistory)))
            .andExpect(status().isBadRequest());

        // Validate the ItemHistory in the database
        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemHistory() throws Exception {
        // Initialize the database
        itemHistoryService.save(itemHistory);

        int databaseSizeBeforeDelete = itemHistoryRepository.findAll().size();

        // Delete the itemHistory
        restItemHistoryMockMvc.perform(delete("/api/item-histories/{id}", itemHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemHistory> itemHistoryList = itemHistoryRepository.findAll();
        assertThat(itemHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemHistory.class);
        ItemHistory itemHistory1 = new ItemHistory();
        itemHistory1.setId(1L);
        ItemHistory itemHistory2 = new ItemHistory();
        itemHistory2.setId(itemHistory1.getId());
        assertThat(itemHistory1).isEqualTo(itemHistory2);
        itemHistory2.setId(2L);
        assertThat(itemHistory1).isNotEqualTo(itemHistory2);
        itemHistory1.setId(null);
        assertThat(itemHistory1).isNotEqualTo(itemHistory2);
    }
}
