import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegulatoryService } from '../regulatory.service';
import { AppService } from '../../app.service';
import { SearchService } from '../../search-component/search.service';
import { HistoryService } from '../../history/history.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-regulatory-list',
  templateUrl: './regulatory-list.component.html',
  styleUrls: ['./regulatory-list.component.css']
})
export class RegulatoryListComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  private crss;
  private crssSub: Subscription;
  private searchSub: Subscription;
  private searchString = '';
  private toggleTarget = true;
  private panelOpenState;
  private ticketsUpdatedSub;
  private disabledButton;

  constructor ( private regulatoryService: RegulatoryService,
                private appService: AppService,
                private cd: ChangeDetectorRef,
                private searchService: SearchService,
                private historyService: HistoryService,
                @Inject(DOCUMENT) private document: any ) {}

  ngOnInit() {
    this.ticketsUpdatedSub = this.appService.disabledButtonUpdateListener()
      .subscribe( (disabledButton) => {
        this.disabledButton = disabledButton;
        console.log(this.disabledButton);
      });
    this.searchSub = this.searchService.getSearchUpdateListener()
      .subscribe((searchString) => {
        this.searchString = searchString.toString();
        this.cd.markForCheck();
      });
      this.appService.getCrss();
      this.crssSub = this.appService.getCrsUpdateListener()
        .subscribe((crss) => {
          this.crss = crss;
          let reg_id = 400;
          this.crss.forEach(element => {
            if ( element.regulatory === null ) {
              element.regulatory = {
                id: reg_id,
                ctu_name: '',
                associated_regulatory_crs: '',
                crs_id: '',
                regulatory_authority_name: '',
                local_irb_ec_name: '',
                other_irb_ec_name: '',
                established_ibc: '',
                ibc_name: '',
                language: '',
                cti_needed: ''
              };
            }
            reg_id ++;
           });
          this.cd.markForCheck();
        });
  }

  ngOnDestroy() {
    this.crssSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  deleteLab ( id: number, lab_reg: string ) {
    this.document.getElementsByClassName('lab_is_open')[0].classList.remove('lab_is_open');
    this.appService.deleteLab(id, lab_reg);
  }

  onOpen ( event, lab ) {
    if ( this.toggleTarget === true ) {
      event.currentTarget.parentElement.parentElement.classList.add('lab_is_open');
    } else {
      event.currentTarget.parentElement.parentElement.classList.remove('lab_is_open');
    }
    this.toggleTarget = !this.toggleTarget;
    this.historyService.ticketArray = [];
    this.historyService.onOpen( lab.id );
  }

  // deleteLab(id: number) {
  //   this.laboratoryService.deleteLab(id);
  // }
  // editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
  //   this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  // }
}
