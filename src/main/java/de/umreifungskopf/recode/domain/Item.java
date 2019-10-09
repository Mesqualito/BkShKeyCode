package de.umreifungskopf.recode.domain;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @Column(name = "modification_date")
    private Instant modificationDate;

    @NotNull
    @Column(name = "no", nullable = false)
    private String no;

    @Column(name = "no_2")
    private String no2;

    @Column(name = "name")
    private String name;

    /**
     * base unit of measure
     */
    @ApiModelProperty(value = "base unit of measure")
    @Column(name = "buom")
    private String buom;

    @Column(name = "unit_price")
    private Float unitPrice;

    @Column(name = "net_weight")
    private Float netWeight;

    @Column(name = "hs_no")
    private String hsNo;

    @Column(name = "hs_description")
    private String hsDescription;

    @Column(name = "hs_comment")
    private String hsComment;

    @Column(name = "is_blocked")
    private Boolean isBlocked;

    /**
     * sales unit of measure
     */
    @ApiModelProperty(value = "sales unit of measure")
    @Column(name = "suom")
    private String suom;

    @Column(name = "item_category_code")
    private String itemCategoryCode;

    @Column(name = "product_group_code")
    private String productGroupCode;

    @Column(name = "ws_category_3_code")
    private String wsCategory3Code;

    @Column(name = "is_gtin")
    private Boolean isGTIN;

    @Column(name = "is_only_spareparts")
    private Boolean isOnlySpareparts;

    @Column(name = "is_used_for_webshop")
    private Boolean isUsedForWebshop;

    @Column(name = "application_kind")
    private String applicationKind;

    @Column(name = "strap_type")
    private String strapType;

    @Column(name = "seal_type")
    private String sealType;

    @Column(name = "drive_type")
    private String driveType;

    @Column(name = "strap_tension_max")
    private Integer strapTensionMax;

    @Column(name = "strap_width")
    private String strapWidth;

    @Column(name = "strappings_per_day")
    private Integer strappingsPerDay;

    @Column(name = "akku_type")
    private String akkuType;

    @Column(name = "akku_brand")
    private String akkuBrand;

    @Column(name = "akku_capacitiy")
    private Integer akkuCapacitiy;

    @Column(name = "akku_voltage")
    private Float akkuVoltage;

    @Column(name = "seal_fixity")
    private Float sealFixity;

    @Column(name = "speed")
    private Float speed;

    @Column(name = "motors")
    private Integer motors;

    @Column(name = "strap_thickness_min")
    private Float strapThicknessMin;

    @Column(name = "strap_thickness_max")
    private Float strapThicknessMax;

    @Column(name = "is_in_product_finder")
    private Boolean isInProductFinder;

    @Column(name = "is_fully_automatic_tension")
    private Boolean isFullyAutomaticTension;

    @Column(name = "is_welding_by_button")
    private Boolean isWeldingByButton;

    @OneToMany(mappedBy = "item")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ItemReference> itemReferences = new HashSet<>();

    @OneToMany(mappedBy = "item")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExtendedTextHeader> extendedTextHeaders = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "item_subst_no",
               joinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "subst_no_id", referencedColumnName = "id"))
    private Set<ItemSubstitution> substNos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public Item timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Instant getModificationDate() {
        return modificationDate;
    }

    public Item modificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public void setModificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
    }

    public String getNo() {
        return no;
    }

    public Item no(String no) {
        this.no = no;
        return this;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getNo2() {
        return no2;
    }

    public Item no2(String no2) {
        this.no2 = no2;
        return this;
    }

    public void setNo2(String no2) {
        this.no2 = no2;
    }

    public String getName() {
        return name;
    }

    public Item name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBuom() {
        return buom;
    }

    public Item buom(String buom) {
        this.buom = buom;
        return this;
    }

    public void setBuom(String buom) {
        this.buom = buom;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public Item unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getNetWeight() {
        return netWeight;
    }

    public Item netWeight(Float netWeight) {
        this.netWeight = netWeight;
        return this;
    }

    public void setNetWeight(Float netWeight) {
        this.netWeight = netWeight;
    }

    public String getHsNo() {
        return hsNo;
    }

    public Item hsNo(String hsNo) {
        this.hsNo = hsNo;
        return this;
    }

    public void setHsNo(String hsNo) {
        this.hsNo = hsNo;
    }

    public String getHsDescription() {
        return hsDescription;
    }

    public Item hsDescription(String hsDescription) {
        this.hsDescription = hsDescription;
        return this;
    }

    public void setHsDescription(String hsDescription) {
        this.hsDescription = hsDescription;
    }

    public String getHsComment() {
        return hsComment;
    }

    public Item hsComment(String hsComment) {
        this.hsComment = hsComment;
        return this;
    }

    public void setHsComment(String hsComment) {
        this.hsComment = hsComment;
    }

    public Boolean isIsBlocked() {
        return isBlocked;
    }

    public Item isBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
        return this;
    }

    public void setIsBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

    public String getSuom() {
        return suom;
    }

    public Item suom(String suom) {
        this.suom = suom;
        return this;
    }

    public void setSuom(String suom) {
        this.suom = suom;
    }

    public String getItemCategoryCode() {
        return itemCategoryCode;
    }

    public Item itemCategoryCode(String itemCategoryCode) {
        this.itemCategoryCode = itemCategoryCode;
        return this;
    }

    public void setItemCategoryCode(String itemCategoryCode) {
        this.itemCategoryCode = itemCategoryCode;
    }

    public String getProductGroupCode() {
        return productGroupCode;
    }

    public Item productGroupCode(String productGroupCode) {
        this.productGroupCode = productGroupCode;
        return this;
    }

    public void setProductGroupCode(String productGroupCode) {
        this.productGroupCode = productGroupCode;
    }

    public String getWsCategory3Code() {
        return wsCategory3Code;
    }

    public Item wsCategory3Code(String wsCategory3Code) {
        this.wsCategory3Code = wsCategory3Code;
        return this;
    }

    public void setWsCategory3Code(String wsCategory3Code) {
        this.wsCategory3Code = wsCategory3Code;
    }

    public Boolean isIsGTIN() {
        return isGTIN;
    }

    public Item isGTIN(Boolean isGTIN) {
        this.isGTIN = isGTIN;
        return this;
    }

    public void setIsGTIN(Boolean isGTIN) {
        this.isGTIN = isGTIN;
    }

    public Boolean isIsOnlySpareparts() {
        return isOnlySpareparts;
    }

    public Item isOnlySpareparts(Boolean isOnlySpareparts) {
        this.isOnlySpareparts = isOnlySpareparts;
        return this;
    }

    public void setIsOnlySpareparts(Boolean isOnlySpareparts) {
        this.isOnlySpareparts = isOnlySpareparts;
    }

    public Boolean isIsUsedForWebshop() {
        return isUsedForWebshop;
    }

    public Item isUsedForWebshop(Boolean isUsedForWebshop) {
        this.isUsedForWebshop = isUsedForWebshop;
        return this;
    }

    public void setIsUsedForWebshop(Boolean isUsedForWebshop) {
        this.isUsedForWebshop = isUsedForWebshop;
    }

    public String getApplicationKind() {
        return applicationKind;
    }

    public Item applicationKind(String applicationKind) {
        this.applicationKind = applicationKind;
        return this;
    }

    public void setApplicationKind(String applicationKind) {
        this.applicationKind = applicationKind;
    }

    public String getStrapType() {
        return strapType;
    }

    public Item strapType(String strapType) {
        this.strapType = strapType;
        return this;
    }

    public void setStrapType(String strapType) {
        this.strapType = strapType;
    }

    public String getSealType() {
        return sealType;
    }

    public Item sealType(String sealType) {
        this.sealType = sealType;
        return this;
    }

    public void setSealType(String sealType) {
        this.sealType = sealType;
    }

    public String getDriveType() {
        return driveType;
    }

    public Item driveType(String driveType) {
        this.driveType = driveType;
        return this;
    }

    public void setDriveType(String driveType) {
        this.driveType = driveType;
    }

    public Integer getStrapTensionMax() {
        return strapTensionMax;
    }

    public Item strapTensionMax(Integer strapTensionMax) {
        this.strapTensionMax = strapTensionMax;
        return this;
    }

    public void setStrapTensionMax(Integer strapTensionMax) {
        this.strapTensionMax = strapTensionMax;
    }

    public String getStrapWidth() {
        return strapWidth;
    }

    public Item strapWidth(String strapWidth) {
        this.strapWidth = strapWidth;
        return this;
    }

    public void setStrapWidth(String strapWidth) {
        this.strapWidth = strapWidth;
    }

    public Integer getStrappingsPerDay() {
        return strappingsPerDay;
    }

    public Item strappingsPerDay(Integer strappingsPerDay) {
        this.strappingsPerDay = strappingsPerDay;
        return this;
    }

    public void setStrappingsPerDay(Integer strappingsPerDay) {
        this.strappingsPerDay = strappingsPerDay;
    }

    public String getAkkuType() {
        return akkuType;
    }

    public Item akkuType(String akkuType) {
        this.akkuType = akkuType;
        return this;
    }

    public void setAkkuType(String akkuType) {
        this.akkuType = akkuType;
    }

    public String getAkkuBrand() {
        return akkuBrand;
    }

    public Item akkuBrand(String akkuBrand) {
        this.akkuBrand = akkuBrand;
        return this;
    }

    public void setAkkuBrand(String akkuBrand) {
        this.akkuBrand = akkuBrand;
    }

    public Integer getAkkuCapacitiy() {
        return akkuCapacitiy;
    }

    public Item akkuCapacitiy(Integer akkuCapacitiy) {
        this.akkuCapacitiy = akkuCapacitiy;
        return this;
    }

    public void setAkkuCapacitiy(Integer akkuCapacitiy) {
        this.akkuCapacitiy = akkuCapacitiy;
    }

    public Float getAkkuVoltage() {
        return akkuVoltage;
    }

    public Item akkuVoltage(Float akkuVoltage) {
        this.akkuVoltage = akkuVoltage;
        return this;
    }

    public void setAkkuVoltage(Float akkuVoltage) {
        this.akkuVoltage = akkuVoltage;
    }

    public Float getSealFixity() {
        return sealFixity;
    }

    public Item sealFixity(Float sealFixity) {
        this.sealFixity = sealFixity;
        return this;
    }

    public void setSealFixity(Float sealFixity) {
        this.sealFixity = sealFixity;
    }

    public Float getSpeed() {
        return speed;
    }

    public Item speed(Float speed) {
        this.speed = speed;
        return this;
    }

    public void setSpeed(Float speed) {
        this.speed = speed;
    }

    public Integer getMotors() {
        return motors;
    }

    public Item motors(Integer motors) {
        this.motors = motors;
        return this;
    }

    public void setMotors(Integer motors) {
        this.motors = motors;
    }

    public Float getStrapThicknessMin() {
        return strapThicknessMin;
    }

    public Item strapThicknessMin(Float strapThicknessMin) {
        this.strapThicknessMin = strapThicknessMin;
        return this;
    }

    public void setStrapThicknessMin(Float strapThicknessMin) {
        this.strapThicknessMin = strapThicknessMin;
    }

    public Float getStrapThicknessMax() {
        return strapThicknessMax;
    }

    public Item strapThicknessMax(Float strapThicknessMax) {
        this.strapThicknessMax = strapThicknessMax;
        return this;
    }

    public void setStrapThicknessMax(Float strapThicknessMax) {
        this.strapThicknessMax = strapThicknessMax;
    }

    public Boolean isIsInProductFinder() {
        return isInProductFinder;
    }

    public Item isInProductFinder(Boolean isInProductFinder) {
        this.isInProductFinder = isInProductFinder;
        return this;
    }

    public void setIsInProductFinder(Boolean isInProductFinder) {
        this.isInProductFinder = isInProductFinder;
    }

    public Boolean isIsFullyAutomaticTension() {
        return isFullyAutomaticTension;
    }

    public Item isFullyAutomaticTension(Boolean isFullyAutomaticTension) {
        this.isFullyAutomaticTension = isFullyAutomaticTension;
        return this;
    }

    public void setIsFullyAutomaticTension(Boolean isFullyAutomaticTension) {
        this.isFullyAutomaticTension = isFullyAutomaticTension;
    }

    public Boolean isIsWeldingByButton() {
        return isWeldingByButton;
    }

    public Item isWeldingByButton(Boolean isWeldingByButton) {
        this.isWeldingByButton = isWeldingByButton;
        return this;
    }

    public void setIsWeldingByButton(Boolean isWeldingByButton) {
        this.isWeldingByButton = isWeldingByButton;
    }

    public Set<ItemReference> getItemReferences() {
        return itemReferences;
    }

    public Item itemReferences(Set<ItemReference> itemReferences) {
        this.itemReferences = itemReferences;
        return this;
    }

    public Item addItemReference(ItemReference itemReference) {
        this.itemReferences.add(itemReference);
        itemReference.setItem(this);
        return this;
    }

    public Item removeItemReference(ItemReference itemReference) {
        this.itemReferences.remove(itemReference);
        itemReference.setItem(null);
        return this;
    }

    public void setItemReferences(Set<ItemReference> itemReferences) {
        this.itemReferences = itemReferences;
    }

    public Set<ExtendedTextHeader> getExtendedTextHeaders() {
        return extendedTextHeaders;
    }

    public Item extendedTextHeaders(Set<ExtendedTextHeader> extendedTextHeaders) {
        this.extendedTextHeaders = extendedTextHeaders;
        return this;
    }

    public Item addExtendedTextHeader(ExtendedTextHeader extendedTextHeader) {
        this.extendedTextHeaders.add(extendedTextHeader);
        extendedTextHeader.setItem(this);
        return this;
    }

    public Item removeExtendedTextHeader(ExtendedTextHeader extendedTextHeader) {
        this.extendedTextHeaders.remove(extendedTextHeader);
        extendedTextHeader.setItem(null);
        return this;
    }

    public void setExtendedTextHeaders(Set<ExtendedTextHeader> extendedTextHeaders) {
        this.extendedTextHeaders = extendedTextHeaders;
    }

    public Set<ItemSubstitution> getSubstNos() {
        return substNos;
    }

    public Item substNos(Set<ItemSubstitution> itemSubstitutions) {
        this.substNos = itemSubstitutions;
        return this;
    }

    public Item addSubstNo(ItemSubstitution itemSubstitution) {
        this.substNos.add(itemSubstitution);
        itemSubstitution.getItems().add(this);
        return this;
    }

    public Item removeSubstNo(ItemSubstitution itemSubstitution) {
        this.substNos.remove(itemSubstitution);
        itemSubstitution.getItems().remove(this);
        return this;
    }

    public void setSubstNos(Set<ItemSubstitution> itemSubstitutions) {
        this.substNos = itemSubstitutions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", modificationDate='" + getModificationDate() + "'" +
            ", no='" + getNo() + "'" +
            ", no2='" + getNo2() + "'" +
            ", name='" + getName() + "'" +
            ", buom='" + getBuom() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", netWeight=" + getNetWeight() +
            ", hsNo='" + getHsNo() + "'" +
            ", hsDescription='" + getHsDescription() + "'" +
            ", hsComment='" + getHsComment() + "'" +
            ", isBlocked='" + isIsBlocked() + "'" +
            ", suom='" + getSuom() + "'" +
            ", itemCategoryCode='" + getItemCategoryCode() + "'" +
            ", productGroupCode='" + getProductGroupCode() + "'" +
            ", wsCategory3Code='" + getWsCategory3Code() + "'" +
            ", isGTIN='" + isIsGTIN() + "'" +
            ", isOnlySpareparts='" + isIsOnlySpareparts() + "'" +
            ", isUsedForWebshop='" + isIsUsedForWebshop() + "'" +
            ", applicationKind='" + getApplicationKind() + "'" +
            ", strapType='" + getStrapType() + "'" +
            ", sealType='" + getSealType() + "'" +
            ", driveType='" + getDriveType() + "'" +
            ", strapTensionMax=" + getStrapTensionMax() +
            ", strapWidth='" + getStrapWidth() + "'" +
            ", strappingsPerDay=" + getStrappingsPerDay() +
            ", akkuType='" + getAkkuType() + "'" +
            ", akkuBrand='" + getAkkuBrand() + "'" +
            ", akkuCapacitiy=" + getAkkuCapacitiy() +
            ", akkuVoltage=" + getAkkuVoltage() +
            ", sealFixity=" + getSealFixity() +
            ", speed=" + getSpeed() +
            ", motors=" + getMotors() +
            ", strapThicknessMin=" + getStrapThicknessMin() +
            ", strapThicknessMax=" + getStrapThicknessMax() +
            ", isInProductFinder='" + isIsInProductFinder() + "'" +
            ", isFullyAutomaticTension='" + isIsFullyAutomaticTension() + "'" +
            ", isWeldingByButton='" + isIsWeldingByButton() + "'" +
            "}";
    }
}
