package de.umreifungskopf.recode.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(max = 2)
    @Column(name = "iso_3166_alpha_2", length = 2, nullable = false)
    private String iso3166Alpha2;

    @Size(max = 3)
    @Column(name = "iso_3166_alpha_3", length = 3)
    private String iso3166Alpha3;

    @OneToMany(mappedBy = "header")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExtendedTextHeader> languages = new HashSet<>();

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

    public Language timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getCode() {
        return code;
    }

    public Language code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Language name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIso3166Alpha2() {
        return iso3166Alpha2;
    }

    public Language iso3166Alpha2(String iso3166Alpha2) {
        this.iso3166Alpha2 = iso3166Alpha2;
        return this;
    }

    public void setIso3166Alpha2(String iso3166Alpha2) {
        this.iso3166Alpha2 = iso3166Alpha2;
    }

    public String getIso3166Alpha3() {
        return iso3166Alpha3;
    }

    public Language iso3166Alpha3(String iso3166Alpha3) {
        this.iso3166Alpha3 = iso3166Alpha3;
        return this;
    }

    public void setIso3166Alpha3(String iso3166Alpha3) {
        this.iso3166Alpha3 = iso3166Alpha3;
    }

    public Set<ExtendedTextHeader> getLanguages() {
        return languages;
    }

    public Language languages(Set<ExtendedTextHeader> extendedTextHeaders) {
        this.languages = extendedTextHeaders;
        return this;
    }

    public Language addLanguage(ExtendedTextHeader extendedTextHeader) {
        this.languages.add(extendedTextHeader);
        extendedTextHeader.setHeader(this);
        return this;
    }

    public Language removeLanguage(ExtendedTextHeader extendedTextHeader) {
        this.languages.remove(extendedTextHeader);
        extendedTextHeader.setHeader(null);
        return this;
    }

    public void setLanguages(Set<ExtendedTextHeader> extendedTextHeaders) {
        this.languages = extendedTextHeaders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Language)) {
            return false;
        }
        return id != null && id.equals(((Language) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", iso3166Alpha2='" + getIso3166Alpha2() + "'" +
            ", iso3166Alpha3='" + getIso3166Alpha3() + "'" +
            "}";
    }
}
