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

  private songsUrl = 'api/songs'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }

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
        tap(_ => this.log('fetched songs successfully')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );
  }

  getSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song with id = ${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  getSongNo404<Data>(id: number): Observable<Song> {
    const url = `${this.songsUrl}/?id={id}`;
    return this.http.get<Song[]>(url).pipe(
      map(songs => songs[0]),
      tap(h => {
        const outcome = h ? `fetched`: `did not find`;
        this.log(`${outcome} song with id=${id}`);
      }),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  updateSong(song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, this.httpOptions).pipe(
      tap(_ => this.log(`updated song id = ${song.id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, this.httpOptions).pipe(
      tap((newSong: Song) => this.log(`added song with id = ${newSong.id}`)),
      catchError(this.handleError<Song>('addSong'))
    );
  }

  deleteSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted song id=${id}`)),
      catchError(this.handleError<Song>(`deletedSong`))
    );
  }
}
