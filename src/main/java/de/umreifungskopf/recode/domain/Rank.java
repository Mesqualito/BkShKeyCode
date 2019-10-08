package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Rank.
 */
@Entity
@Table(name = "rank")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    @Column(name = "prio_value", nullable = false)
    private Integer prioValue;

    @OneToOne(mappedBy = "substitution")
    @JsonIgnore
    private ItemSubstitution subsRank;

    @OneToOne(mappedBy = "reference")
    @JsonIgnore
    private ItemReference refRank;

    @OneToOne(mappedBy = "itemproperty")
    @JsonIgnore
    private ItemProperty shcodeRank;

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

    public Rank timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getPrioValue() {
        return prioValue;
    }

    public Rank prioValue(Integer prioValue) {
        this.prioValue = prioValue;
        return this;
    }

    public void setPrioValue(Integer prioValue) {
        this.prioValue = prioValue;
    }

    public ItemSubstitution getSubsRank() {
        return subsRank;
    }

    public Rank subsRank(ItemSubstitution itemSubstitution) {
        this.subsRank = itemSubstitution;
        return this;
    }

    public void setSubsRank(ItemSubstitution itemSubstitution) {
        this.subsRank = itemSubstitution;
    }

    public ItemReference getRefRank() {
        return refRank;
    }

    public Rank refRank(ItemReference itemReference) {
        this.refRank = itemReference;
        return this;
    }

    public void setRefRank(ItemReference itemReference) {
        this.refRank = itemReference;
    }

    public ItemProperty getShcodeRank() {
        return shcodeRank;
    }

    public Rank shcodeRank(ItemProperty itemProperty) {
        this.shcodeRank = itemProperty;
        return this;
    }

    public void setShcodeRank(ItemProperty itemProperty) {
        this.shcodeRank = itemProperty;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rank)) {
            return false;
        }
        return id != null && id.equals(((Rank) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Rank{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", prioValue=" + getPrioValue() +
            "}";
    }
}
