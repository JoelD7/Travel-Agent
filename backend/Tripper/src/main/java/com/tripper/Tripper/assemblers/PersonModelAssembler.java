package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.PersonController;
import com.tripper.Tripper.models.Person;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class PersonModelAssembler implements RepresentationModelAssembler<Person, EntityModel<Person>> {

    @Override
    public EntityModel<Person> toModel(Person entity) {
        Long idPerson = entity.getIdPerson();

        return EntityModel.of(entity,
                linkTo(methodOn(PersonController.class).get(idPerson)).withSelfRel(),
                linkTo(methodOn(PersonController.class).editProfile(idPerson, entity)).withRel("editProfile"),
                linkTo(methodOn(PersonController.class).getAll()).withRel("personList"));
    }

    @Override
    public CollectionModel<EntityModel<Person>> toCollectionModel(Iterable<? extends Person> entities) {
        List<EntityModel<Person>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(PersonController.class).getAll()).withSelfRel());
    }

}
