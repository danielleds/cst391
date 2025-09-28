import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';


// Marks this service as an injectable dependency.
// It will be initialized automatically when imported as such in other components
@Injectable({ providedIn: 'root' })
export class MusicService {

  albums: Album[] = exampledata;

  // Retrieves a list of all artists in the data set.
  public getArtists(): Artist[] {
    let artists: Artist[] = [];
    let artistSet = new Set<string>();

    // First add albums to the Set which ensures unique entries
    this.albums.forEach(a => artistSet.add(a.artist));

    // Then add the artists to the array to return them
    artistSet.forEach(a => artists.push({artist: a}))
    return artists;
  }

  // Retrieves a list of all albums in the data set.
  public getAlbums(): Album[] {
    // Return the list of Albums
    return this.albums;
  }

  // Retrieves a list of all albums by a specific artist.
  public getAlbumsOfArtist(artistName: String): Album[] {

    let albums: Album[] = [];

    // Loop through the albums find matches with the album's artist property
    this.albums.forEach(album => {
      if (album.artist == artistName) {
        // Add matches to the results array
        albums.push(album);
      }
    });
    return albums;

  }

  // Creates and adds a new album to the data set
  public createAlbum(album: Album): number {
    // Add a new Album to the list of Albums
    this.albums.push(album);
    return 1;
  }

  // Updates an existing album
  public updateAlbum(album: Album): number {
    // Search for the Album in the list of Albums and replace it in the list
    for (let i = 0; i < this.albums.length; ++i) {
      if (this.albums[i].albumId == album.albumId) {
        this.albums.splice(i, 1, album);
        return 0;
      }
    }
    return -1;
  }

  // Deletes an album using its id
  public deleteAlbum(id: number): number {
    // Search for the Album in the list of Albums and delete from the list
    for (let i = 0; i < this.albums.length; ++i) {
      if (this.albums[i].albumId == id) {
        this.albums.splice(i, 1);
        return 0;
      }
    }
    // Return -1 if deletion was not successful
    return -1;
  }
}
