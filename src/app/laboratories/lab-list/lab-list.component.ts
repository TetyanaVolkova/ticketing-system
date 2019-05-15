import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Laboratory } from '../laboratory.model';
import { LaboratoryService } from '../laboratory.service';
import { SearchService } from '../../search-component/search.service';
import { AppService } from '../../app.service';
import { HistoryService } from '../../history/history.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  private crss;
  private tickets;
  private crssSub: Subscription;
  private searchSub;
  private searchString = '';

  constructor(public laboratoryService: LaboratoryService,
              private appService: AppService,
              private historyService: HistoryService,
              private cd: ChangeDetectorRef,
              private searchService: SearchService) {}

  ngOnInit() {
    this.appService.getCrss();
    // this.appService.getTickets();
    this.searchSub = this.searchService.getSearchUpdateListener()
    .subscribe((searchString) => {
      this.searchString = searchString.toString();
      this.cd.markForCheck();
    });
    this.crssSub = this.appService.getCrsUpdateListener()
      .subscribe((crss) => {
        this.crss = crss;
        console.log(this.crss);
        this.cd.markForCheck();
      });
    // this.ticketsSub = this.appService.getTicketsUpdateListener()
    //   .subscribe((tickets) => {
    //     this.tickets = tickets;
    //     this.cd.markForCheck();
    // });
  }

  ngOnDestroy() {
    this.crssSub.unsubscribe();
    // this.ticketsSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  onOpen ( lab_id ) {
    this.historyService.ticketArray = [];
    this.historyService.onOpen( lab_id );
  }

  deleteLab(id: number) {
    this.laboratoryService.deleteLab(id);
  }
  editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
    this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  }
}
