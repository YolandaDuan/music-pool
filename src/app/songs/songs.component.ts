import { Component, OnInit } from '@angular/core';
import { Song } from '../song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  song: Song = {
    id: 1,
    title: 'Hello',
    singer: 'Adele' 
  }
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
