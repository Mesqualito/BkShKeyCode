package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A ItemHistory.
 */
@Entity
@Table(name = "item_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemHistory implements Serializable {

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

    @Column(name = "modified")
    private Boolean modified;

    @ManyToOne
    @JsonIgnoreProperties("itemHistories")
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

    public ItemHistory timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Instant getModificationDate() {
        return modificationDate;
    }

    public ItemHistory modificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public void setModificationDate(Instant modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Boolean isModified() {
        return modified;
    }

    public ItemHistory modified(Boolean modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(Boolean modified) {
        this.modified = modified;
    }

    public Item getItem() {
        return item;
    }

    public ItemHistory item(Item item) {
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
        if (!(o instanceof ItemHistory)) {
            return false;
        }
        return id != null && id.equals(((ItemHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemHistory{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", modificationDate='" + getModificationDate() + "'" +
            ", modified='" + isModified() + "'" +
            "}";
    }
}
