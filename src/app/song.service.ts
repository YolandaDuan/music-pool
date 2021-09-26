import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Song } from './song';
import { SONGS } from './mock-songs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private messageService: MessagesService) { }

  getSongs(): Observable<Song[]> { 
    const songs = of(SONGS);
    this.messageService.add('SongService: fetched songs successfully');
    return songs;
  }

  getSong(id: number): Observable<Song> {
    const song = SONGS.find(h => h.id === id)!;
    this.messageService.add(`SongService: fetched song with id = ${id}`);
    return of(song);
  }
}
