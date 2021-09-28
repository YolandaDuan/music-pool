import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 

import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit {
  song: Song | undefined;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSong();
  }

  getSong(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.songService.getSong(id)
      .subscribe(song => this.song = song)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.song) {
      this.songService.updateSong(this.song)
        .subscribe(() => this.goBack)
    }
  }
}
