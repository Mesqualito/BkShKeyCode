package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * unit of measure
 */
@ApiModel(description = "unit of measure")
@Entity
@Table(name = "uom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Uom implements Serializable {

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

    @Column(name = "rank")
    private Integer rank;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "factor")
    private Float factor;

    @OneToOne(mappedBy = "uom")
    @JsonIgnore
    private ItemProperty propPosition;

    @OneToOne(mappedBy = "buom")
    @JsonIgnore
    private Item itemBuom;

    @OneToOne(mappedBy = "suom")
    @JsonIgnore
    private Item itemSuom;

    @OneToOne(mappedBy = "uom")
    @JsonIgnore
    private ItemReference refUom;

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

    public Uom timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Instant getModificationDate() {
        return modificationDate;
    }

    public Uom modificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public void setModificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Integer getRank() {
        return rank;
    }

    public Uom rank(Integer rank) {
        this.rank = rank;
        return this;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getCode() {
        return code;
    }

    public Uom code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Uom description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getFactor() {
        return factor;
    }

    public Uom factor(Float factor) {
        this.factor = factor;
        return this;
    }

    public void setFactor(Float factor) {
        this.factor = factor;
    }

    public ItemProperty getPropPosition() {
        return propPosition;
    }

    public Uom propPosition(ItemProperty itemProperty) {
        this.propPosition = itemProperty;
        return this;
    }

    public void setPropPosition(ItemProperty itemProperty) {
        this.propPosition = itemProperty;
    }

    public Item getItemBuom() {
        return itemBuom;
    }

    public Uom itemBuom(Item item) {
        this.itemBuom = item;
        return this;
    }

    public void setItemBuom(Item item) {
        this.itemBuom = item;
    }

    public Item getItemSuom() {
        return itemSuom;
    }

    public Uom itemSuom(Item item) {
        this.itemSuom = item;
        return this;
    }

    public void setItemSuom(Item item) {
        this.itemSuom = item;
    }

    public ItemReference getRefUom() {
        return refUom;
    }

    public Uom refUom(ItemReference itemReference) {
        this.refUom = itemReference;
        return this;
    }

    public void setRefUom(ItemReference itemReference) {
        this.refUom = itemReference;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Uom)) {
            return false;
        }
        return id != null && id.equals(((Uom) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Uom{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", modificationDate='" + getModificationDate() + "'" +
            ", rank=" + getRank() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", factor=" + getFactor() +
            "}";
    }
}
