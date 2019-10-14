package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A ItemReference.
 */
@Entity
@Table(name = "item_reference")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemReference implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @Column(name = "cross_reference_type")
    private String crossReferenceType;

    @Column(name = "cross_reference_type_no")
    private String crossReferenceTypeNo;

    @NotNull
    @Column(name = "cross_reference_no", nullable = false)
    private String crossReferenceNo;

    @Column(name = "description")
    private String description;

    @Column(name = "qualifier")
    private String qualifier;

    @OneToOne
    @JoinColumn(unique = true)
    private Uom uom;

    @ManyToOne
    @JsonIgnoreProperties("itemReferences")
    private Item item;

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

    public ItemReference timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getCrossReferenceType() {
        return crossReferenceType;
    }

    public ItemReference crossReferenceType(String crossReferenceType) {
        this.crossReferenceType = crossReferenceType;
        return this;
    }

    public void setCrossReferenceType(String crossReferenceType) {
        this.crossReferenceType = crossReferenceType;
    }

    public String getCrossReferenceTypeNo() {
        return crossReferenceTypeNo;
    }

    public ItemReference crossReferenceTypeNo(String crossReferenceTypeNo) {
        this.crossReferenceTypeNo = crossReferenceTypeNo;
        return this;
    }

    public void setCrossReferenceTypeNo(String crossReferenceTypeNo) {
        this.crossReferenceTypeNo = crossReferenceTypeNo;
    }

    public String getCrossReferenceNo() {
        return crossReferenceNo;
    }

    public ItemReference crossReferenceNo(String crossReferenceNo) {
        this.crossReferenceNo = crossReferenceNo;
        return this;
    }

    public void setCrossReferenceNo(String crossReferenceNo) {
        this.crossReferenceNo = crossReferenceNo;
    }

    public String getDescription() {
        return description;
    }

    public ItemReference description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQualifier() {
        return qualifier;
    }

    public ItemReference qualifier(String qualifier) {
        this.qualifier = qualifier;
        return this;
    }

    public void setQualifier(String qualifier) {
        this.qualifier = qualifier;
    }

    public Uom getUom() {
        return uom;
    }

    public ItemReference uom(Uom uom) {
        this.uom = uom;
        return this;
    }

    public void setUom(Uom uom) {
        this.uom = uom;
    }

    public Item getItem() {
        return item;
    }

    public ItemReference item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemReference)) {
            return false;
        }
        return id != null && id.equals(((ItemReference) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemReference{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", crossReferenceType='" + getCrossReferenceType() + "'" +
            ", crossReferenceTypeNo='" + getCrossReferenceTypeNo() + "'" +
            ", crossReferenceNo='" + getCrossReferenceNo() + "'" +
            ", description='" + getDescription() + "'" +
            ", qualifier='" + getQualifier() + "'" +
            "}";
    }
}
