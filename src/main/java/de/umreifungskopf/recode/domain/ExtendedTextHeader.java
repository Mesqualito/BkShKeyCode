package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A ExtendedTextHeader.
 */
@Entity
@Table(name = "extended_text_header")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtendedTextHeader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @NotNull
    @Column(name = "table_name", nullable = false)
    private String tableName;

    @NotNull
    @Column(name = "no", nullable = false)
    private String no;

    @Column(name = "starting_date")
    private Instant startingDate;

    @Column(name = "ending_date")
    private Instant endingDate;

    @NotNull
    @Column(name = "text_no", nullable = false)
    private Integer textNo;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "textline")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExtendedTextLine> extendedTextLines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("extendedTextHeaders")
    private Item item;

    @ManyToOne
    @JsonIgnoreProperties("languages")
    private Language header;

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

    public ExtendedTextHeader timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getTableName() {
        return tableName;
    }

    public ExtendedTextHeader tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getNo() {
        return no;
    }

    public ExtendedTextHeader no(String no) {
        this.no = no;
        return this;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public Instant getStartingDate() {
        return startingDate;
    }

    public ExtendedTextHeader startingDate(Instant startingDate) {
        this.startingDate = startingDate;
        return this;
    }

    public void setStartingDate(Instant startingDate) {
        this.startingDate = startingDate;
    }

    public Instant getEndingDate() {
        return endingDate;
    }

    public ExtendedTextHeader endingDate(Instant endingDate) {
        this.endingDate = endingDate;
        return this;
    }

    public void setEndingDate(Instant endingDate) {
        this.endingDate = endingDate;
    }

    public Integer getTextNo() {
        return textNo;
    }

    public ExtendedTextHeader textNo(Integer textNo) {
        this.textNo = textNo;
        return this;
    }

    public void setTextNo(Integer textNo) {
        this.textNo = textNo;
    }

    public String getDescription() {
        return description;
    }

    public ExtendedTextHeader description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ExtendedTextLine> getExtendedTextLines() {
        return extendedTextLines;
    }

    public ExtendedTextHeader extendedTextLines(Set<ExtendedTextLine> extendedTextLines) {
        this.extendedTextLines = extendedTextLines;
        return this;
    }

    public ExtendedTextHeader addExtendedTextLine(ExtendedTextLine extendedTextLine) {
        this.extendedTextLines.add(extendedTextLine);
        extendedTextLine.setTextline(this);
        return this;
    }

    public ExtendedTextHeader removeExtendedTextLine(ExtendedTextLine extendedTextLine) {
        this.extendedTextLines.remove(extendedTextLine);
        extendedTextLine.setTextline(null);
        return this;
    }

    public void setExtendedTextLines(Set<ExtendedTextLine> extendedTextLines) {
        this.extendedTextLines = extendedTextLines;
    }

    public Item getItem() {
        return item;
    }

    public ExtendedTextHeader item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Language getHeader() {
        return header;
    }

    public ExtendedTextHeader header(Language language) {
        this.header = language;
        return this;
    }

    public void setHeader(Language language) {
        this.header = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtendedTextHeader)) {
            return false;
        }
        return id != null && id.equals(((ExtendedTextHeader) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtendedTextHeader{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", tableName='" + getTableName() + "'" +
            ", no='" + getNo() + "'" +
            ", startingDate='" + getStartingDate() + "'" +
            ", endingDate='" + getEndingDate() + "'" +
            ", textNo=" + getTextNo() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
