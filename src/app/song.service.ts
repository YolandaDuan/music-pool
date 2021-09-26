import { Injectable } from '@angular/core';
import { Song } from './song';
import { SONGS } from './mock-songs';
import { Observable, of } from 'rxjs';
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
}
