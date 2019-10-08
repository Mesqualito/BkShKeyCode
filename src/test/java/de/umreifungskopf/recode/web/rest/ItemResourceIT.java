package de.umreifungskopf.recode.web.rest;

import de.umreifungskopf.recode.BkShKeyCodeApp;
import de.umreifungskopf.recode.domain.Item;
import de.umreifungskopf.recode.repository.ItemRepository;
import de.umreifungskopf.recode.service.ItemService;
import de.umreifungskopf.recode.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;

import static de.umreifungskopf.recode.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemResource} REST controller.
 */
@SpringBootTest(classes = BkShKeyCodeApp.class)
public class ItemResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_TIMESTAMP = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_MODIFICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_MODIFICATION_DATE = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_NO = "AAAAAAAAAA";
    private static final String UPDATED_NO = "BBBBBBBBBB";

    private static final String DEFAULT_NO_2 = "AAAAAAAAAA";
    private static final String UPDATED_NO_2 = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUOM = "AAAAAAAAAA";
    private static final String UPDATED_BUOM = "BBBBBBBBBB";

    private static final Float DEFAULT_UNIT_PRICE = 1F;
    private static final Float UPDATED_UNIT_PRICE = 2F;
    private static final Float SMALLER_UNIT_PRICE = 1F - 1F;

    private static final Float DEFAULT_NET_WEIGHT = 1F;
    private static final Float UPDATED_NET_WEIGHT = 2F;
    private static final Float SMALLER_NET_WEIGHT = 1F - 1F;

    private static final String DEFAULT_HS_NO = "AAAAAAAAAA";
    private static final String UPDATED_HS_NO = "BBBBBBBBBB";

    private static final String DEFAULT_HS_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_HS_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_HS_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_HS_COMMENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_BLOCKED = false;
    private static final Boolean UPDATED_IS_BLOCKED = true;

    private static final String DEFAULT_SUOM = "AAAAAAAAAA";
    private static final String UPDATED_SUOM = "BBBBBBBBBB";

    private static final String DEFAULT_ITEM_CATEGORY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_CATEGORY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_GROUP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_GROUP_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_WS_CATEGORY_3_CODE = "AAAAAAAAAA";
    private static final String UPDATED_WS_CATEGORY_3_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_GTIN = false;
    private static final Boolean UPDATED_IS_GTIN = true;

    private static final Boolean DEFAULT_IS_ONLY_SPAREPARTS = false;
    private static final Boolean UPDATED_IS_ONLY_SPAREPARTS = true;

    private static final Boolean DEFAULT_IS_USED_FOR_WEBSHOP = false;
    private static final Boolean UPDATED_IS_USED_FOR_WEBSHOP = true;

    private static final String DEFAULT_APPLICATION_KIND = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_KIND = "BBBBBBBBBB";

    private static final String DEFAULT_STRAP_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_STRAP_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SEAL_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SEAL_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DRIVE_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STRAP_TENSION_MAX = 1;
    private static final Integer UPDATED_STRAP_TENSION_MAX = 2;
    private static final Integer SMALLER_STRAP_TENSION_MAX = 1 - 1;

    private static final String DEFAULT_STRAP_WIDTH = "AAAAAAAAAA";
    private static final String UPDATED_STRAP_WIDTH = "BBBBBBBBBB";

    private static final Integer DEFAULT_STRAPPINGS_PER_DAY = 1;
    private static final Integer UPDATED_STRAPPINGS_PER_DAY = 2;
    private static final Integer SMALLER_STRAPPINGS_PER_DAY = 1 - 1;

    private static final String DEFAULT_AKKU_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_AKKU_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_AKKU_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_AKKU_BRAND = "BBBBBBBBBB";

    private static final Integer DEFAULT_AKKU_CAPACITIY = 1;
    private static final Integer UPDATED_AKKU_CAPACITIY = 2;
    private static final Integer SMALLER_AKKU_CAPACITIY = 1 - 1;

    private static final Float DEFAULT_AKKU_VOLTAGE = 1F;
    private static final Float UPDATED_AKKU_VOLTAGE = 2F;
    private static final Float SMALLER_AKKU_VOLTAGE = 1F - 1F;

    private static final Float DEFAULT_SEAL_FIXITY = 1F;
    private static final Float UPDATED_SEAL_FIXITY = 2F;
    private static final Float SMALLER_SEAL_FIXITY = 1F - 1F;

    private static final Float DEFAULT_SPEED = 1F;
    private static final Float UPDATED_SPEED = 2F;
    private static final Float SMALLER_SPEED = 1F - 1F;

    private static final Integer DEFAULT_MOTORS = 1;
    private static final Integer UPDATED_MOTORS = 2;
    private static final Integer SMALLER_MOTORS = 1 - 1;

    private static final Float DEFAULT_STRAP_THICKNESS_MIN = 1F;
    private static final Float UPDATED_STRAP_THICKNESS_MIN = 2F;
    private static final Float SMALLER_STRAP_THICKNESS_MIN = 1F - 1F;

    private static final Float DEFAULT_STRAP_THICKNESS_MAX = 1F;
    private static final Float UPDATED_STRAP_THICKNESS_MAX = 2F;
    private static final Float SMALLER_STRAP_THICKNESS_MAX = 1F - 1F;

    private static final Boolean DEFAULT_IS_IN_PRODUCT_FINDER = false;
    private static final Boolean UPDATED_IS_IN_PRODUCT_FINDER = true;

    private static final Boolean DEFAULT_IS_FULLY_AUTOMATIC_TENSION = false;
    private static final Boolean UPDATED_IS_FULLY_AUTOMATIC_TENSION = true;

    private static final Boolean DEFAULT_IS_WELDING_BY_BUTTON = false;
    private static final Boolean UPDATED_IS_WELDING_BY_BUTTON = true;

    @Autowired
    private ItemRepository itemRepository;

    @Mock
    private ItemRepository itemRepositoryMock;

    @Mock
    private ItemService itemServiceMock;

    @Autowired
    private ItemService itemService;

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

    private MockMvc restItemMockMvc;

    private Item item;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemResource itemResource = new ItemResource(itemService);
        this.restItemMockMvc = MockMvcBuilders.standaloneSetup(itemResource)
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
    public static Item createEntity(EntityManager em) {
        Item item = new Item()
            .timestamp(DEFAULT_TIMESTAMP)
            .modificationDate(DEFAULT_MODIFICATION_DATE)
            .no(DEFAULT_NO)
            .no2(DEFAULT_NO_2)
            .name(DEFAULT_NAME)
            .buom(DEFAULT_BUOM)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .netWeight(DEFAULT_NET_WEIGHT)
            .hsNo(DEFAULT_HS_NO)
            .hsDescription(DEFAULT_HS_DESCRIPTION)
            .hsComment(DEFAULT_HS_COMMENT)
            .isBlocked(DEFAULT_IS_BLOCKED)
            .suom(DEFAULT_SUOM)
            .itemCategoryCode(DEFAULT_ITEM_CATEGORY_CODE)
            .productGroupCode(DEFAULT_PRODUCT_GROUP_CODE)
            .wsCategory3Code(DEFAULT_WS_CATEGORY_3_CODE)
            .isGTIN(DEFAULT_IS_GTIN)
            .isOnlySpareparts(DEFAULT_IS_ONLY_SPAREPARTS)
            .isUsedForWebshop(DEFAULT_IS_USED_FOR_WEBSHOP)
            .applicationKind(DEFAULT_APPLICATION_KIND)
            .strapType(DEFAULT_STRAP_TYPE)
            .sealType(DEFAULT_SEAL_TYPE)
            .driveType(DEFAULT_DRIVE_TYPE)
            .strapTensionMax(DEFAULT_STRAP_TENSION_MAX)
            .strapWidth(DEFAULT_STRAP_WIDTH)
            .strappingsPerDay(DEFAULT_STRAPPINGS_PER_DAY)
            .akkuType(DEFAULT_AKKU_TYPE)
            .akkuBrand(DEFAULT_AKKU_BRAND)
            .akkuCapacitiy(DEFAULT_AKKU_CAPACITIY)
            .akkuVoltage(DEFAULT_AKKU_VOLTAGE)
            .sealFixity(DEFAULT_SEAL_FIXITY)
            .speed(DEFAULT_SPEED)
            .motors(DEFAULT_MOTORS)
            .strapThicknessMin(DEFAULT_STRAP_THICKNESS_MIN)
            .strapThicknessMax(DEFAULT_STRAP_THICKNESS_MAX)
            .isInProductFinder(DEFAULT_IS_IN_PRODUCT_FINDER)
            .isFullyAutomaticTension(DEFAULT_IS_FULLY_AUTOMATIC_TENSION)
            .isWeldingByButton(DEFAULT_IS_WELDING_BY_BUTTON);
        return item;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Item createUpdatedEntity(EntityManager em) {
        Item item = new Item()
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .no(UPDATED_NO)
            .no2(UPDATED_NO_2)
            .name(UPDATED_NAME)
            .buom(UPDATED_BUOM)
            .unitPrice(UPDATED_UNIT_PRICE)
            .netWeight(UPDATED_NET_WEIGHT)
            .hsNo(UPDATED_HS_NO)
            .hsDescription(UPDATED_HS_DESCRIPTION)
            .hsComment(UPDATED_HS_COMMENT)
            .isBlocked(UPDATED_IS_BLOCKED)
            .suom(UPDATED_SUOM)
            .itemCategoryCode(UPDATED_ITEM_CATEGORY_CODE)
            .productGroupCode(UPDATED_PRODUCT_GROUP_CODE)
            .wsCategory3Code(UPDATED_WS_CATEGORY_3_CODE)
            .isGTIN(UPDATED_IS_GTIN)
            .isOnlySpareparts(UPDATED_IS_ONLY_SPAREPARTS)
            .isUsedForWebshop(UPDATED_IS_USED_FOR_WEBSHOP)
            .applicationKind(UPDATED_APPLICATION_KIND)
            .strapType(UPDATED_STRAP_TYPE)
            .sealType(UPDATED_SEAL_TYPE)
            .driveType(UPDATED_DRIVE_TYPE)
            .strapTensionMax(UPDATED_STRAP_TENSION_MAX)
            .strapWidth(UPDATED_STRAP_WIDTH)
            .strappingsPerDay(UPDATED_STRAPPINGS_PER_DAY)
            .akkuType(UPDATED_AKKU_TYPE)
            .akkuBrand(UPDATED_AKKU_BRAND)
            .akkuCapacitiy(UPDATED_AKKU_CAPACITIY)
            .akkuVoltage(UPDATED_AKKU_VOLTAGE)
            .sealFixity(UPDATED_SEAL_FIXITY)
            .speed(UPDATED_SPEED)
            .motors(UPDATED_MOTORS)
            .strapThicknessMin(UPDATED_STRAP_THICKNESS_MIN)
            .strapThicknessMax(UPDATED_STRAP_THICKNESS_MAX)
            .isInProductFinder(UPDATED_IS_IN_PRODUCT_FINDER)
            .isFullyAutomaticTension(UPDATED_IS_FULLY_AUTOMATIC_TENSION)
            .isWeldingByButton(UPDATED_IS_WELDING_BY_BUTTON);
        return item;
    }

    @BeforeEach
    public void initTest() {
        item = createEntity(em);
    }

    @Test
    @Transactional
    public void createItem() throws Exception {
        int databaseSizeBeforeCreate = itemRepository.findAll().size();

        // Create the Item
        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isCreated());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeCreate + 1);
        Item testItem = itemList.get(itemList.size() - 1);
        assertThat(testItem.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItem.getModificationDate()).isEqualTo(DEFAULT_MODIFICATION_DATE);
        assertThat(testItem.getNo()).isEqualTo(DEFAULT_NO);
        assertThat(testItem.getNo2()).isEqualTo(DEFAULT_NO_2);
        assertThat(testItem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testItem.getBuom()).isEqualTo(DEFAULT_BUOM);
        assertThat(testItem.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testItem.getNetWeight()).isEqualTo(DEFAULT_NET_WEIGHT);
        assertThat(testItem.getHsNo()).isEqualTo(DEFAULT_HS_NO);
        assertThat(testItem.getHsDescription()).isEqualTo(DEFAULT_HS_DESCRIPTION);
        assertThat(testItem.getHsComment()).isEqualTo(DEFAULT_HS_COMMENT);
        assertThat(testItem.isIsBlocked()).isEqualTo(DEFAULT_IS_BLOCKED);
        assertThat(testItem.getSuom()).isEqualTo(DEFAULT_SUOM);
        assertThat(testItem.getItemCategoryCode()).isEqualTo(DEFAULT_ITEM_CATEGORY_CODE);
        assertThat(testItem.getProductGroupCode()).isEqualTo(DEFAULT_PRODUCT_GROUP_CODE);
        assertThat(testItem.getWsCategory3Code()).isEqualTo(DEFAULT_WS_CATEGORY_3_CODE);
        assertThat(testItem.isIsGTIN()).isEqualTo(DEFAULT_IS_GTIN);
        assertThat(testItem.isIsOnlySpareparts()).isEqualTo(DEFAULT_IS_ONLY_SPAREPARTS);
        assertThat(testItem.isIsUsedForWebshop()).isEqualTo(DEFAULT_IS_USED_FOR_WEBSHOP);
        assertThat(testItem.getApplicationKind()).isEqualTo(DEFAULT_APPLICATION_KIND);
        assertThat(testItem.getStrapType()).isEqualTo(DEFAULT_STRAP_TYPE);
        assertThat(testItem.getSealType()).isEqualTo(DEFAULT_SEAL_TYPE);
        assertThat(testItem.getDriveType()).isEqualTo(DEFAULT_DRIVE_TYPE);
        assertThat(testItem.getStrapTensionMax()).isEqualTo(DEFAULT_STRAP_TENSION_MAX);
        assertThat(testItem.getStrapWidth()).isEqualTo(DEFAULT_STRAP_WIDTH);
        assertThat(testItem.getStrappingsPerDay()).isEqualTo(DEFAULT_STRAPPINGS_PER_DAY);
        assertThat(testItem.getAkkuType()).isEqualTo(DEFAULT_AKKU_TYPE);
        assertThat(testItem.getAkkuBrand()).isEqualTo(DEFAULT_AKKU_BRAND);
        assertThat(testItem.getAkkuCapacitiy()).isEqualTo(DEFAULT_AKKU_CAPACITIY);
        assertThat(testItem.getAkkuVoltage()).isEqualTo(DEFAULT_AKKU_VOLTAGE);
        assertThat(testItem.getSealFixity()).isEqualTo(DEFAULT_SEAL_FIXITY);
        assertThat(testItem.getSpeed()).isEqualTo(DEFAULT_SPEED);
        assertThat(testItem.getMotors()).isEqualTo(DEFAULT_MOTORS);
        assertThat(testItem.getStrapThicknessMin()).isEqualTo(DEFAULT_STRAP_THICKNESS_MIN);
        assertThat(testItem.getStrapThicknessMax()).isEqualTo(DEFAULT_STRAP_THICKNESS_MAX);
        assertThat(testItem.isIsInProductFinder()).isEqualTo(DEFAULT_IS_IN_PRODUCT_FINDER);
        assertThat(testItem.isIsFullyAutomaticTension()).isEqualTo(DEFAULT_IS_FULLY_AUTOMATIC_TENSION);
        assertThat(testItem.isIsWeldingByButton()).isEqualTo(DEFAULT_IS_WELDING_BY_BUTTON);
    }

    @Test
    @Transactional
    public void createItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemRepository.findAll().size();

        // Create the Item with an existing ID
        item.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemRepository.findAll().size();
        // set the field null
        item.setTimestamp(null);

        // Create the Item, which fails.

        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemRepository.findAll().size();
        // set the field null
        item.setNo(null);

        // Create the Item, which fails.

        restItemMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItems() throws Exception {
        // Initialize the database
        itemRepository.saveAndFlush(item);

        // Get all the itemList
        restItemMockMvc.perform(get("/api/items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(item.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].modificationDate").value(hasItem(DEFAULT_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].no").value(hasItem(DEFAULT_NO.toString())))
            .andExpect(jsonPath("$.[*].no2").value(hasItem(DEFAULT_NO_2.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].buom").value(hasItem(DEFAULT_BUOM.toString())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].netWeight").value(hasItem(DEFAULT_NET_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].hsNo").value(hasItem(DEFAULT_HS_NO.toString())))
            .andExpect(jsonPath("$.[*].hsDescription").value(hasItem(DEFAULT_HS_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].hsComment").value(hasItem(DEFAULT_HS_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].isBlocked").value(hasItem(DEFAULT_IS_BLOCKED.booleanValue())))
            .andExpect(jsonPath("$.[*].suom").value(hasItem(DEFAULT_SUOM.toString())))
            .andExpect(jsonPath("$.[*].itemCategoryCode").value(hasItem(DEFAULT_ITEM_CATEGORY_CODE.toString())))
            .andExpect(jsonPath("$.[*].productGroupCode").value(hasItem(DEFAULT_PRODUCT_GROUP_CODE.toString())))
            .andExpect(jsonPath("$.[*].wsCategory3Code").value(hasItem(DEFAULT_WS_CATEGORY_3_CODE.toString())))
            .andExpect(jsonPath("$.[*].isGTIN").value(hasItem(DEFAULT_IS_GTIN.booleanValue())))
            .andExpect(jsonPath("$.[*].isOnlySpareparts").value(hasItem(DEFAULT_IS_ONLY_SPAREPARTS.booleanValue())))
            .andExpect(jsonPath("$.[*].isUsedForWebshop").value(hasItem(DEFAULT_IS_USED_FOR_WEBSHOP.booleanValue())))
            .andExpect(jsonPath("$.[*].applicationKind").value(hasItem(DEFAULT_APPLICATION_KIND.toString())))
            .andExpect(jsonPath("$.[*].strapType").value(hasItem(DEFAULT_STRAP_TYPE.toString())))
            .andExpect(jsonPath("$.[*].sealType").value(hasItem(DEFAULT_SEAL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].driveType").value(hasItem(DEFAULT_DRIVE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].strapTensionMax").value(hasItem(DEFAULT_STRAP_TENSION_MAX)))
            .andExpect(jsonPath("$.[*].strapWidth").value(hasItem(DEFAULT_STRAP_WIDTH.toString())))
            .andExpect(jsonPath("$.[*].strappingsPerDay").value(hasItem(DEFAULT_STRAPPINGS_PER_DAY)))
            .andExpect(jsonPath("$.[*].akkuType").value(hasItem(DEFAULT_AKKU_TYPE.toString())))
            .andExpect(jsonPath("$.[*].akkuBrand").value(hasItem(DEFAULT_AKKU_BRAND.toString())))
            .andExpect(jsonPath("$.[*].akkuCapacitiy").value(hasItem(DEFAULT_AKKU_CAPACITIY)))
            .andExpect(jsonPath("$.[*].akkuVoltage").value(hasItem(DEFAULT_AKKU_VOLTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].sealFixity").value(hasItem(DEFAULT_SEAL_FIXITY.doubleValue())))
            .andExpect(jsonPath("$.[*].speed").value(hasItem(DEFAULT_SPEED.doubleValue())))
            .andExpect(jsonPath("$.[*].motors").value(hasItem(DEFAULT_MOTORS)))
            .andExpect(jsonPath("$.[*].strapThicknessMin").value(hasItem(DEFAULT_STRAP_THICKNESS_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].strapThicknessMax").value(hasItem(DEFAULT_STRAP_THICKNESS_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].isInProductFinder").value(hasItem(DEFAULT_IS_IN_PRODUCT_FINDER.booleanValue())))
            .andExpect(jsonPath("$.[*].isFullyAutomaticTension").value(hasItem(DEFAULT_IS_FULLY_AUTOMATIC_TENSION.booleanValue())))
            .andExpect(jsonPath("$.[*].isWeldingByButton").value(hasItem(DEFAULT_IS_WELDING_BY_BUTTON.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllItemsWithEagerRelationshipsIsEnabled() throws Exception {
        ItemResource itemResource = new ItemResource(itemServiceMock);
        when(itemServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restItemMockMvc = MockMvcBuilders.standaloneSetup(itemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restItemMockMvc.perform(get("/api/items?eagerload=true"))
        .andExpect(status().isOk());

        verify(itemServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllItemsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ItemResource itemResource = new ItemResource(itemServiceMock);
            when(itemServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restItemMockMvc = MockMvcBuilders.standaloneSetup(itemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restItemMockMvc.perform(get("/api/items?eagerload=true"))
        .andExpect(status().isOk());

            verify(itemServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getItem() throws Exception {
        // Initialize the database
        itemRepository.saveAndFlush(item);

        // Get the item
        restItemMockMvc.perform(get("/api/items/{id}", item.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(item.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.modificationDate").value(DEFAULT_MODIFICATION_DATE.toString()))
            .andExpect(jsonPath("$.no").value(DEFAULT_NO.toString()))
            .andExpect(jsonPath("$.no2").value(DEFAULT_NO_2.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.buom").value(DEFAULT_BUOM.toString()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.netWeight").value(DEFAULT_NET_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.hsNo").value(DEFAULT_HS_NO.toString()))
            .andExpect(jsonPath("$.hsDescription").value(DEFAULT_HS_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.hsComment").value(DEFAULT_HS_COMMENT.toString()))
            .andExpect(jsonPath("$.isBlocked").value(DEFAULT_IS_BLOCKED.booleanValue()))
            .andExpect(jsonPath("$.suom").value(DEFAULT_SUOM.toString()))
            .andExpect(jsonPath("$.itemCategoryCode").value(DEFAULT_ITEM_CATEGORY_CODE.toString()))
            .andExpect(jsonPath("$.productGroupCode").value(DEFAULT_PRODUCT_GROUP_CODE.toString()))
            .andExpect(jsonPath("$.wsCategory3Code").value(DEFAULT_WS_CATEGORY_3_CODE.toString()))
            .andExpect(jsonPath("$.isGTIN").value(DEFAULT_IS_GTIN.booleanValue()))
            .andExpect(jsonPath("$.isOnlySpareparts").value(DEFAULT_IS_ONLY_SPAREPARTS.booleanValue()))
            .andExpect(jsonPath("$.isUsedForWebshop").value(DEFAULT_IS_USED_FOR_WEBSHOP.booleanValue()))
            .andExpect(jsonPath("$.applicationKind").value(DEFAULT_APPLICATION_KIND.toString()))
            .andExpect(jsonPath("$.strapType").value(DEFAULT_STRAP_TYPE.toString()))
            .andExpect(jsonPath("$.sealType").value(DEFAULT_SEAL_TYPE.toString()))
            .andExpect(jsonPath("$.driveType").value(DEFAULT_DRIVE_TYPE.toString()))
            .andExpect(jsonPath("$.strapTensionMax").value(DEFAULT_STRAP_TENSION_MAX))
            .andExpect(jsonPath("$.strapWidth").value(DEFAULT_STRAP_WIDTH.toString()))
            .andExpect(jsonPath("$.strappingsPerDay").value(DEFAULT_STRAPPINGS_PER_DAY))
            .andExpect(jsonPath("$.akkuType").value(DEFAULT_AKKU_TYPE.toString()))
            .andExpect(jsonPath("$.akkuBrand").value(DEFAULT_AKKU_BRAND.toString()))
            .andExpect(jsonPath("$.akkuCapacitiy").value(DEFAULT_AKKU_CAPACITIY))
            .andExpect(jsonPath("$.akkuVoltage").value(DEFAULT_AKKU_VOLTAGE.doubleValue()))
            .andExpect(jsonPath("$.sealFixity").value(DEFAULT_SEAL_FIXITY.doubleValue()))
            .andExpect(jsonPath("$.speed").value(DEFAULT_SPEED.doubleValue()))
            .andExpect(jsonPath("$.motors").value(DEFAULT_MOTORS))
            .andExpect(jsonPath("$.strapThicknessMin").value(DEFAULT_STRAP_THICKNESS_MIN.doubleValue()))
            .andExpect(jsonPath("$.strapThicknessMax").value(DEFAULT_STRAP_THICKNESS_MAX.doubleValue()))
            .andExpect(jsonPath("$.isInProductFinder").value(DEFAULT_IS_IN_PRODUCT_FINDER.booleanValue()))
            .andExpect(jsonPath("$.isFullyAutomaticTension").value(DEFAULT_IS_FULLY_AUTOMATIC_TENSION.booleanValue()))
            .andExpect(jsonPath("$.isWeldingByButton").value(DEFAULT_IS_WELDING_BY_BUTTON.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItem() throws Exception {
        // Get the item
        restItemMockMvc.perform(get("/api/items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItem() throws Exception {
        // Initialize the database
        itemService.save(item);

        int databaseSizeBeforeUpdate = itemRepository.findAll().size();

        // Update the item
        Item updatedItem = itemRepository.findById(item.getId()).get();
        // Disconnect from session so that the updates on updatedItem are not directly saved in db
        em.detach(updatedItem);
        updatedItem
            .timestamp(UPDATED_TIMESTAMP)
            .modificationDate(UPDATED_MODIFICATION_DATE)
            .no(UPDATED_NO)
            .no2(UPDATED_NO_2)
            .name(UPDATED_NAME)
            .buom(UPDATED_BUOM)
            .unitPrice(UPDATED_UNIT_PRICE)
            .netWeight(UPDATED_NET_WEIGHT)
            .hsNo(UPDATED_HS_NO)
            .hsDescription(UPDATED_HS_DESCRIPTION)
            .hsComment(UPDATED_HS_COMMENT)
            .isBlocked(UPDATED_IS_BLOCKED)
            .suom(UPDATED_SUOM)
            .itemCategoryCode(UPDATED_ITEM_CATEGORY_CODE)
            .productGroupCode(UPDATED_PRODUCT_GROUP_CODE)
            .wsCategory3Code(UPDATED_WS_CATEGORY_3_CODE)
            .isGTIN(UPDATED_IS_GTIN)
            .isOnlySpareparts(UPDATED_IS_ONLY_SPAREPARTS)
            .isUsedForWebshop(UPDATED_IS_USED_FOR_WEBSHOP)
            .applicationKind(UPDATED_APPLICATION_KIND)
            .strapType(UPDATED_STRAP_TYPE)
            .sealType(UPDATED_SEAL_TYPE)
            .driveType(UPDATED_DRIVE_TYPE)
            .strapTensionMax(UPDATED_STRAP_TENSION_MAX)
            .strapWidth(UPDATED_STRAP_WIDTH)
            .strappingsPerDay(UPDATED_STRAPPINGS_PER_DAY)
            .akkuType(UPDATED_AKKU_TYPE)
            .akkuBrand(UPDATED_AKKU_BRAND)
            .akkuCapacitiy(UPDATED_AKKU_CAPACITIY)
            .akkuVoltage(UPDATED_AKKU_VOLTAGE)
            .sealFixity(UPDATED_SEAL_FIXITY)
            .speed(UPDATED_SPEED)
            .motors(UPDATED_MOTORS)
            .strapThicknessMin(UPDATED_STRAP_THICKNESS_MIN)
            .strapThicknessMax(UPDATED_STRAP_THICKNESS_MAX)
            .isInProductFinder(UPDATED_IS_IN_PRODUCT_FINDER)
            .isFullyAutomaticTension(UPDATED_IS_FULLY_AUTOMATIC_TENSION)
            .isWeldingByButton(UPDATED_IS_WELDING_BY_BUTTON);

        restItemMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItem)))
            .andExpect(status().isOk());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeUpdate);
        Item testItem = itemList.get(itemList.size() - 1);
        assertThat(testItem.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItem.getModificationDate()).isEqualTo(UPDATED_MODIFICATION_DATE);
        assertThat(testItem.getNo()).isEqualTo(UPDATED_NO);
        assertThat(testItem.getNo2()).isEqualTo(UPDATED_NO_2);
        assertThat(testItem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testItem.getBuom()).isEqualTo(UPDATED_BUOM);
        assertThat(testItem.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testItem.getNetWeight()).isEqualTo(UPDATED_NET_WEIGHT);
        assertThat(testItem.getHsNo()).isEqualTo(UPDATED_HS_NO);
        assertThat(testItem.getHsDescription()).isEqualTo(UPDATED_HS_DESCRIPTION);
        assertThat(testItem.getHsComment()).isEqualTo(UPDATED_HS_COMMENT);
        assertThat(testItem.isIsBlocked()).isEqualTo(UPDATED_IS_BLOCKED);
        assertThat(testItem.getSuom()).isEqualTo(UPDATED_SUOM);
        assertThat(testItem.getItemCategoryCode()).isEqualTo(UPDATED_ITEM_CATEGORY_CODE);
        assertThat(testItem.getProductGroupCode()).isEqualTo(UPDATED_PRODUCT_GROUP_CODE);
        assertThat(testItem.getWsCategory3Code()).isEqualTo(UPDATED_WS_CATEGORY_3_CODE);
        assertThat(testItem.isIsGTIN()).isEqualTo(UPDATED_IS_GTIN);
        assertThat(testItem.isIsOnlySpareparts()).isEqualTo(UPDATED_IS_ONLY_SPAREPARTS);
        assertThat(testItem.isIsUsedForWebshop()).isEqualTo(UPDATED_IS_USED_FOR_WEBSHOP);
        assertThat(testItem.getApplicationKind()).isEqualTo(UPDATED_APPLICATION_KIND);
        assertThat(testItem.getStrapType()).isEqualTo(UPDATED_STRAP_TYPE);
        assertThat(testItem.getSealType()).isEqualTo(UPDATED_SEAL_TYPE);
        assertThat(testItem.getDriveType()).isEqualTo(UPDATED_DRIVE_TYPE);
        assertThat(testItem.getStrapTensionMax()).isEqualTo(UPDATED_STRAP_TENSION_MAX);
        assertThat(testItem.getStrapWidth()).isEqualTo(UPDATED_STRAP_WIDTH);
        assertThat(testItem.getStrappingsPerDay()).isEqualTo(UPDATED_STRAPPINGS_PER_DAY);
        assertThat(testItem.getAkkuType()).isEqualTo(UPDATED_AKKU_TYPE);
        assertThat(testItem.getAkkuBrand()).isEqualTo(UPDATED_AKKU_BRAND);
        assertThat(testItem.getAkkuCapacitiy()).isEqualTo(UPDATED_AKKU_CAPACITIY);
        assertThat(testItem.getAkkuVoltage()).isEqualTo(UPDATED_AKKU_VOLTAGE);
        assertThat(testItem.getSealFixity()).isEqualTo(UPDATED_SEAL_FIXITY);
        assertThat(testItem.getSpeed()).isEqualTo(UPDATED_SPEED);
        assertThat(testItem.getMotors()).isEqualTo(UPDATED_MOTORS);
        assertThat(testItem.getStrapThicknessMin()).isEqualTo(UPDATED_STRAP_THICKNESS_MIN);
        assertThat(testItem.getStrapThicknessMax()).isEqualTo(UPDATED_STRAP_THICKNESS_MAX);
        assertThat(testItem.isIsInProductFinder()).isEqualTo(UPDATED_IS_IN_PRODUCT_FINDER);
        assertThat(testItem.isIsFullyAutomaticTension()).isEqualTo(UPDATED_IS_FULLY_AUTOMATIC_TENSION);
        assertThat(testItem.isIsWeldingByButton()).isEqualTo(UPDATED_IS_WELDING_BY_BUTTON);
    }

    @Test
    @Transactional
    public void updateNonExistingItem() throws Exception {
        int databaseSizeBeforeUpdate = itemRepository.findAll().size();

        // Create the Item

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(item)))
            .andExpect(status().isBadRequest());

        // Validate the Item in the database
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItem() throws Exception {
        // Initialize the database
        itemService.save(item);

        int databaseSizeBeforeDelete = itemRepository.findAll().size();

        // Delete the item
        restItemMockMvc.perform(delete("/api/items/{id}", item.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Item> itemList = itemRepository.findAll();
        assertThat(itemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Item.class);
        Item item1 = new Item();
        item1.setId(1L);
        Item item2 = new Item();
        item2.setId(item1.getId());
        assertThat(item1).isEqualTo(item2);
        item2.setId(2L);
        assertThat(item1).isNotEqualTo(item2);
        item1.setId(null);
        assertThat(item1).isNotEqualTo(item2);
    }
}
