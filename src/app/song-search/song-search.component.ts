import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  songs$!: Observable<Song[]>;
  private searchTitles = new Subject<string>();

  constructor(private songService: SongService) { }

  search(title: string):void {
    this.searchTitles.next(title);
  }

  ngOnInit(): void {
    this.songs$ = this.searchTitles.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((title: string) => this.songService.searchSongs(title)),
    );
  }

}
