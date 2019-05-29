import { Component, OnInit, Input } from '@angular/core';
import { LaboratoryService } from '../../laboratories/laboratory.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.css']
})
export class LabInfoComponent implements OnInit {
  @Input() lable: string;
  @Input() labAtrr;
  @Input() lab;
  private toggleEdit = true;

  constructor(private laboratoryService: LaboratoryService) { }

  ngOnInit() {
  }

  editLab( name, form: NgForm ) {
    form.resetForm();
    this.toggleEdit = !this.toggleEdit;
    this.laboratoryService.addPost( this.lab.lab_id, this.labAtrr, this.lab[this.labAtrr] || '', name );
  }

}
