import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() lable: string;
  @Input() labAtrr;
  @Input() lab;
  @Input() labReg;
  private toggleEdit = true;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  editLab( name, form: NgForm ) {
    form.resetForm();
    this.toggleEdit = !this.toggleEdit;
    let id = null;
    if ( this.labReg === 'laboratory') {
      id = this.lab.lab_id;
    } else if ( this.labReg === 'regulatory' ) {
      id = this.lab.id;
    }
    this.appService.addPost( id, this.labAtrr, this.lab[this.labAtrr] || '', name, this.labReg );
  }

}
