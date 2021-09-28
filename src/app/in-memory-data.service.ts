import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
    {
        id: 1,
        title: 'Hello',
        singer: 'Adele' 
    },
    {
        id: 2,
        title: 'Sorry',
        singer: 'Justin Bieber' 
    },
    {
        id: 3,
        title: 'Shape of You',
        singer: 'Ed Sheeran' 
    },
    {
        id: 4,
        title: 'Shake It Off',
        singer: 'Taylor Swift' 
    },
    {
        id: 5,
        title: 'Let Her Go',
        singer: 'Passenger' 
    },
    {
        id: 6,
        title: 'Roar',
        singer: 'Katy Perry' 
    }];
  return {songs};
  }

  constructor() { }

  getId(songs: Song[]): number {
    return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 1;
  }
}
