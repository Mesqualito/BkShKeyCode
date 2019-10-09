package de.umreifungskopf.recode.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A PropPosition.
 */
@Entity
@Table(name = "prop_position")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PropPosition implements Serializable {

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
    @Column(name = "pos_value", nullable = false)
    private Integer posValue;

    @Column(name = "description")
    private String description;

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

    public PropPosition timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getPosValue() {
        return posValue;
    }

    public PropPosition posValue(Integer posValue) {
        this.posValue = posValue;
        return this;
    }

    public void setPosValue(Integer posValue) {
        this.posValue = posValue;
    }

    public String getDescription() {
        return description;
    }

    public PropPosition description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PropPosition)) {
            return false;
        }
        return id != null && id.equals(((PropPosition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PropPosition{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", posValue=" + getPosValue() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
