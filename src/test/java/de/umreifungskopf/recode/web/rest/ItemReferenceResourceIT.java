package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ItemReference;
import de.umreifungskopf.recode.repository.ItemReferenceRepository;
import de.umreifungskopf.recode.service.ItemReferenceService;
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
 * Integration tests for the {@link ItemReferenceResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemReferenceResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_UOM = "AAAAAAAAAA";
    private static final String UPDATED_UOM = "BBBBBBBBBB";

    private static final String DEFAULT_CROSS_REFERENCE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CROSS_REFERENCE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CROSS_REFERENCE_TYPE_NO = "AAAAAAAAAA";
    private static final String UPDATED_CROSS_REFERENCE_TYPE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_CROSS_REFERENCE_NO = "AAAAAAAAAA";
    private static final String UPDATED_CROSS_REFERENCE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_QUALIFIER = "AAAAAAAAAA";
    private static final String UPDATED_QUALIFIER = "BBBBBBBBBB";

    @Autowired
    private ItemReferenceRepository itemReferenceRepository;

    @Autowired
    private ItemReferenceService itemReferenceService;

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

    private MockMvc restItemReferenceMockMvc;

    private ItemReference itemReference;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemReferenceResource itemReferenceResource = new ItemReferenceResource(itemReferenceService);
        this.restItemReferenceMockMvc = MockMvcBuilders.standaloneSetup(itemReferenceResource)
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
    public static ItemReference createEntity(EntityManager em) {
        ItemReference itemReference = new ItemReference()
            .timestamp(DEFAULT_TIMESTAMP)
            .uom(DEFAULT_UOM)
            .crossReferenceType(DEFAULT_CROSS_REFERENCE_TYPE)
            .crossReferenceTypeNo(DEFAULT_CROSS_REFERENCE_TYPE_NO)
            .crossReferenceNo(DEFAULT_CROSS_REFERENCE_NO)
            .description(DEFAULT_DESCRIPTION)
            .qualifier(DEFAULT_QUALIFIER);
        return itemReference;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemReference createUpdatedEntity(EntityManager em) {
        ItemReference itemReference = new ItemReference()
            .timestamp(UPDATED_TIMESTAMP)
            .uom(UPDATED_UOM)
            .crossReferenceType(UPDATED_CROSS_REFERENCE_TYPE)
            .crossReferenceTypeNo(UPDATED_CROSS_REFERENCE_TYPE_NO)
            .crossReferenceNo(UPDATED_CROSS_REFERENCE_NO)
            .description(UPDATED_DESCRIPTION)
            .qualifier(UPDATED_QUALIFIER);
        return itemReference;
    }

    @BeforeEach
    public void initTest() {
        itemReference = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemReference() throws Exception {
        int databaseSizeBeforeCreate = itemReferenceRepository.findAll().size();

        // Create the ItemReference
        restItemReferenceMockMvc.perform(post("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemReference)))
            .andExpect(status().isCreated());

        // Validate the ItemReference in the database
        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeCreate + 1);
        ItemReference testItemReference = itemReferenceList.get(itemReferenceList.size() - 1);
        assertThat(testItemReference.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItemReference.getUom()).isEqualTo(DEFAULT_UOM);
        assertThat(testItemReference.getCrossReferenceType()).isEqualTo(DEFAULT_CROSS_REFERENCE_TYPE);
        assertThat(testItemReference.getCrossReferenceTypeNo()).isEqualTo(DEFAULT_CROSS_REFERENCE_TYPE_NO);
        assertThat(testItemReference.getCrossReferenceNo()).isEqualTo(DEFAULT_CROSS_REFERENCE_NO);
        assertThat(testItemReference.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testItemReference.getQualifier()).isEqualTo(DEFAULT_QUALIFIER);
    }

    @Test
    @Transactional
    public void createItemReferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemReferenceRepository.findAll().size();

        // Create the ItemReference with an existing ID
        itemReference.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemReferenceMockMvc.perform(post("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemReference)))
            .andExpect(status().isBadRequest());

        // Validate the ItemReference in the database
        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemReferenceRepository.findAll().size();
        // set the field null
        itemReference.setTimestamp(null);

        // Create the ItemReference, which fails.

        restItemReferenceMockMvc.perform(post("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemReference)))
            .andExpect(status().isBadRequest());

        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCrossReferenceNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemReferenceRepository.findAll().size();
        // set the field null
        itemReference.setCrossReferenceNo(null);

        // Create the ItemReference, which fails.

        restItemReferenceMockMvc.perform(post("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemReference)))
            .andExpect(status().isBadRequest());

        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemReferences() throws Exception {
        // Initialize the database
        itemReferenceRepository.saveAndFlush(itemReference);

        // Get all the itemReferenceList
        restItemReferenceMockMvc.perform(get("/api/item-references?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemReference.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].uom").value(hasItem(DEFAULT_UOM.toString())))
            .andExpect(jsonPath("$.[*].crossReferenceType").value(hasItem(DEFAULT_CROSS_REFERENCE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].crossReferenceTypeNo").value(hasItem(DEFAULT_CROSS_REFERENCE_TYPE_NO.toString())))
            .andExpect(jsonPath("$.[*].crossReferenceNo").value(hasItem(DEFAULT_CROSS_REFERENCE_NO.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].qualifier").value(hasItem(DEFAULT_QUALIFIER.toString())));
    }
    
    @Test
    @Transactional
    public void getItemReference() throws Exception {
        // Initialize the database
        itemReferenceRepository.saveAndFlush(itemReference);

        // Get the itemReference
        restItemReferenceMockMvc.perform(get("/api/item-references/{id}", itemReference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemReference.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.uom").value(DEFAULT_UOM.toString()))
            .andExpect(jsonPath("$.crossReferenceType").value(DEFAULT_CROSS_REFERENCE_TYPE.toString()))
            .andExpect(jsonPath("$.crossReferenceTypeNo").value(DEFAULT_CROSS_REFERENCE_TYPE_NO.toString()))
            .andExpect(jsonPath("$.crossReferenceNo").value(DEFAULT_CROSS_REFERENCE_NO.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.qualifier").value(DEFAULT_QUALIFIER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemReference() throws Exception {
        // Get the itemReference
        restItemReferenceMockMvc.perform(get("/api/item-references/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemReference() throws Exception {
        // Initialize the database
        itemReferenceService.save(itemReference);

        int databaseSizeBeforeUpdate = itemReferenceRepository.findAll().size();

        // Update the itemReference
        ItemReference updatedItemReference = itemReferenceRepository.findById(itemReference.getId()).get();
        // Disconnect from session so that the updates on updatedItemReference are not directly saved in db
        em.detach(updatedItemReference);
        updatedItemReference
            .timestamp(UPDATED_TIMESTAMP)
            .uom(UPDATED_UOM)
            .crossReferenceType(UPDATED_CROSS_REFERENCE_TYPE)
            .crossReferenceTypeNo(UPDATED_CROSS_REFERENCE_TYPE_NO)
            .crossReferenceNo(UPDATED_CROSS_REFERENCE_NO)
            .description(UPDATED_DESCRIPTION)
            .qualifier(UPDATED_QUALIFIER);

        restItemReferenceMockMvc.perform(put("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemReference)))
            .andExpect(status().isOk());

        // Validate the ItemReference in the database
        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeUpdate);
        ItemReference testItemReference = itemReferenceList.get(itemReferenceList.size() - 1);
        assertThat(testItemReference.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItemReference.getUom()).isEqualTo(UPDATED_UOM);
        assertThat(testItemReference.getCrossReferenceType()).isEqualTo(UPDATED_CROSS_REFERENCE_TYPE);
        assertThat(testItemReference.getCrossReferenceTypeNo()).isEqualTo(UPDATED_CROSS_REFERENCE_TYPE_NO);
        assertThat(testItemReference.getCrossReferenceNo()).isEqualTo(UPDATED_CROSS_REFERENCE_NO);
        assertThat(testItemReference.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testItemReference.getQualifier()).isEqualTo(UPDATED_QUALIFIER);
    }

    @Test
    @Transactional
    public void updateNonExistingItemReference() throws Exception {
        int databaseSizeBeforeUpdate = itemReferenceRepository.findAll().size();

        // Create the ItemReference

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemReferenceMockMvc.perform(put("/api/item-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemReference)))
            .andExpect(status().isBadRequest());

        // Validate the ItemReference in the database
        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemReference() throws Exception {
        // Initialize the database
        itemReferenceService.save(itemReference);

        int databaseSizeBeforeDelete = itemReferenceRepository.findAll().size();

        // Delete the itemReference
        restItemReferenceMockMvc.perform(delete("/api/item-references/{id}", itemReference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemReference> itemReferenceList = itemReferenceRepository.findAll();
        assertThat(itemReferenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemReference.class);
        ItemReference itemReference1 = new ItemReference();
        itemReference1.setId(1L);
        ItemReference itemReference2 = new ItemReference();
        itemReference2.setId(itemReference1.getId());
        assertThat(itemReference1).isEqualTo(itemReference2);
        itemReference2.setId(2L);
        assertThat(itemReference1).isNotEqualTo(itemReference2);
        itemReference1.setId(null);
        assertThat(itemReference1).isNotEqualTo(itemReference2);
    }
}
