package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.AlbumModelAssembler;
import com.tripper.Tripper.data.AlbumRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.AlbumNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Album;
import com.tripper.Tripper.models.Trip;
import java.util.UUID;
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

    @GetMapping("/{albumUuid}")
    public EntityModel<Album> getAlbum(@PathVariable String albumUuid) {
        Album album = albumRepo.findByUuid(albumUuid)
                .orElseThrow(() -> new AlbumNotFoundException(albumUuid));

        return assembler.toModel(album);
    }

    public CollectionModel<EntityModel<Album>> getAllAlbums(@RequestParam String tripUuid) {
        return assembler.toCollectionModel(albumRepo.findByTrip(tripUuid));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAlbum(@RequestBody Album dto, @RequestParam String tripUuid) {
        Trip trip = tripRepo.findByUuid(tripUuid)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));

        Album newAlbum = prepareAlbumInstance(dto, trip);
        EntityModel<Album> savedAlbum = assembler.toModel(albumRepo.save(newAlbum));

        return ResponseEntity
                .created(savedAlbum.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(savedAlbum.getContent());
    }

    private Album prepareAlbumInstance(Album dto, Trip trip) {
        String albumUuid = dto.getUuid();
        Album newAlbum;

        if (albumUuid == null) {
            newAlbum = dto;
            newAlbum.setAlbumPictures(dto.getPictures());
        } else {
            newAlbum = albumRepo.findByUuid(albumUuid)
                    .orElseThrow(() -> new AlbumNotFoundException(albumUuid));
            newAlbum.getPictures().addAll(dto.getPictures());
        }

        newAlbum.setTrip(trip);

        newAlbum.setUuid(UUID.randomUUID().toString());
        return newAlbum;
    }

    @DeleteMapping("/{albumUuid}")
    public ResponseEntity<?> deleteAlbum(@PathVariable String albumUuid) {
        Album album = albumRepo.findByUuid(albumUuid)
                .orElseThrow(() -> new AlbumNotFoundException(albumUuid));

        albumRepo.delete(album);

        return ResponseEntity.noContent().build();
    }
}
