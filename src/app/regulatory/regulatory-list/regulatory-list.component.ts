import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegulatoryService } from '../regulatory.service';
import { AppService } from '../../app.service';
import { SearchService } from '../../search-component/search.service';

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

  constructor ( private regulatoryService: RegulatoryService,
                private appService: AppService,
                private cd: ChangeDetectorRef,
                private searchService: SearchService ) {}

  ngOnInit() {
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

  // deleteLab(id: number) {
  //   this.laboratoryService.deleteLab(id);
  // }
  // editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
  //   this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  // }
}
