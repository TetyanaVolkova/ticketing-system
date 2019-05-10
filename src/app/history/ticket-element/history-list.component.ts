import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from '../history.service';
import { SearchService } from '../../search-component/search.service';

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

  constructor ( public historyService: HistoryService,
                private cd: ChangeDetectorRef,
                private searchService: SearchService ) {}

  ngOnInit() {
    this.searchSub = this.searchService.getSearchUpdateListener()
      .subscribe((searchString) => {
        console.log(searchString);
        this.searchString = searchString.toString();
        this.cd.markForCheck();
      });
    this.historyService.getHistory();
    this.historySub = this.historyService.getHistoryUpdateListener()
      .subscribe((history) => {
         console.log(history);
        this.history = history;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.historySub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  // deleteLab(id: number) {
  //   this.laboratoryService.deleteLab(id);
  // }
  // editLab( id: number, ticket_atr: string, ticket_old_value: string ) {
  //   this.laboratoryService.addPost( id, ticket_atr, ticket_old_value );
  // }
}
