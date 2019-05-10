import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Laboratory } from '../laboratory.model';
import { LaboratoryService } from '../laboratory.service';
import { SearchService } from '../../search-component/search.service';

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
  private searchSub;
  private searchString = '';

  constructor(public laboratoryService: LaboratoryService,
              private cd: ChangeDetectorRef,
              private searchService: SearchService) {}

  ngOnInit() {
    this.searchSub = this.searchService.getSearchUpdateListener()
      .subscribe((searchString) => {
        this.searchString = searchString.toString();
        this.cd.markForCheck();
      });
    this.laboratoryService.getlabs();
    this.laboratoryService.getTickets();
    this.ticketsSub = this.laboratoryService.getPostUpdateListener()
      .subscribe((laboratories) => {
        this.laboratories = laboratories;
        this.cd.markForCheck();
      });
    this.labsSub = this.laboratoryService.getTicketsUpdateListener()
      .subscribe((tickets) => {
        this.tickets = tickets;
        this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.labsSub.unsubscribe();
    this.ticketsSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  deleteLab(id: number) {
    this.laboratoryService.deleteLab(id);
  }
  editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
    this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  }
}
