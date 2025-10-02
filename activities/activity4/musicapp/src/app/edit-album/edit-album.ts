import { Component } from '@angular/core';
import { MusicService } from '../service/music-service';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-edit-album',
  imports: [],
  templateUrl: './edit-album.html',
  styleUrl: './edit-album.css'
})
export class EditAlbum {

  album: Album | null = null;

  constructor(private service: MusicService) { }

  ngOnInit() {
      console.log("Getting data");
      this.service.updateAlbum(this.album!, () => {
        console.log("Album updated.");
      })
    }
}
