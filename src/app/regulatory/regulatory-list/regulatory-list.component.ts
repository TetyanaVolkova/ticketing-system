import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegulatoryService } from '../regulatory.service';
import { SearchService } from '../../search-component/search.service';

@Component({
  selector: 'app-regulatory-list',
  templateUrl: './regulatory-list.component.html',
  styleUrls: ['./regulatory-list.component.css']
})
export class RegulatoryListComponent implements OnInit, OnDestroy {
  private regulatory;
  private regulatorySub: Subscription;
  private searchSub;
  private searchString = '';

  constructor ( public regulatoryService: RegulatoryService,
                private cd: ChangeDetectorRef,
                private searchService: SearchService ) {}

  ngOnInit() {
    this.searchSub = this.searchService.getSearchUpdateListener()
      .subscribe((searchString) => {
        console.log(searchString);
        this.searchString = searchString.toString();
        this.cd.markForCheck();
      });
    this.regulatoryService.getRegulatory();
    this.regulatorySub = this.regulatoryService.getRegulatoryUpdateListener()
      .subscribe((regulatory) => {
        this.regulatory = regulatory;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.regulatorySub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  // deleteLab(id: number) {
  //   this.laboratoryService.deleteLab(id);
  // }
  // editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
  //   this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  // }
}
