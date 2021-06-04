package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.AlbumModelAssembler;
import com.tripper.Tripper.data.AlbumRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.AlbumNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Album;
import com.tripper.Tripper.models.Trip;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/album")
public class AlbumController {

    private final AlbumRepository albumRepo;
    private final TripRepository tripRepo;
    private final AlbumModelAssembler assembler;

    public AlbumController(AlbumRepository albumRepo, TripRepository tripRepo, AlbumModelAssembler assembler) {
        this.albumRepo = albumRepo;
        this.tripRepo = tripRepo;
        this.assembler = assembler;
    }

    @GetMapping("/{idAlbum}")
    public EntityModel<Album> getAlbum(@PathVariable Long idAlbum) {
        Album album = albumRepo.findById(idAlbum)
                .orElseThrow(() -> new AlbumNotFoundException(idAlbum));

        return assembler.toModel(album);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Album>> getAllAlbums(@RequestParam Long idTrip) {
        return assembler.toCollectionModel(albumRepo.findByTrip(idTrip));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAlbum(@RequestBody Album dto, @RequestParam Long idTrip) {
        Trip trip = tripRepo.findById(idTrip)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));

        Album newAlbum = dto;
        newAlbum.setAlbumPictures(dto.getPictures());
        newAlbum.setTrip(trip);

        EntityModel<Album> savedAlbum = assembler.toModel(albumRepo.save(newAlbum));

        return ResponseEntity
                .created(savedAlbum.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .build();
    }
}
