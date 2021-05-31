package com.tripper.Tripper.utils;

import com.tripper.Tripper.models.enums.CarFeatures;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CarFeaturesSetConverter implements AttributeConverter<EnumSet<CarFeatures>, String> {

    @Override
    public String convertToDatabaseColumn(EnumSet<CarFeatures> attribute) {
        StringBuilder sb = new StringBuilder();
        List<CarFeatures> featureList = attribute.stream().collect(Collectors.toList());

        for (int i = 0; i < featureList.size(); i++) {
            CarFeatures cf = featureList.get(i);
            sb.append(cf);

            if (i < attribute.size() - 1) {
                sb.append(",");
            }
        }

        return sb.toString();
    }

    @Override
    public EnumSet<CarFeatures> convertToEntityAttribute(String dbData) {
        String[] persistenceFeautures = dbData.split(",");
        EnumSet<CarFeatures> features = EnumSet.of(CarFeatures.valueOf(persistenceFeautures[0]));

        for (int i = 1; i < persistenceFeautures.length; i++) {
            String persistenceFeature = persistenceFeautures[i];
            features.add(CarFeatures.valueOf(persistenceFeature));
        }

        return features;
    }

}
