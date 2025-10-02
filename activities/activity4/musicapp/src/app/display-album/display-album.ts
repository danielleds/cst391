import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Album } from '../models/albums.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-album',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './display-album.html',
  styleUrl: './display-album.css'
})
export class DisplayAlbum {
  @Input() album: Album | null = null;
}
