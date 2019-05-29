import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search-component/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() parentName: string;
  name = '';
  private searchString;

  constructor( private searchService: SearchService,
               private cd: ChangeDetectorRef ) {
  }
  onKey (val) {
    this.searchService.getInputValue( val );
  }

  // onAddPost(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.laboratoryService.addPost(form.value.labID, form.value.title);
  //   form.resetForm();
  // }
}
