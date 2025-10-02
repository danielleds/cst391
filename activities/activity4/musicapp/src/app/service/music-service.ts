import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { HttpClient } from '@angular/common/http';


// Marks this service as an injectable dependency.
// It will be initialized automatically when imported as such in other components
@Injectable({ providedIn: 'root' })
export class MusicService {

  //albums: Album[] = exampledata;
  private host = "http://localhost:5000";
  private http: HttpClient | null = null;

  constructor(private httpCli: HttpClient) {
    this.http = httpCli;
  }

  // Retrieves a list of all artists in the data set.
  public getArtists(callback: (artists: Artist[]) => void) {
    this.http?.get<Artist[]>(`${this.host}/artists`)
      .subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  // Retrieves a list of all albums in the data set.
  public getAlbums(callback: (albums: Album[]) => void) {
    this.http?.get<Album[]>(`${this.host}/albums`)
      .subscribe((albums: Album[]) => {
        callback(albums);
      })
  }

  // Retrieves a list of all albums by a specific artist.
  public getAlbumsOfArtist(artistName: String, callback: (albums: Album[]) => void) {
    this.http?.get<Album[]>(`${this.host}/albums/${artistName}`)
      .subscribe((albums: Album[]) => {
        callback(albums);
      })
  }

  // Creates and adds a new album to the data set
  public createAlbum(album: Album, callback: () => void) {
    // Add a new Album to the list of Albums
    this.http?.post<Album>(`${this.host}/albums`, album)
      .subscribe((data) => {
        callback()
      })
  }

  // Updates an existing album
  public updateAlbum(album: Album, callback: () => void) {
    this.http?.put<Album>(`${this.host}/albums`, album)
      .subscribe((data) => {
        callback()
      })
  }

  // Deletes an album using its id
  public deleteAlbum(id: number, callback: () => void) {
    this.http?.delete<Album>(`${this.host}/albums${id}`)
      .subscribe((data) => {
        callback()
      })
  }
}
