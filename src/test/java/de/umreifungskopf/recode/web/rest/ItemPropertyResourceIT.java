package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.ItemProperty;
import de.umreifungskopf.recode.repository.ItemPropertyRepository;
import de.umreifungskopf.recode.service.ItemPropertyService;
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
 * Integration tests for the {@link ItemPropertyResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemPropertyResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_MODIFICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_MODIFICATION_DATE = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_UOM = "AAAAAAAAAA";
    private static final String UPDATED_UOM = "BBBBBBBBBB";

    @Autowired
    private ItemPropertyRepository itemPropertyRepository;

    @Autowired
    private ItemPropertyService itemPropertyService;

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

    private MockMvc restItemPropertyMockMvc;

    private ItemProperty itemProperty;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemPropertyResource itemPropertyResource = new ItemPropertyResource(itemPropertyService);
        this.restItemPropertyMockMvc = MockMvcBuilders.standaloneSetup(itemPropertyResource)
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
    public static ItemProperty createEntity(EntityManager em) {
        ItemProperty itemProperty = new ItemProperty()
            .timestamp(DEFAULT_TIMESTAMP)
            .modificationDate(DEFAULT_MODIFICATION_DATE)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .uom(DEFAULT_UOM);
        return itemProperty;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemProperty createUpdatedEntity(EntityManager em) {
        ItemProperty itemProperty = new ItemProperty()
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .uom(UPDATED_UOM);
        return itemProperty;
    }

    @BeforeEach
    public void initTest() {
        itemProperty = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemProperty() throws Exception {
        int databaseSizeBeforeCreate = itemPropertyRepository.findAll().size();

        // Create the ItemProperty
        restItemPropertyMockMvc.perform(post("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isCreated());

        // Validate the ItemProperty in the database
        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeCreate + 1);
        ItemProperty testItemProperty = itemPropertyList.get(itemPropertyList.size() - 1);
        assertThat(testItemProperty.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItemProperty.getModificationDate()).isEqualTo(DEFAULT_MODIFICATION_DATE);
        assertThat(testItemProperty.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testItemProperty.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testItemProperty.getUom()).isEqualTo(DEFAULT_UOM);
    }

    @Test
    @Transactional
    public void createItemPropertyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPropertyRepository.findAll().size();

        // Create the ItemProperty with an existing ID
        itemProperty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPropertyMockMvc.perform(post("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isBadRequest());

        // Validate the ItemProperty in the database
        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPropertyRepository.findAll().size();
        // set the field null
        itemProperty.setTimestamp(null);

        // Create the ItemProperty, which fails.

        restItemPropertyMockMvc.perform(post("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isBadRequest());

        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPropertyRepository.findAll().size();
        // set the field null
        itemProperty.setCode(null);

        // Create the ItemProperty, which fails.

        restItemPropertyMockMvc.perform(post("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isBadRequest());

        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPropertyRepository.findAll().size();
        // set the field null
        itemProperty.setDescription(null);

        // Create the ItemProperty, which fails.

        restItemPropertyMockMvc.perform(post("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isBadRequest());

        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemProperties() throws Exception {
        // Initialize the database
        itemPropertyRepository.saveAndFlush(itemProperty);

        // Get all the itemPropertyList
        restItemPropertyMockMvc.perform(get("/api/item-properties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemProperty.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].modificationDate").value(hasItem(DEFAULT_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].uom").value(hasItem(DEFAULT_UOM.toString())));
    }
    
    @Test
    @Transactional
    public void getItemProperty() throws Exception {
        // Initialize the database
        itemPropertyRepository.saveAndFlush(itemProperty);

        // Get the itemProperty
        restItemPropertyMockMvc.perform(get("/api/item-properties/{id}", itemProperty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemProperty.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.modificationDate").value(DEFAULT_MODIFICATION_DATE.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.uom").value(DEFAULT_UOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemProperty() throws Exception {
        // Get the itemProperty
        restItemPropertyMockMvc.perform(get("/api/item-properties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemProperty() throws Exception {
        // Initialize the database
        itemPropertyService.save(itemProperty);

        int databaseSizeBeforeUpdate = itemPropertyRepository.findAll().size();

        // Update the itemProperty
        ItemProperty updatedItemProperty = itemPropertyRepository.findById(itemProperty.getId()).get();
        // Disconnect from session so that the updates on updatedItemProperty are not directly saved in db
        em.detach(updatedItemProperty);
        updatedItemProperty
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .uom(UPDATED_UOM);

        restItemPropertyMockMvc.perform(put("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemProperty)))
            .andExpect(status().isOk());

        // Validate the ItemProperty in the database
        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeUpdate);
        ItemProperty testItemProperty = itemPropertyList.get(itemPropertyList.size() - 1);
        assertThat(testItemProperty.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItemProperty.getModificationDate()).isEqualTo(UPDATED_MODIFICATION_DATE);
        assertThat(testItemProperty.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testItemProperty.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testItemProperty.getUom()).isEqualTo(UPDATED_UOM);
    }

    @Test
    @Transactional
    public void updateNonExistingItemProperty() throws Exception {
        int databaseSizeBeforeUpdate = itemPropertyRepository.findAll().size();

        // Create the ItemProperty

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPropertyMockMvc.perform(put("/api/item-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemProperty)))
            .andExpect(status().isBadRequest());

        // Validate the ItemProperty in the database
        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemProperty() throws Exception {
        // Initialize the database
        itemPropertyService.save(itemProperty);

        int databaseSizeBeforeDelete = itemPropertyRepository.findAll().size();

        // Delete the itemProperty
        restItemPropertyMockMvc.perform(delete("/api/item-properties/{id}", itemProperty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemProperty> itemPropertyList = itemPropertyRepository.findAll();
        assertThat(itemPropertyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemProperty.class);
        ItemProperty itemProperty1 = new ItemProperty();
        itemProperty1.setId(1L);
        ItemProperty itemProperty2 = new ItemProperty();
        itemProperty2.setId(itemProperty1.getId());
        assertThat(itemProperty1).isEqualTo(itemProperty2);
        itemProperty2.setId(2L);
        assertThat(itemProperty1).isNotEqualTo(itemProperty2);
        itemProperty1.setId(null);
        assertThat(itemProperty1).isNotEqualTo(itemProperty2);
    }
}
