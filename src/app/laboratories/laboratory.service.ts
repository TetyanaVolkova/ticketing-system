import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { formatDate } from '@angular/common/src/i18n/format_date';
// import { moment } from 'moment/src/moment';
// const moment = require('moment');

@Injectable({ providedIn: 'root' })

export class LaboratoryService {
  private labs;
  private lab_id;
  private ticketsUpdated = new Subject();
  private date = new Date();
  private tickets;

  constructor(private http: HttpClient,
              private appService: AppService) {}

  addPost( labID: number, ticket_atr: string, ticket_old_value: string, name: string ) {
    this.tickets = this.appService.tickets;
    const lab_id = Number(labID);
    // const formatedDate = moment( this.date ).format( 'MMMM DD, YYYY' );
    const ticket_id = this.tickets.length + 1;
    const ticket = {  ticket_id: ticket_id,
                      ticket_date: this.date,
                      ticket_status: 'edit',
                      ticket_email: 'email@email.com',
                      ticket_fullname: 'Some Name',
                      lab_id: lab_id,
                      ticket_atr: ticket_atr,
                      ticket_old_value: ticket_old_value,
                      ticket_new_value: name
                    };
    this.http
      .post( 'http://localhost:3000/api/tickets_list', ticket )
      .subscribe(responseData => {
        this.tickets.push(responseData);
        this.ticketsUpdated.next([...this.tickets]);
      });
  }

  deleteLab(id) {
    this.tickets = this.appService.tickets;
    console.log(this.tickets);
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
