import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
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
  private crssSub: Subscription;
  private searchSub;
  private searchString = '';
  private toggleTarget = true;

  constructor(public laboratoryService: LaboratoryService,
              private appService: AppService,
              private historyService: HistoryService,
              private cd: ChangeDetectorRef,
              private searchService: SearchService) {}

  ngOnInit() {
    this.searchSub = this.searchService.getSearchUpdateListener()
    .subscribe((searchString) => {
      this.searchString = searchString.toString();
      // this.cd.markForCheck();
    });
    this.appService.getCrss();
    this.crssSub = this.appService.getCrsUpdateListener()
      .subscribe((crss) => {
        this.crss = crss;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.crssSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  onOpen ( event, lab ) {
    if ( this.toggleTarget === true ) {
      event.currentTarget.parentElement.parentElement.classList.add('lab_is_open');
    } else {
      event.currentTarget.parentElement.parentElement.classList.remove('lab_is_open');
    }
    this.toggleTarget = !this.toggleTarget;
    this.historyService.ticketArray = [];
    this.historyService.onOpen( lab.lab_id );
  }

  deleteLab(id: number) {
    this.laboratoryService.deleteLab(id);
  }
}
