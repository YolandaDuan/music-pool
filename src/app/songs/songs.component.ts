import { Component, OnInit } from '@angular/core';

import { Song } from '../song';
import { SongService } from '../song.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[] = [];

  selectedSong?: Song;

  constructor(private songService: SongService, private messageService: MessagesService) { }

  ngOnInit() {
    this.getSongs();
  }


  onSelect(song: Song): void {
    this.selectedSong = song;
    this.messageService.add(`SongsComponent: ${song.title} is my favorite song`);
  }

  getSongs(): void {
    this.songService.getSongs()
        .subscribe(songs => this.songs = songs);
  }

}
