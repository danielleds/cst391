import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DisplayAlbum } from '../display-album/display-album'
import { MusicService } from '../service/music-service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-albums',
  imports: [
    DisplayAlbum,
    CommonModule
  ],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbums {
  @Input() artist: Artist | null = null;
  albums: Album[] | null = null;
  selectedAlbum: Album | null = null;

  constructor(private service: MusicService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("Getting data");
    this.service.getAlbumsOfArtist(this!.artist!.artist,
      (albums: Album[]) => {
        this.albums = albums;
        // Use change detector so that the page will load after detecting the changes
        // and actually display the list
        this.cd.detectChanges();
        console.log("Albums retrieved.");
    });
  }

  public onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}
