package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A ItemSubstitution.
 */
@Entity
@Table(name = "item_substitution")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemSubstitution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "substitute_type", nullable = false)
    private String substituteType;

    @NotNull
    @Column(name = "substitute_no", nullable = false)
    private String substituteNo;

    @Column(name = "description")
    private String description;

    @Column(name = "is_interchangeable")
    private Boolean isInterchangeable;

    @Column(name = "relations_level")
    private Integer relationsLevel;

    @Column(name = "is_checked_to_original")
    private Boolean isCheckedToOriginal;

    @Column(name = "orig_check_date")
    private Instant origCheckDate;

    @ManyToMany(mappedBy = "substNos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Item> items = new HashSet<>();

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

    public ItemSubstitution timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getType() {
        return type;
    }

    public ItemSubstitution type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubstituteType() {
        return substituteType;
    }

    public ItemSubstitution substituteType(String substituteType) {
        this.substituteType = substituteType;
        return this;
    }

    public void setSubstituteType(String substituteType) {
        this.substituteType = substituteType;
    }

    public String getSubstituteNo() {
        return substituteNo;
    }

    public ItemSubstitution substituteNo(String substituteNo) {
        this.substituteNo = substituteNo;
        return this;
    }

    public void setSubstituteNo(String substituteNo) {
        this.substituteNo = substituteNo;
    }

    public String getDescription() {
        return description;
    }

    public ItemSubstitution description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsInterchangeable() {
        return isInterchangeable;
    }

    public ItemSubstitution isInterchangeable(Boolean isInterchangeable) {
        this.isInterchangeable = isInterchangeable;
        return this;
    }

    public void setIsInterchangeable(Boolean isInterchangeable) {
        this.isInterchangeable = isInterchangeable;
    }

    public Integer getRelationsLevel() {
        return relationsLevel;
    }

    public ItemSubstitution relationsLevel(Integer relationsLevel) {
        this.relationsLevel = relationsLevel;
        return this;
    }

    public void setRelationsLevel(Integer relationsLevel) {
        this.relationsLevel = relationsLevel;
    }

    public Boolean isIsCheckedToOriginal() {
        return isCheckedToOriginal;
    }

    public ItemSubstitution isCheckedToOriginal(Boolean isCheckedToOriginal) {
        this.isCheckedToOriginal = isCheckedToOriginal;
        return this;
    }

    public void setIsCheckedToOriginal(Boolean isCheckedToOriginal) {
        this.isCheckedToOriginal = isCheckedToOriginal;
    }

    public Instant getOrigCheckDate() {
        return origCheckDate;
    }

    public ItemSubstitution origCheckDate(Instant origCheckDate) {
        this.origCheckDate = origCheckDate;
        return this;
    }

    public void setOrigCheckDate(Instant origCheckDate) {
        this.origCheckDate = origCheckDate;
    }

    public Set<Item> getItems() {
        return items;
    }

    public ItemSubstitution items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public ItemSubstitution addItem(Item item) {
        this.items.add(item);
        item.getSubstNos().add(this);
        return this;
    }

    public ItemSubstitution removeItem(Item item) {
        this.items.remove(item);
        item.getSubstNos().remove(this);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemSubstitution)) {
            return false;
        }
        return id != null && id.equals(((ItemSubstitution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemSubstitution{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", type='" + getType() + "'" +
            ", substituteType='" + getSubstituteType() + "'" +
            ", substituteNo='" + getSubstituteNo() + "'" +
            ", description='" + getDescription() + "'" +
            ", isInterchangeable='" + isIsInterchangeable() + "'" +
            ", relationsLevel=" + getRelationsLevel() +
            ", isCheckedToOriginal='" + isIsCheckedToOriginal() + "'" +
            ", origCheckDate='" + getOrigCheckDate() + "'" +
            "}";
    }
}
