package de.umreifungskopf.recode.bootstrap;

import de.umreifungskopf.recode.domain.ItemProperty;
import de.umreifungskopf.recode.domain.PropPosition;
import de.umreifungskopf.recode.service.ItemPropertyExtendedService;
import de.umreifungskopf.recode.service.PropPositionExtendedService;
import io.github.jhipster.config.JHipsterConstants;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Profile(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
public class ShDevBootstrap implements ApplicationListener<ContextRefreshedEvent> {

    // maybe calling repository directly may be sufficient and more resource-efficient,
    // but we'll deal with Pages for learning it :-)
    // TODO: rewrite it later for performance!
    private final PropPositionExtendedService propPositionExtendedService;

    private final ItemPropertyExtendedService itemPropertyExtendedService;

    private final Pageable wholePage = Pageable.unpaged();

    public ShDevBootstrap(PropPositionExtendedService propPositionExtendedService, ItemPropertyExtendedService itemPropertyExtendedService) {
        this.propPositionExtendedService = propPositionExtendedService;
        this.itemPropertyExtendedService = itemPropertyExtendedService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        initData();
    }

    private void initData() {

        Instant timestamp = Instant.ofEpochMilli(System.currentTimeMillis());
        AtomicInteger idx = new AtomicInteger(1);

        // Property-Position - clear fake-data:
        Page<PropPosition> allPositions = propPositionExtendedService.findAll(wholePage);
        for (PropPosition propPosition : allPositions) {
            itemPropertyExtendedService.findByCoderank(wholePage, propPosition.getId())
                .forEach(itemProperty -> {itemProperty.setCoderank(null);
                itemPropertyExtendedService.save(itemProperty);
            });
            propPositionExtendedService.delete(propPosition.getId());
        }

        // Property-Positions - default-data:
        List<String> posDescriptions = Arrays.asList("Modell", "Bandbreite", "Spannmotor", "Transportmotor", "Gehäuse",
            "Verschließerantrieb (und andere Motoren/Ventile)", "Verschlussart", "frei", "Ausrichtung",
            "Zusatzoptionen");

        PropPosition position = new PropPosition();
        for (String description : posDescriptions) {
            position.setId((long) idx.get());
            position.setTimestamp(timestamp);
            position.setPosValue(idx.getAndIncrement());
            position.setDescription(description);
            propPositionExtendedService.save(position);
        }

        // ItemProperty - clear fake-data:
        Page<ItemProperty> allProperties = itemPropertyExtendedService.findAll(wholePage);
        for (ItemProperty allProperty : allProperties) {
            itemPropertyExtendedService.delete(allProperty.getId());
        }

        // ItemProperty default-data:
        HashMap<String, String> properties = new HashMap<>();
        properties.put("11", "SSH (Stahlband-Umreifungskopf)");
        properties.put("14", "PSH (Kunststoffband-Umreifungskopf)");
        properties.put("23", "32");
        properties.put("24", "25");
        properties.put("25", "19");
        properties.put("31", "E (elektrisch)");
        properties.put("34", "P (pneumatisch)");
        properties.put("39", "ohne Spannmotor");
        properties.put("41", "E (elektrisch)");
        properties.put("44", "P (pneumatisch)");
        properties.put("49", "ohne Transportmotor");
        properties.put("5A", "A (Aluminiumgehäuse)");
        properties.put("5S", "S (Stahlgehäuse)");
        properties.put("61", "E (elektrisch)");
        properties.put("64", "P (pneumatisch)");
        properties.put("71", "Kerbverschluss hülsenlos (Stahl)");
        properties.put("72", "mit Hülse (Stahl/Kunststoff)");
        properties.put("74", "Punkt-Schweißverschluss (Stahl/Kunststoff)");
        properties.put("75", "WIG-Schweißverschluss (Stahl)");
        properties.put("77", "Reibschweißverschluss (Kunststoff)");
        properties.put("78", "Heizkeilverschluss (Kunststoff)");
        properties.put("79", "Ultraschallverschluss (Kunststoff)");

        ItemProperty itemProperty = new ItemProperty();
        idx.set(1);
        for (Map.Entry<String, String> entry : properties.entrySet()) {
            String key = entry.getKey();
            String property = entry.getValue();
            itemProperty.setId((long) idx.get());
            itemProperty.setTimestamp(timestamp);
            itemProperty.setModificationDate(timestamp);
            itemProperty.setCode(key.substring(1, 2));
            itemProperty.setDescription(property);
            itemProperty.setCoderank(propPositionExtendedService.findOneByPosValue(Integer.valueOf(key.substring(0,1))).get());
            itemPropertyExtendedService.save(itemProperty);
        }
    }
}
