import { Routes } from '@angular/router';
import { ViewSermons } from './view-sermons/view-sermons';
import { DisplaySermon } from './display-sermon/display-sermon';
import { EditSermon } from './edit-sermon/edit-sermon';
import { CreateSermon } from './create-sermon/create-sermon';

export const routes: Routes = [
  { path: 'sermons', component: ViewSermons },
  { path: 'sermon/:id', component: DisplaySermon },
  { path: 'create', component: CreateSermon },
  { path: 'edit/:id', component: EditSermon }
];
