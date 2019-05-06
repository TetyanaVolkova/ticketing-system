import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tickets } from './tickets.model';


@Injectable({ providedIn: 'root' })

export class TicketService {
  private labs;
  private lab_id;
  private labsUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getlabs() {
    this.http
      .get<{ message: string; labs: {} }>(
        'http://localhost:3000/api/lab_list'
      )
      .subscribe(postData => {
        console.log(postData);
        this.labs = postData;
        console.log(this.labs);
        this.labsUpdated.next([...this.labs]);
      });
  }

  getPostUpdateListener() {
    return this.labsUpdated.asObservable();
  }

  addPost(labID: number, title: string) {
    const lab_id = Number(labID);
    const tickets: Tickets[]  =  [];
    const date = new Date();
    tickets.push({  ticket_id: Math.random(),
                    ticket_date: date,
                    ticket_status: 'post',
                    ticket_email: 'email@email.com',
                    ticket_fullname: 'Some Name',
                    lab_id: lab_id,
                    ticket_atr: 'string',
                    ticket_old_value: 'string',
                    ticket_new_value: title
                  });
                    console.log(tickets);
    this.http
      .post('http://localhost:3000/api/tickets_list', tickets)
      .subscribe(responseData => {
        console.log(responseData);
        this.labs.push(tickets[0]);
        console.log(this.labs);
        this.labsUpdated.next([...this.labs]);
      });
  }

  deleteLab(id) {
    const tiket = {lab_id: id};
    this.http
      .post('http://localhost:3000/api/tickets_list', tiket)
      .subscribe(responseData => {
        console.log(responseData);
        this.labs = this.labs.filter(function(el) {
          return el.lab_id !== id;
        });
        this.labsUpdated.next([...this.labs]);
      });
  }
}
