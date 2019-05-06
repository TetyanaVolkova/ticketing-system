import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Laboratory } from '../laboratory.model';
import { LaboratoryService } from '../laboratory.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit, OnDestroy {
  private laboratories;
  private tickets;
  private labsSub: Subscription;
  private ticketsSub: Subscription;

  constructor(public laboratoryService: LaboratoryService) {}

  ngOnInit() {
    this.laboratoryService.getlabs();
    this.laboratoryService.getTickets();
    this.ticketsSub = this.laboratoryService.getPostUpdateListener()
      .subscribe((laboratories) => {
        this.laboratories = laboratories;
      });
    this.labsSub = this.laboratoryService.getTicketsUpdateListener()
      .subscribe((tickets) => {
        this.tickets = tickets;
    });
  }

  ngOnDestroy() {
    this.labsSub.unsubscribe();
    this.ticketsSub.unsubscribe();
  }

  deleteLab(id: number) {
    this.laboratoryService.deleteLab(id);
  }
  editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
    this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  }
}
