import { App } from './app';
import { Routes } from '@angular/router';
import { CreateAlbum } from './create-album/create-album';
import { DeleteAlbum } from './delete-album/delete-album';
import { DisplayAlbum } from './display-album/display-album';
import { EditAlbum } from './edit-album/edit-album';
import { ListAlbums } from './list-albums/list-albums';
import { ListArtists } from './list-artists/list-artists';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'create', component: CreateAlbum },
  { path: 'list-artists', component: ListArtists },
  { path: 'list-albums', component: ListAlbums},
  { path: 'display/:id', component: DisplayAlbum },
  { path: 'edit/:artist/:id', component: EditAlbum },
  { path: 'delete/:artist/:id', component: DeleteAlbum }
];
