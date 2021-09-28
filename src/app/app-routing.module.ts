import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongsComponent } from './songs/songs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongInfoComponent } from './song-info/song-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'songs', component: SongsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'info/:id', component: SongInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
