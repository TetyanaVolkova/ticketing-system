import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { SearchService } from '../../search-component/search.service';
import { HistoryService } from '../history.service';
// const moment = require('moment');

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy {
  private history;
  private historySub: Subscription;
  private searchSub;
  private searchString = '';

  constructor ( public appService: AppService,
                private cd: ChangeDetectorRef,
                private searchService: SearchService,
                private historyService: HistoryService ) {}

  ngOnInit() {
    this.searchSub = this.searchService.getSearchUpdateListener()
      .subscribe((searchString) => {
        this.searchString = searchString.toString();
        this.cd.markForCheck();
      });
    this.appService.getTickets();
    this.historySub = this.appService.getTicketsUpdateListener()
      .subscribe((history) => {
        this.history = history;
        this.history.forEach(element => {
          // element.ticket_date = moment( element.ticket_date ).format( 'MMMM DD, YYYY' );
        });
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.historySub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  deleteLab(id: number) {
    console.log(id);
    this.historyService.deleteLab(id);
  }
  approveReject(id: number, oldStatus: string, status: string) {
    this.appService.approveReject(id, oldStatus, status);
  }
}
