import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AppService {
  private crss;
  public tickets;
  public crssUpdated = new Subject();
  private ticketsUpdated = new Subject();
  private date = new Date();
  private ticketSub;
  private reg_id;
  private lab_id;

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
  addPost( labID: number, ticket_atr: string, ticket_old_value: string, ticket_new_value: string, lab_reg: string ) {
    this.getTickets();
    this.ticketSub = this.getTicketsUpdateListener()
      .subscribe((val) => {
        this.tickets = val;
      });
        const id = Number(labID);

      setTimeout(() => {
        if ( lab_reg === 'laboratory') {
          this.reg_id = null;
          this.lab_id = labID;
        } else if ( lab_reg === 'regulatory' ) {
          this.reg_id = labID;
          this.lab_id = null;
        }
        const ticket_id = this.tickets.length + 1;
        const ticket = {  ticket_id: ticket_id,
                          ticket_date: this.date,
                          ticket_status: 'edited',
                          ticket_email: 'email@email.com',
                          ticket_fullname: 'Full Name Here',
                          lab_reg: lab_reg,
                          reg_id: this.reg_id,
                          lab_id: this.lab_id,
                          ticket_atr: ticket_atr,
                          ticket_old_value: ticket_old_value,
                          ticket_new_value: ticket_new_value
                        };
        this.http
          .post( 'http://localhost:3000/api/tickets_list', ticket )
          .subscribe(responseData => {
            this.tickets.push(responseData);
            this.ticketsUpdated.next([...this.tickets]);
            return;
          });
      }, 1000 );
        // const formatedDate = moment( this.date ).format( 'MMMM DD, YYYY' );
        // this.cd.markForCheck();
      // });
  }

  deleteLab(id, lab_reg) {
    setTimeout(() => {
      if ( lab_reg === 'laboratory') {
        this.reg_id = null;
        this.lab_id = id;
      } else if ( lab_reg === 'regulatory' ) {
        this.reg_id = id;
        this.lab_id = null;
      }
      const ticket_id = this.tickets.length + 1;
      const ticket = { ticket_id: ticket_id,
                      ticket_date: this.date,
                      ticket_status: 'deleted',
                      ticket_email: 'email@email.com',
                      ticket_fullname: 'Some Name',
                      lab_reg: lab_reg,
                      reg_id: this.reg_id,
                      lab_id: this.lab_id,
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
    }, 1000 );
  }

  approveReject(id, oldStatus, status) {
    this.tickets.forEach(element => {
      if ( element.ticket_id === id ) {
        element.ticket_status = status;
        this.http
          .put( 'http://localhost:3000/api/tickets_list/' + element.ticket_id, element )
          .subscribe(responseData => {
            // this.tickets.push(responseData);
            // this.ticketsUpdated.next([...this.tickets]);
          });
      }
      return;
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
        console.log(this.tickets);
        return this.tickets;
      });
  }

  getCrsUpdateListener() {
    return this.crssUpdated.asObservable();
  }

  getTicketsUpdateListener() {
    return this.ticketsUpdated.asObservable();
  }
}
