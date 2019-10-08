package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.Rank;
import de.umreifungskopf.recode.repository.RankRepository;
import de.umreifungskopf.recode.service.RankService;
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
 * Integration tests for the {@link RankResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class RankResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_PRIO_VALUE = 1;
    private static final Integer UPDATED_PRIO_VALUE = 2;
    private static final Integer SMALLER_PRIO_VALUE = 1 - 1;

    @Autowired
    private RankRepository rankRepository;

    @Autowired
    private RankService rankService;

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

    private MockMvc restRankMockMvc;

    private Rank rank;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RankResource rankResource = new RankResource(rankService);
        this.restRankMockMvc = MockMvcBuilders.standaloneSetup(rankResource)
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
    public static Rank createEntity(EntityManager em) {
        Rank rank = new Rank()
            .timestamp(DEFAULT_TIMESTAMP)
            .prioValue(DEFAULT_PRIO_VALUE);
        return rank;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rank createUpdatedEntity(EntityManager em) {
        Rank rank = new Rank()
            .timestamp(UPDATED_TIMESTAMP)
            .prioValue(UPDATED_PRIO_VALUE);
        return rank;
    }

    @BeforeEach
    public void initTest() {
        rank = createEntity(em);
    }

    @Test
    @Transactional
    public void createRank() throws Exception {
        int databaseSizeBeforeCreate = rankRepository.findAll().size();

        // Create the Rank
        restRankMockMvc.perform(post("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rank)))
            .andExpect(status().isCreated());

        // Validate the Rank in the database
        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeCreate + 1);
        Rank testRank = rankList.get(rankList.size() - 1);
        assertThat(testRank.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testRank.getPrioValue()).isEqualTo(DEFAULT_PRIO_VALUE);
    }

    @Test
    @Transactional
    public void createRankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rankRepository.findAll().size();

        // Create the Rank with an existing ID
        rank.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRankMockMvc.perform(post("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rank)))
            .andExpect(status().isBadRequest());

        // Validate the Rank in the database
        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = rankRepository.findAll().size();
        // set the field null
        rank.setTimestamp(null);

        // Create the Rank, which fails.

        restRankMockMvc.perform(post("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rank)))
            .andExpect(status().isBadRequest());

        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrioValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = rankRepository.findAll().size();
        // set the field null
        rank.setPrioValue(null);

        // Create the Rank, which fails.

        restRankMockMvc.perform(post("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rank)))
            .andExpect(status().isBadRequest());

        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRanks() throws Exception {
        // Initialize the database
        rankRepository.saveAndFlush(rank);

        // Get all the rankList
        restRankMockMvc.perform(get("/api/ranks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rank.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].prioValue").value(hasItem(DEFAULT_PRIO_VALUE)));
    }
    
    @Test
    @Transactional
    public void getRank() throws Exception {
        // Initialize the database
        rankRepository.saveAndFlush(rank);

        // Get the rank
        restRankMockMvc.perform(get("/api/ranks/{id}", rank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rank.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.prioValue").value(DEFAULT_PRIO_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingRank() throws Exception {
        // Get the rank
        restRankMockMvc.perform(get("/api/ranks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRank() throws Exception {
        // Initialize the database
        rankService.save(rank);

        int databaseSizeBeforeUpdate = rankRepository.findAll().size();

        // Update the rank
        Rank updatedRank = rankRepository.findById(rank.getId()).get();
        // Disconnect from session so that the updates on updatedRank are not directly saved in db
        em.detach(updatedRank);
        updatedRank
            .timestamp(UPDATED_TIMESTAMP)
            .prioValue(UPDATED_PRIO_VALUE);

        restRankMockMvc.perform(put("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRank)))
            .andExpect(status().isOk());

        // Validate the Rank in the database
        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeUpdate);
        Rank testRank = rankList.get(rankList.size() - 1);
        assertThat(testRank.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testRank.getPrioValue()).isEqualTo(UPDATED_PRIO_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingRank() throws Exception {
        int databaseSizeBeforeUpdate = rankRepository.findAll().size();

        // Create the Rank

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRankMockMvc.perform(put("/api/ranks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rank)))
            .andExpect(status().isBadRequest());

        // Validate the Rank in the database
        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRank() throws Exception {
        // Initialize the database
        rankService.save(rank);

        int databaseSizeBeforeDelete = rankRepository.findAll().size();

        // Delete the rank
        restRankMockMvc.perform(delete("/api/ranks/{id}", rank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rank> rankList = rankRepository.findAll();
        assertThat(rankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rank.class);
        Rank rank1 = new Rank();
        rank1.setId(1L);
        Rank rank2 = new Rank();
        rank2.setId(rank1.getId());
        assertThat(rank1).isEqualTo(rank2);
        rank2.setId(2L);
        assertThat(rank1).isNotEqualTo(rank2);
        rank1.setId(null);
        assertThat(rank1).isNotEqualTo(rank2);
    }
}
