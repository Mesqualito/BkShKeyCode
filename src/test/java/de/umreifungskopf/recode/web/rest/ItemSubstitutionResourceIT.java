package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ItemSubstitution;
import de.umreifungskopf.recode.domain.Item;
import de.umreifungskopf.recode.repository.ItemSubstitutionRepository;
import de.umreifungskopf.recode.service.ItemSubstitutionService;
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
 * Integration tests for the {@link ItemSubstitutionResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemSubstitutionResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SUBSTITUTE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SUBSTITUTE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SUBSTITUTE_NO = "AAAAAAAAAA";
    private static final String UPDATED_SUBSTITUTE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_INTERCHANGEABLE = false;
    private static final Boolean UPDATED_IS_INTERCHANGEABLE = true;

    private static final Integer DEFAULT_RELATIONS_LEVEL = 1;
    private static final Integer UPDATED_RELATIONS_LEVEL = 2;
    private static final Integer SMALLER_RELATIONS_LEVEL = 1 - 1;

    private static final Boolean DEFAULT_IS_CHECKED_TO_ORIGINAL = false;
    private static final Boolean UPDATED_IS_CHECKED_TO_ORIGINAL = true;

    private static final Instant DEFAULT_ORIG_CHECK_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORIG_CHECK_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_ORIG_CHECK_DATE = Instant.ofEpochMilli(-1L);

    @Autowired
    private ItemSubstitutionRepository itemSubstitutionRepository;

    @Autowired
    private ItemSubstitutionService itemSubstitutionService;

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

    private MockMvc restItemSubstitutionMockMvc;

    private ItemSubstitution itemSubstitution;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemSubstitutionResource itemSubstitutionResource = new ItemSubstitutionResource(itemSubstitutionService);
        this.restItemSubstitutionMockMvc = MockMvcBuilders.standaloneSetup(itemSubstitutionResource)
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
    public static ItemSubstitution createEntity(EntityManager em) {
        ItemSubstitution itemSubstitution = new ItemSubstitution()
            .timestamp(DEFAULT_TIMESTAMP)
            .type(DEFAULT_TYPE)
            .substituteType(DEFAULT_SUBSTITUTE_TYPE)
            .substituteNo(DEFAULT_SUBSTITUTE_NO)
            .description(DEFAULT_DESCRIPTION)
            .isInterchangeable(DEFAULT_IS_INTERCHANGEABLE)
            .relationsLevel(DEFAULT_RELATIONS_LEVEL)
            .isCheckedToOriginal(DEFAULT_IS_CHECKED_TO_ORIGINAL)
            .origCheckDate(DEFAULT_ORIG_CHECK_DATE);
        // Add required entity
        Item item;
        if (TestUtil.findAll(em, Item.class).isEmpty()) {
            item = ItemResourceIT.createEntity(em);
            em.persist(item);
            em.flush();
        } else {
            item = TestUtil.findAll(em, Item.class).get(0);
        }
        itemSubstitution.getItems().add(item);
        return itemSubstitution;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemSubstitution createUpdatedEntity(EntityManager em) {
        ItemSubstitution itemSubstitution = new ItemSubstitution()
            .timestamp(UPDATED_TIMESTAMP)
            .type(UPDATED_TYPE)
            .substituteType(UPDATED_SUBSTITUTE_TYPE)
            .substituteNo(UPDATED_SUBSTITUTE_NO)
            .description(UPDATED_DESCRIPTION)
            .isInterchangeable(UPDATED_IS_INTERCHANGEABLE)
            .relationsLevel(UPDATED_RELATIONS_LEVEL)
            .isCheckedToOriginal(UPDATED_IS_CHECKED_TO_ORIGINAL)
            .origCheckDate(UPDATED_ORIG_CHECK_DATE);
        // Add required entity
        Item item;
        if (TestUtil.findAll(em, Item.class).isEmpty()) {
            item = ItemResourceIT.createUpdatedEntity(em);
            em.persist(item);
            em.flush();
        } else {
            item = TestUtil.findAll(em, Item.class).get(0);
        }
        itemSubstitution.getItems().add(item);
        return itemSubstitution;
    }

    @BeforeEach
    public void initTest() {
        itemSubstitution = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemSubstitution() throws Exception {
        int databaseSizeBeforeCreate = itemSubstitutionRepository.findAll().size();

        // Create the ItemSubstitution
        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isCreated());

        // Validate the ItemSubstitution in the database
        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeCreate + 1);
        ItemSubstitution testItemSubstitution = itemSubstitutionList.get(itemSubstitutionList.size() - 1);
        assertThat(testItemSubstitution.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItemSubstitution.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testItemSubstitution.getSubstituteType()).isEqualTo(DEFAULT_SUBSTITUTE_TYPE);
        assertThat(testItemSubstitution.getSubstituteNo()).isEqualTo(DEFAULT_SUBSTITUTE_NO);
        assertThat(testItemSubstitution.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testItemSubstitution.isIsInterchangeable()).isEqualTo(DEFAULT_IS_INTERCHANGEABLE);
        assertThat(testItemSubstitution.getRelationsLevel()).isEqualTo(DEFAULT_RELATIONS_LEVEL);
        assertThat(testItemSubstitution.isIsCheckedToOriginal()).isEqualTo(DEFAULT_IS_CHECKED_TO_ORIGINAL);
        assertThat(testItemSubstitution.getOrigCheckDate()).isEqualTo(DEFAULT_ORIG_CHECK_DATE);
    }

    @Test
    @Transactional
    public void createItemSubstitutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemSubstitutionRepository.findAll().size();

        // Create the ItemSubstitution with an existing ID
        itemSubstitution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        // Validate the ItemSubstitution in the database
        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemSubstitutionRepository.findAll().size();
        // set the field null
        itemSubstitution.setTimestamp(null);

        // Create the ItemSubstitution, which fails.

        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemSubstitutionRepository.findAll().size();
        // set the field null
        itemSubstitution.setType(null);

        // Create the ItemSubstitution, which fails.

        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSubstituteTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemSubstitutionRepository.findAll().size();
        // set the field null
        itemSubstitution.setSubstituteType(null);

        // Create the ItemSubstitution, which fails.

        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSubstituteNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemSubstitutionRepository.findAll().size();
        // set the field null
        itemSubstitution.setSubstituteNo(null);

        // Create the ItemSubstitution, which fails.

        restItemSubstitutionMockMvc.perform(post("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemSubstitutions() throws Exception {
        // Initialize the database
        itemSubstitutionRepository.saveAndFlush(itemSubstitution);

        // Get all the itemSubstitutionList
        restItemSubstitutionMockMvc.perform(get("/api/item-substitutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemSubstitution.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].substituteType").value(hasItem(DEFAULT_SUBSTITUTE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].substituteNo").value(hasItem(DEFAULT_SUBSTITUTE_NO.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].isInterchangeable").value(hasItem(DEFAULT_IS_INTERCHANGEABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].relationsLevel").value(hasItem(DEFAULT_RELATIONS_LEVEL)))
            .andExpect(jsonPath("$.[*].isCheckedToOriginal").value(hasItem(DEFAULT_IS_CHECKED_TO_ORIGINAL.booleanValue())))
            .andExpect(jsonPath("$.[*].origCheckDate").value(hasItem(DEFAULT_ORIG_CHECK_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getItemSubstitution() throws Exception {
        // Initialize the database
        itemSubstitutionRepository.saveAndFlush(itemSubstitution);

        // Get the itemSubstitution
        restItemSubstitutionMockMvc.perform(get("/api/item-substitutions/{id}", itemSubstitution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemSubstitution.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.substituteType").value(DEFAULT_SUBSTITUTE_TYPE.toString()))
            .andExpect(jsonPath("$.substituteNo").value(DEFAULT_SUBSTITUTE_NO.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.isInterchangeable").value(DEFAULT_IS_INTERCHANGEABLE.booleanValue()))
            .andExpect(jsonPath("$.relationsLevel").value(DEFAULT_RELATIONS_LEVEL))
            .andExpect(jsonPath("$.isCheckedToOriginal").value(DEFAULT_IS_CHECKED_TO_ORIGINAL.booleanValue()))
            .andExpect(jsonPath("$.origCheckDate").value(DEFAULT_ORIG_CHECK_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemSubstitution() throws Exception {
        // Get the itemSubstitution
        restItemSubstitutionMockMvc.perform(get("/api/item-substitutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemSubstitution() throws Exception {
        // Initialize the database
        itemSubstitutionService.save(itemSubstitution);

        int databaseSizeBeforeUpdate = itemSubstitutionRepository.findAll().size();

        // Update the itemSubstitution
        ItemSubstitution updatedItemSubstitution = itemSubstitutionRepository.findById(itemSubstitution.getId()).get();
        // Disconnect from session so that the updates on updatedItemSubstitution are not directly saved in db
        em.detach(updatedItemSubstitution);
        updatedItemSubstitution
            .timestamp(UPDATED_TIMESTAMP)
            .type(UPDATED_TYPE)
            .substituteType(UPDATED_SUBSTITUTE_TYPE)
            .substituteNo(UPDATED_SUBSTITUTE_NO)
            .description(UPDATED_DESCRIPTION)
            .isInterchangeable(UPDATED_IS_INTERCHANGEABLE)
            .relationsLevel(UPDATED_RELATIONS_LEVEL)
            .isCheckedToOriginal(UPDATED_IS_CHECKED_TO_ORIGINAL)
            .origCheckDate(UPDATED_ORIG_CHECK_DATE);

        restItemSubstitutionMockMvc.perform(put("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemSubstitution)))
            .andExpect(status().isOk());

        // Validate the ItemSubstitution in the database
        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeUpdate);
        ItemSubstitution testItemSubstitution = itemSubstitutionList.get(itemSubstitutionList.size() - 1);
        assertThat(testItemSubstitution.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItemSubstitution.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testItemSubstitution.getSubstituteType()).isEqualTo(UPDATED_SUBSTITUTE_TYPE);
        assertThat(testItemSubstitution.getSubstituteNo()).isEqualTo(UPDATED_SUBSTITUTE_NO);
        assertThat(testItemSubstitution.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testItemSubstitution.isIsInterchangeable()).isEqualTo(UPDATED_IS_INTERCHANGEABLE);
        assertThat(testItemSubstitution.getRelationsLevel()).isEqualTo(UPDATED_RELATIONS_LEVEL);
        assertThat(testItemSubstitution.isIsCheckedToOriginal()).isEqualTo(UPDATED_IS_CHECKED_TO_ORIGINAL);
        assertThat(testItemSubstitution.getOrigCheckDate()).isEqualTo(UPDATED_ORIG_CHECK_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingItemSubstitution() throws Exception {
        int databaseSizeBeforeUpdate = itemSubstitutionRepository.findAll().size();

        // Create the ItemSubstitution

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemSubstitutionMockMvc.perform(put("/api/item-substitutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSubstitution)))
            .andExpect(status().isBadRequest());

        // Validate the ItemSubstitution in the database
        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemSubstitution() throws Exception {
        // Initialize the database
        itemSubstitutionService.save(itemSubstitution);

        int databaseSizeBeforeDelete = itemSubstitutionRepository.findAll().size();

        // Delete the itemSubstitution
        restItemSubstitutionMockMvc.perform(delete("/api/item-substitutions/{id}", itemSubstitution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemSubstitution> itemSubstitutionList = itemSubstitutionRepository.findAll();
        assertThat(itemSubstitutionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemSubstitution.class);
        ItemSubstitution itemSubstitution1 = new ItemSubstitution();
        itemSubstitution1.setId(1L);
        ItemSubstitution itemSubstitution2 = new ItemSubstitution();
        itemSubstitution2.setId(itemSubstitution1.getId());
        assertThat(itemSubstitution1).isEqualTo(itemSubstitution2);
        itemSubstitution2.setId(2L);
        assertThat(itemSubstitution1).isNotEqualTo(itemSubstitution2);
        itemSubstitution1.setId(null);
        assertThat(itemSubstitution1).isNotEqualTo(itemSubstitution2);
    }
}
