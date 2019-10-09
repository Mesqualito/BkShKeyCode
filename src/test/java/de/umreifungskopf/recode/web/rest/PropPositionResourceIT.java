package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.PropPosition;
import de.umreifungskopf.recode.repository.PropPositionRepository;
import de.umreifungskopf.recode.service.PropPositionService;
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
 * Integration tests for the {@link PropPositionResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class PropPositionResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_POS_VALUE = 1;
    private static final Integer UPDATED_POS_VALUE = 2;
    private static final Integer SMALLER_POS_VALUE = 1 - 1;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PropPositionRepository propPositionRepository;

    @Autowired
    private PropPositionService propPositionService;

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

    private MockMvc restPropPositionMockMvc;

    private PropPosition propPosition;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropPositionResource propPositionResource = new PropPositionResource(propPositionService);
        this.restPropPositionMockMvc = MockMvcBuilders.standaloneSetup(propPositionResource)
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
    public static PropPosition createEntity(EntityManager em) {
        PropPosition propPosition = new PropPosition()
            .timestamp(DEFAULT_TIMESTAMP)
            .posValue(DEFAULT_POS_VALUE)
            .description(DEFAULT_DESCRIPTION);
        return propPosition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropPosition createUpdatedEntity(EntityManager em) {
        PropPosition propPosition = new PropPosition()
            .timestamp(UPDATED_TIMESTAMP)
            .posValue(UPDATED_POS_VALUE)
            .description(UPDATED_DESCRIPTION);
        return propPosition;
    }

    @BeforeEach
    public void initTest() {
        propPosition = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropPosition() throws Exception {
        int databaseSizeBeforeCreate = propPositionRepository.findAll().size();

        // Create the PropPosition
        restPropPositionMockMvc.perform(post("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propPosition)))
            .andExpect(status().isCreated());

        // Validate the PropPosition in the database
        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeCreate + 1);
        PropPosition testPropPosition = propPositionList.get(propPositionList.size() - 1);
        assertThat(testPropPosition.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testPropPosition.getPosValue()).isEqualTo(DEFAULT_POS_VALUE);
        assertThat(testPropPosition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPropPositionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propPositionRepository.findAll().size();

        // Create the PropPosition with an existing ID
        propPosition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropPositionMockMvc.perform(post("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propPosition)))
            .andExpect(status().isBadRequest());

        // Validate the PropPosition in the database
        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = propPositionRepository.findAll().size();
        // set the field null
        propPosition.setTimestamp(null);

        // Create the PropPosition, which fails.

        restPropPositionMockMvc.perform(post("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propPosition)))
            .andExpect(status().isBadRequest());

        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPosValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = propPositionRepository.findAll().size();
        // set the field null
        propPosition.setPosValue(null);

        // Create the PropPosition, which fails.

        restPropPositionMockMvc.perform(post("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propPosition)))
            .andExpect(status().isBadRequest());

        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPropPositions() throws Exception {
        // Initialize the database
        propPositionRepository.saveAndFlush(propPosition);

        // Get all the propPositionList
        restPropPositionMockMvc.perform(get("/api/prop-positions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propPosition.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].posValue").value(hasItem(DEFAULT_POS_VALUE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getPropPosition() throws Exception {
        // Initialize the database
        propPositionRepository.saveAndFlush(propPosition);

        // Get the propPosition
        restPropPositionMockMvc.perform(get("/api/prop-positions/{id}", propPosition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(propPosition.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.posValue").value(DEFAULT_POS_VALUE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPropPosition() throws Exception {
        // Get the propPosition
        restPropPositionMockMvc.perform(get("/api/prop-positions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropPosition() throws Exception {
        // Initialize the database
        propPositionService.save(propPosition);

        int databaseSizeBeforeUpdate = propPositionRepository.findAll().size();

        // Update the propPosition
        PropPosition updatedPropPosition = propPositionRepository.findById(propPosition.getId()).get();
        // Disconnect from session so that the updates on updatedPropPosition are not directly saved in db
        em.detach(updatedPropPosition);
        updatedPropPosition
            .timestamp(UPDATED_TIMESTAMP)
            .posValue(UPDATED_POS_VALUE)
            .description(UPDATED_DESCRIPTION);

        restPropPositionMockMvc.perform(put("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropPosition)))
            .andExpect(status().isOk());

        // Validate the PropPosition in the database
        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeUpdate);
        PropPosition testPropPosition = propPositionList.get(propPositionList.size() - 1);
        assertThat(testPropPosition.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testPropPosition.getPosValue()).isEqualTo(UPDATED_POS_VALUE);
        assertThat(testPropPosition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPropPosition() throws Exception {
        int databaseSizeBeforeUpdate = propPositionRepository.findAll().size();

        // Create the PropPosition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropPositionMockMvc.perform(put("/api/prop-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propPosition)))
            .andExpect(status().isBadRequest());

        // Validate the PropPosition in the database
        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropPosition() throws Exception {
        // Initialize the database
        propPositionService.save(propPosition);

        int databaseSizeBeforeDelete = propPositionRepository.findAll().size();

        // Delete the propPosition
        restPropPositionMockMvc.perform(delete("/api/prop-positions/{id}", propPosition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PropPosition> propPositionList = propPositionRepository.findAll();
        assertThat(propPositionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropPosition.class);
        PropPosition propPosition1 = new PropPosition();
        propPosition1.setId(1L);
        PropPosition propPosition2 = new PropPosition();
        propPosition2.setId(propPosition1.getId());
        assertThat(propPosition1).isEqualTo(propPosition2);
        propPosition2.setId(2L);
        assertThat(propPosition1).isNotEqualTo(propPosition2);
        propPosition1.setId(null);
        assertThat(propPosition1).isNotEqualTo(propPosition2);
    }
}
