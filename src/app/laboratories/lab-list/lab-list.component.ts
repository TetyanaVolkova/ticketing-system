import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { LaboratoryService } from '../laboratory.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit, OnDestroy {
  private laboratories;
  private labsSub: Subscription;

  constructor(public laboratoryService: LaboratoryService) {}

  ngOnInit() {
    this.laboratoryService.getlabs();
    this.labsSub = this.laboratoryService.getPostUpdateListener()
      .subscribe((laboratories) => {
        console.log(laboratories);
        this.laboratories = laboratories;
      });
  }

  ngOnDestroy() {
    this.labsSub.unsubscribe();
  }
}
