import { ChangeDetectorRef, Component } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private service: MusicService, private cd: ChangeDetectorRef) { }
  selectedArtist: Artist | null = null;
  artists: Artist[] = []

  ngOnInit() {
    console.log("Getting data");
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;

      // Use change detector so that the page will load after detecting the changes
      // and actually display the list
      this.cd.detectChanges();
      console.log('Artists Retrieved.')
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
