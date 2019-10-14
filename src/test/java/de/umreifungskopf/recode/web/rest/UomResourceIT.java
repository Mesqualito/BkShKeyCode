package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.Uom;
import de.umreifungskopf.recode.repository.UomRepository;
import de.umreifungskopf.recode.service.UomService;
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
 * Integration tests for the {@link UomResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class UomResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_MODIFICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_MODIFICATION_DATE = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_RANK = 1;
    private static final Integer UPDATED_RANK = 2;
    private static final Integer SMALLER_RANK = 1 - 1;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Float DEFAULT_FACTOR = 1F;
    private static final Float UPDATED_FACTOR = 2F;
    private static final Float SMALLER_FACTOR = 1F - 1F;

    @Autowired
    private UomRepository uomRepository;

    @Autowired
    private UomService uomService;

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

    private MockMvc restUomMockMvc;

    private Uom uom;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UomResource uomResource = new UomResource(uomService);
        this.restUomMockMvc = MockMvcBuilders.standaloneSetup(uomResource)
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
    public static Uom createEntity(EntityManager em) {
        Uom uom = new Uom()
            .timestamp(DEFAULT_TIMESTAMP)
            .modificationDate(DEFAULT_MODIFICATION_DATE)
            .rank(DEFAULT_RANK)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .factor(DEFAULT_FACTOR);
        return uom;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Uom createUpdatedEntity(EntityManager em) {
        Uom uom = new Uom()
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .rank(UPDATED_RANK)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .factor(UPDATED_FACTOR);
        return uom;
    }

    @BeforeEach
    public void initTest() {
        uom = createEntity(em);
    }

    @Test
    @Transactional
    public void createUom() throws Exception {
        int databaseSizeBeforeCreate = uomRepository.findAll().size();

        // Create the Uom
        restUomMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isCreated());

        // Validate the Uom in the database
        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeCreate + 1);
        Uom testUom = uomList.get(uomList.size() - 1);
        assertThat(testUom.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testUom.getModificationDate()).isEqualTo(DEFAULT_MODIFICATION_DATE);
        assertThat(testUom.getRank()).isEqualTo(DEFAULT_RANK);
        assertThat(testUom.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testUom.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUom.getFactor()).isEqualTo(DEFAULT_FACTOR);
    }

    @Test
    @Transactional
    public void createUomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uomRepository.findAll().size();

        // Create the Uom with an existing ID
        uom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUomMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isBadRequest());

        // Validate the Uom in the database
        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = uomRepository.findAll().size();
        // set the field null
        uom.setTimestamp(null);

        // Create the Uom, which fails.

        restUomMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isBadRequest());

        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = uomRepository.findAll().size();
        // set the field null
        uom.setCode(null);

        // Create the Uom, which fails.

        restUomMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isBadRequest());

        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = uomRepository.findAll().size();
        // set the field null
        uom.setDescription(null);

        // Create the Uom, which fails.

        restUomMockMvc.perform(post("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isBadRequest());

        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUoms() throws Exception {
        // Initialize the database
        uomRepository.saveAndFlush(uom);

        // Get all the uomList
        restUomMockMvc.perform(get("/api/uoms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uom.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].modificationDate").value(hasItem(DEFAULT_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rank").value(hasItem(DEFAULT_RANK)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].factor").value(hasItem(DEFAULT_FACTOR.doubleValue())));
    }

    @Test
    @Transactional
    public void getUom() throws Exception {
        // Initialize the database
        uomRepository.saveAndFlush(uom);

        // Get the uom
        restUomMockMvc.perform(get("/api/uoms/{id}", uom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(uom.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.modificationDate").value(DEFAULT_MODIFICATION_DATE.toString()))
            .andExpect(jsonPath("$.rank").value(DEFAULT_RANK))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.factor").value(DEFAULT_FACTOR.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUom() throws Exception {
        // Get the uom
        restUomMockMvc.perform(get("/api/uoms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUom() throws Exception {
        // Initialize the database
        uomService.save(uom);

        int databaseSizeBeforeUpdate = uomRepository.findAll().size();

        // Update the uom
        Uom updatedUom = uomRepository.findById(uom.getId()).get();
        // Disconnect from session so that the updates on updatedUom are not directly saved in db
        em.detach(updatedUom);
        updatedUom
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .rank(UPDATED_RANK)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .factor(UPDATED_FACTOR);

        restUomMockMvc.perform(put("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUom)))
            .andExpect(status().isOk());

        // Validate the Uom in the database
        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeUpdate);
        Uom testUom = uomList.get(uomList.size() - 1);
        assertThat(testUom.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testUom.getModificationDate()).isEqualTo(UPDATED_MODIFICATION_DATE);
        assertThat(testUom.getRank()).isEqualTo(UPDATED_RANK);
        assertThat(testUom.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testUom.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUom.getFactor()).isEqualTo(UPDATED_FACTOR);
    }

    @Test
    @Transactional
    public void updateNonExistingUom() throws Exception {
        int databaseSizeBeforeUpdate = uomRepository.findAll().size();

        // Create the Uom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUomMockMvc.perform(put("/api/uoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uom)))
            .andExpect(status().isBadRequest());

        // Validate the Uom in the database
        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUom() throws Exception {
        // Initialize the database
        uomService.save(uom);

        int databaseSizeBeforeDelete = uomRepository.findAll().size();

        // Delete the uom
        restUomMockMvc.perform(delete("/api/uoms/{id}", uom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Uom> uomList = uomRepository.findAll();
        assertThat(uomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Uom.class);
        Uom uom1 = new Uom();
        uom1.setId(1L);
        Uom uom2 = new Uom();
        uom2.setId(uom1.getId());
        assertThat(uom1).isEqualTo(uom2);
        uom2.setId(2L);
        assertThat(uom1).isNotEqualTo(uom2);
        uom1.setId(null);
        assertThat(uom1).isNotEqualTo(uom2);
    }
}
