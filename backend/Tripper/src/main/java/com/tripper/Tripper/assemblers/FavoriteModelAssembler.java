package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.FavoriteController;
import com.tripper.Tripper.models.Favorite;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class FavoriteModelAssembler implements RepresentationModelAssembler<Favorite, EntityModel<Favorite>> {

    @Override
    public EntityModel<Favorite> toModel(Favorite entity) {
        Long idFavorite = entity.getIdFavorite();
        String personUuid = entity.getPerson().getUuid();

        return EntityModel.of(entity,
                linkTo(methodOn(FavoriteController.class).getFavorite(idFavorite)).withSelfRel(),
                linkTo(methodOn(FavoriteController.class).getAllFavorites(personUuid)).withRel("favorites"),
                linkTo(methodOn(FavoriteController.class).addToFavorites(entity, personUuid)).withRel("addNew")
        );
    }

    @Override
    public CollectionModel<EntityModel<Favorite>> toCollectionModel(Iterable<? extends Favorite> entities) {
        List<EntityModel<Favorite>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(FavoriteController.class).getAllFavorites(null)).withSelfRel()
        );
    }

}
