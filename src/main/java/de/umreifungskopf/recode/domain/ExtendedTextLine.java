package de.umreifungskopf.recode.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A ExtendedTextLine.
 */
@Entity
@Table(name = "extended_text_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtendedTextLine implements Serializable {

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

    @NotNull
    @Column(name = "text_no", nullable = false)
    private Integer textNo;

    @NotNull
    @Column(name = "line_no", nullable = false)
    private Integer lineNo;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JsonIgnoreProperties("extendedTextLines")
    private ExtendedTextHeader textline;

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

    public ExtendedTextLine timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getTableName() {
        return tableName;
    }

    public ExtendedTextLine tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getNo() {
        return no;
    }

    public ExtendedTextLine no(String no) {
        this.no = no;
        return this;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public Integer getTextNo() {
        return textNo;
    }

    public ExtendedTextLine textNo(Integer textNo) {
        this.textNo = textNo;
        return this;
    }

    public void setTextNo(Integer textNo) {
        this.textNo = textNo;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public ExtendedTextLine lineNo(Integer lineNo) {
        this.lineNo = lineNo;
        return this;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public String getText() {
        return text;
    }

    public ExtendedTextLine text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ExtendedTextHeader getTextline() {
        return textline;
    }

    public ExtendedTextLine textline(ExtendedTextHeader extendedTextHeader) {
        this.textline = extendedTextHeader;
        return this;
    }

    public void setTextline(ExtendedTextHeader extendedTextHeader) {
        this.textline = extendedTextHeader;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtendedTextLine)) {
            return false;
        }
        return id != null && id.equals(((ExtendedTextLine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtendedTextLine{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", tableName='" + getTableName() + "'" +
            ", no='" + getNo() + "'" +
            ", textNo=" + getTextNo() +
            ", lineNo=" + getLineNo() +
            ", text='" + getText() + "'" +
            "}";
    }
}
