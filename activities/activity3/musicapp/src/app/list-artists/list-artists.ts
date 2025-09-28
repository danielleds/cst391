import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListAlbums } from '../list-albums/list-albums'
import { MusicService } from '../service/music-service';
import { Artist } from '../models/artists.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-artists',
  imports: [
    ListAlbums,
    CommonModule
  ],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css'
})
export class ListArtists {
  constructor(private route: ActivatedRoute, private service: MusicService) { }
  selectedArtist: Artist | null = null;
  artists: Artist[] = []

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Getting data....");
      this.artists = this.service.getArtists();
      this.selectedArtist = null;
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
