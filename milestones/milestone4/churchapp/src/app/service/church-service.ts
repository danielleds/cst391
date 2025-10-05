import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sermon } from '../models/sermon.model';

@Injectable({
  providedIn: 'root'
})
export class ChurchService {
  private host = "http://localhost:5000";
  private http: HttpClient | null = null;

  constructor(private httpCli: HttpClient) {
    this.http = httpCli;
  }

  public getSermons(callback: (sermons: Sermon[]) => void) {
    this.http?.get<Sermon[]>(`${this.host}/sermons`)
      .subscribe((sermons: Sermon[]) => {
        callback(sermons);
      })
  }

  public getSermonById(id: number, callback: (sermon: Sermon) => void) {
    this.http?.get<Sermon[]>(`${this.host}/sermons/${id}`)
      .subscribe((sermon: Sermon[]) => {
        callback(sermon[0]);
      })
  }

  public createSermon(sermon: Sermon, callback: () => void) {
    this.http?.post<Sermon>(`${this.host}/sermons`, sermon)
      .subscribe(() => {
        callback();
      })
  }

  public editSermon(sermon: Sermon, callback: () => void) {
    this.http?.put<Sermon>(`${this.host}/sermons`, sermon)
      .subscribe(() => {
        callback();
      })
  }

  public deleteSermon(id: number, callback: () => void) {
    this.http?.delete<Sermon>(`${this.host}/sermons/${id}`)
      .subscribe(() => {
        callback();
      })
  }
}
