package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.AlbumController;
import com.tripper.Tripper.models.Album;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class AlbumModelAssembler implements RepresentationModelAssembler<Album, EntityModel<Album>> {

    @Override
    public EntityModel<Album> toModel(Album entity) {
        Long idAlbum = entity.getIdAlbum();
        Long idTrip = entity.getTrip().getIdTrip();

        return EntityModel.of(entity,
                linkTo(methodOn(AlbumController.class).getAlbum(idAlbum)).withSelfRel(),
                linkTo(methodOn(AlbumController.class).getAllAlbums(idTrip)).withRel("albums"),
                linkTo(methodOn(AlbumController.class).createAlbum(entity, entity.getTrip().getIdTrip())).withRel("createNew")
        );
    }

    @Override
    public CollectionModel<EntityModel<Album>> toCollectionModel(Iterable<? extends Album> entities) {
        List<EntityModel<Album>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(AlbumController.class).getAllAlbums(null)).withSelfRel());
    }

}