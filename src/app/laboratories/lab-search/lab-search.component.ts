import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LaboratoryService } from '../laboratory.service';

@Component({
  selector: 'app-lab-search',
  templateUrl: './lab-search.component.html',
  styleUrls: ['./lab-search.component.css']
})
export class LabSearchComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public laboratoryService: LaboratoryService) {}

  // onAddPost(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.laboratoryService.addPost(form.value.labID, form.value.title);
  //   form.resetForm();
  // }
}
