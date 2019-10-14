package de.umreifungskopf.recode.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, de.umreifungskopf.recode.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, de.umreifungskopf.recode.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, de.umreifungskopf.recode.domain.User.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.Authority.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.User.class.getName() + ".authorities");
            createCache(cm, de.umreifungskopf.recode.domain.ItemStaging.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.ItemHistory.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName() + ".itemReferences");
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName() + ".extendedTextHeaders");
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName() + ".substNos");
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName() + ".itemStagings");
            createCache(cm, de.umreifungskopf.recode.domain.Item.class.getName() + ".itemHistories");
            createCache(cm, de.umreifungskopf.recode.domain.ItemProperty.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.PropPosition.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.Language.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.Language.class.getName() + ".languages");
            createCache(cm, de.umreifungskopf.recode.domain.ExtendedTextHeader.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.ExtendedTextHeader.class.getName() + ".extendedTextLines");
            createCache(cm, de.umreifungskopf.recode.domain.ExtendedTextLine.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.ItemReference.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.ItemSubstitution.class.getName());
            createCache(cm, de.umreifungskopf.recode.domain.ItemSubstitution.class.getName() + ".items");
            createCache(cm, de.umreifungskopf.recode.domain.Uom.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
