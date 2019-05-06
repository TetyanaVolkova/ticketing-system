import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tickets } from '../tickets/tickets.model';


@Injectable({ providedIn: 'root' })

export class LaboratoryService {
  private labs;
  private lab_id;
  private labsUpdated = new Subject();
  private ticketsUpdated = new Subject();
  private date = new Date();
  private tickets;

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

  getTickets() {
    this.http
      .get<{ message: string; tickets: {} }>(
        'http://localhost:3000/api/tickets_list'
      )
      .subscribe(postData => {
        console.log(postData);
        this.tickets = postData;
        this.ticketsUpdated.next([...this.tickets]);
      });
  }

  getPostUpdateListener() {
    return this.labsUpdated.asObservable();
  }

  getTicketsUpdateListener() {
    return this.ticketsUpdated.asObservable();
  }

  addPost( labID: number, ticket_atr: string, ticket_old_value: string ) {
    const lab_id = Number(labID);
    const ticket_id = this.tickets.length + 1;
    const ticket = {  ticket_id: ticket_id,
                      ticket_date: this.date,
                      ticket_status: 'post',
                      ticket_email: 'email@email.com',
                      ticket_fullname: 'Some Name',
                      lab_id: lab_id,
                      ticket_atr: ticket_atr,
                      ticket_old_value: ticket_old_value,
                      ticket_new_value: 'new value'
                    };
    this.http
      .post( 'http://localhost:3000/api/tickets_list', ticket )
      .subscribe(responseData => {
        this.tickets.push(responseData);
        this.ticketsUpdated.next([...this.tickets]);
      });
  }

  deleteLab(id) {
    const ticket_id = this.tickets.length + 1;
    const ticket = { ticket_id: ticket_id,
                    ticket_date: this.date,
                    ticket_status: 'delete',
                    ticket_email: 'email@email.com',
                    ticket_fullname: 'Some Name',
                    lab_id: id,
                    ticket_atr: '',
                    ticket_old_value: '',
                    ticket_new_value: ''
                  };
    this.http
      .post('http://localhost:3000/api/tickets_list', ticket)
      .subscribe(responseData => {
        this.tickets.push(responseData);
        this.ticketsUpdated.next([...this.tickets]);
      });
  }
}
