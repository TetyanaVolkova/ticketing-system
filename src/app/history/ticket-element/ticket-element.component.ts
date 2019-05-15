import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { HistoryService } from '../history.service';
const moment = require('moment');

@Component({
  selector: 'app-ticket-element',
  templateUrl: './ticket-element.component.html',
  styleUrls: ['./ticket-element.component.css']
})
export class TicketElementComponent implements OnInit, OnDestroy {
  private history = [];
  @Input() labId: string;
  @Input() ticketatr: string;

  constructor ( private appService: AppService,
                private historyService: HistoryService,
                private cd: ChangeDetectorRef ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  // deleteLab(id: number) {
  //   this.laboratoryService.deleteLab(id);
  // }
  // editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
  //   this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  // }
}
