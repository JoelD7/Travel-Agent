package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.FavoriteModelAssembler;
import com.tripper.Tripper.data.FavoriteRepository;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.data.PoiRepository;
import com.tripper.Tripper.data.RestaurantRepository;
import com.tripper.Tripper.exceptions.FavoriteNotFoundException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.Favorite;
import com.tripper.Tripper.models.POI;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.models.Restaurant;
import com.tripper.Tripper.models.enums.FavoritePlace;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {

    private final FavoriteRepository favoriteRepo;
    private final FavoriteModelAssembler assembler;
    private final PersonRepository personRepo;
    private final RestaurantRepository restaurantRepo;
    private final PoiRepository poiRepo;

    public FavoriteController(FavoriteRepository favoriteRepo, FavoriteModelAssembler assembler,
            PersonRepository personRepo, RestaurantRepository restaurantRepo,
            PoiRepository poiRepo) {
        this.favoriteRepo = favoriteRepo;
        this.assembler = assembler;
        this.personRepo = personRepo;
        this.restaurantRepo = restaurantRepo;
        this.poiRepo = poiRepo;
    }

    @GetMapping("/{idFavorite}")
    public EntityModel<Favorite> getFavorite(@PathVariable Long idFavorite) {
        Favorite favorite = favoriteRepo.findById(idFavorite)
                .orElseThrow(() -> new FavoriteNotFoundException());

        return assembler.toModel(favorite);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Favorite>> getAllFavorites(@RequestParam String personUuid) {
        return assembler.toCollectionModel(favoriteRepo.getAllByPerson(personUuid));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToFavorites(@RequestBody Favorite dto, @RequestParam String personUuid) {
        Person person = personRepo.findByUuid(personUuid)
                .orElseThrow(() -> new PersonNotFoundException(personUuid));

        dto.setPerson(person);
        setFavoriteEntity(dto);

        EntityModel<Favorite> newFavorite = assembler.toModel(favoriteRepo.save(dto));

        return ResponseEntity
                .created(newFavorite.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .build();
    }

    private void setFavoriteEntity(Favorite dto) {
        FavoritePlace type = dto.getType();

        switch (type) {
            case POI:
                POI dtoPoi = dto.getPoi();
                POI poi = poiRepo
                        .findByName(dtoPoi.getName())
                        .orElse(dtoPoi);

                poi.setFavoritePOI(dto);
                break;

            case RESTAURANT:
                Restaurant dtoRestaurant = dto.getRestaurant();
                Restaurant restaurant = restaurantRepo
                        .findByName(dtoRestaurant.getName())
                        .orElse(dtoRestaurant);

                restaurant.setFavoriteRestaurant(dto);
                break;

            default:
                break;
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFromFavorites(@RequestParam String code) {
        Favorite favorite = favoriteRepo.findByCode(code)
                .orElseThrow(() -> new FavoriteNotFoundException());

        favoriteRepo.deleteById(favorite.getIdFavorite());

        return ResponseEntity.noContent().build();
    }

}
