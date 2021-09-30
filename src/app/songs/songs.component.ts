import { Component, OnInit } from '@angular/core';

import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs()
        .subscribe(songs => this.songs = songs);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.songService.addSong({ title } as Song)
      .subscribe(song => {
        this.songs.push(song);
      });
  }

  delete(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
    this.songService.deleteSong(song.id).subscribe();
  }
}
