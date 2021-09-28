import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Song } from './song';
import { SONGS } from './mock-songs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }

  private songsUrl = 'api/songs';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getSongs(): Observable<Song[]> { 
    return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );
  }

  getSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/{id}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song with id = ${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  updateSong(song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, this.httpOptions).pipe(
      tap(_ => this.log(`updated song id = ${song.id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }
}
