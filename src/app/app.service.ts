import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AppService {
  private crss;
  public tickets;
  public crssUpdated = new Subject();
  private ticketsUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getCrss() {
    this.http
      .get<{ message: string; crss: {} }>(
        'http://localhost:3000/api/crs_list'
      )
      .subscribe(postData => {
        this.crss = postData;
        this.crssUpdated.next([...this.crss]);
      });
  }

  getTickets() {
    this.http
      .get<{ message: string; tickets: {} }>(
        'http://localhost:3000/api/tickets_list'
      )
      .subscribe(postData => {
        this.tickets = postData;
        this.ticketsUpdated.next([...this.tickets]);
      });
  }

  getCrsUpdateListener() {
    return this.crssUpdated.asObservable();
  }

  getTicketsUpdateListener() {
    return this.ticketsUpdated.asObservable();
  }
}
