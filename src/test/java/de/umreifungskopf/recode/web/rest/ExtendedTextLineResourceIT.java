package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ExtendedTextLine;
import de.umreifungskopf.recode.repository.ExtendedTextLineRepository;
import de.umreifungskopf.recode.service.ExtendedTextLineService;
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
 * Integration tests for the {@link ExtendedTextLineResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ExtendedTextLineResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NO = "AAAAAAAAAA";
    private static final String UPDATED_NO = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEXT_NO = 1;
    private static final Integer UPDATED_TEXT_NO = 2;
    private static final Integer SMALLER_TEXT_NO = 1 - 1;

    private static final Integer DEFAULT_LINE_NO = 1;
    private static final Integer UPDATED_LINE_NO = 2;
    private static final Integer SMALLER_LINE_NO = 1 - 1;

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private ExtendedTextLineRepository extendedTextLineRepository;

    @Autowired
    private ExtendedTextLineService extendedTextLineService;

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

    private MockMvc restExtendedTextLineMockMvc;

    private ExtendedTextLine extendedTextLine;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtendedTextLineResource extendedTextLineResource = new ExtendedTextLineResource(extendedTextLineService);
        this.restExtendedTextLineMockMvc = MockMvcBuilders.standaloneSetup(extendedTextLineResource)
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
    public static ExtendedTextLine createEntity(EntityManager em) {
        ExtendedTextLine extendedTextLine = new ExtendedTextLine()
            .timestamp(DEFAULT_TIMESTAMP)
            .tableName(DEFAULT_TABLE_NAME)
            .no(DEFAULT_NO)
            .textNo(DEFAULT_TEXT_NO)
            .lineNo(DEFAULT_LINE_NO)
            .text(DEFAULT_TEXT);
        return extendedTextLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtendedTextLine createUpdatedEntity(EntityManager em) {
        ExtendedTextLine extendedTextLine = new ExtendedTextLine()
            .timestamp(UPDATED_TIMESTAMP)
            .tableName(UPDATED_TABLE_NAME)
            .no(UPDATED_NO)
            .textNo(UPDATED_TEXT_NO)
            .lineNo(UPDATED_LINE_NO)
            .text(UPDATED_TEXT);
        return extendedTextLine;
    }

    @BeforeEach
    public void initTest() {
        extendedTextLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtendedTextLine() throws Exception {
        int databaseSizeBeforeCreate = extendedTextLineRepository.findAll().size();

        // Create the ExtendedTextLine
        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isCreated());

        // Validate the ExtendedTextLine in the database
        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeCreate + 1);
        ExtendedTextLine testExtendedTextLine = extendedTextLineList.get(extendedTextLineList.size() - 1);
        assertThat(testExtendedTextLine.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testExtendedTextLine.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
        assertThat(testExtendedTextLine.getNo()).isEqualTo(DEFAULT_NO);
        assertThat(testExtendedTextLine.getTextNo()).isEqualTo(DEFAULT_TEXT_NO);
        assertThat(testExtendedTextLine.getLineNo()).isEqualTo(DEFAULT_LINE_NO);
        assertThat(testExtendedTextLine.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createExtendedTextLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extendedTextLineRepository.findAll().size();

        // Create the ExtendedTextLine with an existing ID
        extendedTextLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendedTextLine in the database
        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextLineRepository.findAll().size();
        // set the field null
        extendedTextLine.setTimestamp(null);

        // Create the ExtendedTextLine, which fails.

        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTableNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextLineRepository.findAll().size();
        // set the field null
        extendedTextLine.setTableName(null);

        // Create the ExtendedTextLine, which fails.

        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextLineRepository.findAll().size();
        // set the field null
        extendedTextLine.setNo(null);

        // Create the ExtendedTextLine, which fails.

        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextLineRepository.findAll().size();
        // set the field null
        extendedTextLine.setTextNo(null);

        // Create the ExtendedTextLine, which fails.

        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLineNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = extendedTextLineRepository.findAll().size();
        // set the field null
        extendedTextLine.setLineNo(null);

        // Create the ExtendedTextLine, which fails.

        restExtendedTextLineMockMvc.perform(post("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExtendedTextLines() throws Exception {
        // Initialize the database
        extendedTextLineRepository.saveAndFlush(extendedTextLine);

        // Get all the extendedTextLineList
        restExtendedTextLineMockMvc.perform(get("/api/extended-text-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extendedTextLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].no").value(hasItem(DEFAULT_NO.toString())))
            .andExpect(jsonPath("$.[*].textNo").value(hasItem(DEFAULT_TEXT_NO)))
            .andExpect(jsonPath("$.[*].lineNo").value(hasItem(DEFAULT_LINE_NO)))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getExtendedTextLine() throws Exception {
        // Initialize the database
        extendedTextLineRepository.saveAndFlush(extendedTextLine);

        // Get the extendedTextLine
        restExtendedTextLineMockMvc.perform(get("/api/extended-text-lines/{id}", extendedTextLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extendedTextLine.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()))
            .andExpect(jsonPath("$.no").value(DEFAULT_NO.toString()))
            .andExpect(jsonPath("$.textNo").value(DEFAULT_TEXT_NO))
            .andExpect(jsonPath("$.lineNo").value(DEFAULT_LINE_NO))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExtendedTextLine() throws Exception {
        // Get the extendedTextLine
        restExtendedTextLineMockMvc.perform(get("/api/extended-text-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtendedTextLine() throws Exception {
        // Initialize the database
        extendedTextLineService.save(extendedTextLine);

        int databaseSizeBeforeUpdate = extendedTextLineRepository.findAll().size();

        // Update the extendedTextLine
        ExtendedTextLine updatedExtendedTextLine = extendedTextLineRepository.findById(extendedTextLine.getId()).get();
        // Disconnect from session so that the updates on updatedExtendedTextLine are not directly saved in db
        em.detach(updatedExtendedTextLine);
        updatedExtendedTextLine
            .timestamp(UPDATED_TIMESTAMP)
            .tableName(UPDATED_TABLE_NAME)
            .no(UPDATED_NO)
            .textNo(UPDATED_TEXT_NO)
            .lineNo(UPDATED_LINE_NO)
            .text(UPDATED_TEXT);

        restExtendedTextLineMockMvc.perform(put("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtendedTextLine)))
            .andExpect(status().isOk());

        // Validate the ExtendedTextLine in the database
        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeUpdate);
        ExtendedTextLine testExtendedTextLine = extendedTextLineList.get(extendedTextLineList.size() - 1);
        assertThat(testExtendedTextLine.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testExtendedTextLine.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
        assertThat(testExtendedTextLine.getNo()).isEqualTo(UPDATED_NO);
        assertThat(testExtendedTextLine.getTextNo()).isEqualTo(UPDATED_TEXT_NO);
        assertThat(testExtendedTextLine.getLineNo()).isEqualTo(UPDATED_LINE_NO);
        assertThat(testExtendedTextLine.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingExtendedTextLine() throws Exception {
        int databaseSizeBeforeUpdate = extendedTextLineRepository.findAll().size();

        // Create the ExtendedTextLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtendedTextLineMockMvc.perform(put("/api/extended-text-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extendedTextLine)))
            .andExpect(status().isBadRequest());

        // Validate the ExtendedTextLine in the database
        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtendedTextLine() throws Exception {
        // Initialize the database
        extendedTextLineService.save(extendedTextLine);

        int databaseSizeBeforeDelete = extendedTextLineRepository.findAll().size();

        // Delete the extendedTextLine
        restExtendedTextLineMockMvc.perform(delete("/api/extended-text-lines/{id}", extendedTextLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtendedTextLine> extendedTextLineList = extendedTextLineRepository.findAll();
        assertThat(extendedTextLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtendedTextLine.class);
        ExtendedTextLine extendedTextLine1 = new ExtendedTextLine();
        extendedTextLine1.setId(1L);
        ExtendedTextLine extendedTextLine2 = new ExtendedTextLine();
        extendedTextLine2.setId(extendedTextLine1.getId());
        assertThat(extendedTextLine1).isEqualTo(extendedTextLine2);
        extendedTextLine2.setId(2L);
        assertThat(extendedTextLine1).isNotEqualTo(extendedTextLine2);
        extendedTextLine1.setId(null);
        assertThat(extendedTextLine1).isNotEqualTo(extendedTextLine2);
    }
}
