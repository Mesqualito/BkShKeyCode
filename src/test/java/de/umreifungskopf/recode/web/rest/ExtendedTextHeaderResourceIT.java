package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ExtendedTextHeader;
import de.umreifungskopf.recode.repository.ExtendedTextHeaderRepository;
import de.umreifungskopf.recode.service.ExtendedTextHeaderService;
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
 * Integration tests for the {@link ExtendedTextHeaderResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ExtendedTextHeaderResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NO = "AAAAAAAAAA";
    private static final String UPDATED_NO = "BBBBBBBBBB";

    private static final Instant DEFAULT_STARTING_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STARTING_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_STARTING_DATE = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_ENDING_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENDING_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_ENDING_DATE = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_TEXT_NO = 1;
    private static final Integer UPDATED_TEXT_NO = 2;
    private static final Integer SMALLER_TEXT_NO = 1 - 1;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ExtendedTextHeaderRepository extendedTextHeaderRepository;

    @Autowired
    private ExtendedTextHeaderService extendedTextHeaderService;

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

    private MockMvc restExtendedTextHeaderMockMvc;

    private ExtendedTextHeader extendedTextHeader;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtendedTextHeaderResource extendedTextHeaderResource = new ExtendedTextHeaderResource(extendedTextHeaderService);
        this.restExtendedTextHeaderMockMvc = MockMvcBuilders.standaloneSetup(extendedTextHeaderResource)
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
    public static ExtendedTextHeader createEntity(EntityManager em) {
        ExtendedTextHeader extendedTextHeader = new ExtendedTextHeader()
            .timestamp(DEFAULT_TIMESTAMP)
            .tableName(DEFAULT_TABLE_NAME)
            .no(DEFAULT_NO)
            .startingDate(DEFAULT_STARTING_DATE)
            .endingDate(DEFAULT_ENDING_DATE)
            .textNo(DEFAULT_TEXT_NO)
            .description(DEFAULT_DESCRIPTION);
        return extendedTextHeader;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendedTextHeader createUpdatedEntity(EntityManager em) {
        ExtendedTextHeader extendedTextHeader = new ExtendedTextHeader()
            .timestamp(UPDATED_TIMESTAMP)
            .tableName(UPDATED_TABLE_NAME)
            .no(UPDATED_NO)
            .startingDate(UPDATED_STARTING_DATE)
            .endingDate(UPDATED_ENDING_DATE)
            .textNo(UPDATED_TEXT_NO)
            .description(UPDATED_DESCRIPTION);
        return extendedTextHeader;
    }

    @BeforeEach
    public void initTest() {
        extendedTextHeader = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtendedTextHeader() throws Exception {
        int databaseSizeBeforeCreate = extendedTextHeaderRepository.findAll().size();

        // Create the ExtendedTextHeader
        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isCreated());

        // Validate the ExtendedTextHeader in the database
        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeCreate + 1);
        ExtendedTextHeader testExtendedTextHeader = extendedTextHeaderList.get(extendedTextHeaderList.size() - 1);
        assertThat(testExtendedTextHeader.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testExtendedTextHeader.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
        assertThat(testExtendedTextHeader.getNo()).isEqualTo(DEFAULT_NO);
        assertThat(testExtendedTextHeader.getStartingDate()).isEqualTo(DEFAULT_STARTING_DATE);
        assertThat(testExtendedTextHeader.getEndingDate()).isEqualTo(DEFAULT_ENDING_DATE);
        assertThat(testExtendedTextHeader.getTextNo()).isEqualTo(DEFAULT_TEXT_NO);
        assertThat(testExtendedTextHeader.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createExtendedTextHeaderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extendedTextHeaderRepository.findAll().size();

        // Create the ExtendedTextHeader with an existing ID
        extendedTextHeader.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendedTextHeader in the database
        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextHeaderRepository.findAll().size();
        // set the field null
        extendedTextHeader.setTimestamp(null);

        // Create the ExtendedTextHeader, which fails.

        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTableNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextHeaderRepository.findAll().size();
        // set the field null
        extendedTextHeader.setTableName(null);

        // Create the ExtendedTextHeader, which fails.

        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextHeaderRepository.findAll().size();
        // set the field null
        extendedTextHeader.setNo(null);

        // Create the ExtendedTextHeader, which fails.

        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextHeaderRepository.findAll().size();
        // set the field null
        extendedTextHeader.setTextNo(null);

        // Create the ExtendedTextHeader, which fails.

        restExtendedTextHeaderMockMvc.perform(post("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExtendedTextHeaders() throws Exception {
        // Initialize the database
        extendedTextHeaderRepository.saveAndFlush(extendedTextHeader);

        // Get all the extendedTextHeaderList
        restExtendedTextHeaderMockMvc.perform(get("/api/extended-text-headers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extendedTextHeader.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].no").value(hasItem(DEFAULT_NO.toString())))
            .andExpect(jsonPath("$.[*].startingDate").value(hasItem(DEFAULT_STARTING_DATE.toString())))
            .andExpect(jsonPath("$.[*].endingDate").value(hasItem(DEFAULT_ENDING_DATE.toString())))
            .andExpect(jsonPath("$.[*].textNo").value(hasItem(DEFAULT_TEXT_NO)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getExtendedTextHeader() throws Exception {
        // Initialize the database
        extendedTextHeaderRepository.saveAndFlush(extendedTextHeader);

        // Get the extendedTextHeader
        restExtendedTextHeaderMockMvc.perform(get("/api/extended-text-headers/{id}", extendedTextHeader.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extendedTextHeader.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()))
            .andExpect(jsonPath("$.no").value(DEFAULT_NO.toString()))
            .andExpect(jsonPath("$.startingDate").value(DEFAULT_STARTING_DATE.toString()))
            .andExpect(jsonPath("$.endingDate").value(DEFAULT_ENDING_DATE.toString()))
            .andExpect(jsonPath("$.textNo").value(DEFAULT_TEXT_NO))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExtendedTextHeader() throws Exception {
        // Get the extendedTextHeader
        restExtendedTextHeaderMockMvc.perform(get("/api/extended-text-headers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtendedTextHeader() throws Exception {
        // Initialize the database
        extendedTextHeaderService.save(extendedTextHeader);

        int databaseSizeBeforeUpdate = extendedTextHeaderRepository.findAll().size();

        // Update the extendedTextHeader
        ExtendedTextHeader updatedExtendedTextHeader = extendedTextHeaderRepository.findById(extendedTextHeader.getId()).get();
        // Disconnect from session so that the updates on updatedExtendedTextHeader are not directly saved in db
        em.detach(updatedExtendedTextHeader);
        updatedExtendedTextHeader
            .timestamp(UPDATED_TIMESTAMP)
            .tableName(UPDATED_TABLE_NAME)
            .no(UPDATED_NO)
            .startingDate(UPDATED_STARTING_DATE)
            .endingDate(UPDATED_ENDING_DATE)
            .textNo(UPDATED_TEXT_NO)
            .description(UPDATED_DESCRIPTION);

        restExtendedTextHeaderMockMvc.perform(put("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtendedTextHeader)))
            .andExpect(status().isOk());

        // Validate the ExtendedTextHeader in the database
        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeUpdate);
        ExtendedTextHeader testExtendedTextHeader = extendedTextHeaderList.get(extendedTextHeaderList.size() - 1);
        assertThat(testExtendedTextHeader.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testExtendedTextHeader.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
        assertThat(testExtendedTextHeader.getNo()).isEqualTo(UPDATED_NO);
        assertThat(testExtendedTextHeader.getStartingDate()).isEqualTo(UPDATED_STARTING_DATE);
        assertThat(testExtendedTextHeader.getEndingDate()).isEqualTo(UPDATED_ENDING_DATE);
        assertThat(testExtendedTextHeader.getTextNo()).isEqualTo(UPDATED_TEXT_NO);
        assertThat(testExtendedTextHeader.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingExtendedTextHeader() throws Exception {
        int databaseSizeBeforeUpdate = extendedTextHeaderRepository.findAll().size();

        // Create the ExtendedTextHeader

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendedTextHeaderMockMvc.perform(put("/api/extended-text-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextHeader)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendedTextHeader in the database
        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtendedTextHeader() throws Exception {
        // Initialize the database
        extendedTextHeaderService.save(extendedTextHeader);

        int databaseSizeBeforeDelete = extendedTextHeaderRepository.findAll().size();

        // Delete the extendedTextHeader
        restExtendedTextHeaderMockMvc.perform(delete("/api/extended-text-headers/{id}", extendedTextHeader.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtendedTextHeader> extendedTextHeaderList = extendedTextHeaderRepository.findAll();
        assertThat(extendedTextHeaderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtendedTextHeader.class);
        ExtendedTextHeader extendedTextHeader1 = new ExtendedTextHeader();
        extendedTextHeader1.setId(1L);
        ExtendedTextHeader extendedTextHeader2 = new ExtendedTextHeader();
        extendedTextHeader2.setId(extendedTextHeader1.getId());
        assertThat(extendedTextHeader1).isEqualTo(extendedTextHeader2);
        extendedTextHeader2.setId(2L);
        assertThat(extendedTextHeader1).isNotEqualTo(extendedTextHeader2);
        extendedTextHeader1.setId(null);
        assertThat(extendedTextHeader1).isNotEqualTo(extendedTextHeader2);
    }
}
