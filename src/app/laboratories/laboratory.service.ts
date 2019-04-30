import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Laboratory } from './laboratory.model';


@Injectable({ providedIn: 'root' })

export class LaboratoryService {
  private labs;
  private labsUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getlabs() {
    this.http
      .get<{ message: string; labs: {} }>(
        'http://localhost:3000/api/lab_list'
      )
      .subscribe(postData => {
        console.log(postData);
        this.labs = postData;
        console.log(this.labs);
        this.labsUpdated.next([...this.labs]);
      });
  }

  getPostUpdateListener() {
    return this.labsUpdated.asObservable();
  }

  addPost(labID: number, title: string) {
    const lab_id = Number(labID);
    const laboratory: Laboratory[]  =  [];
    laboratory.push({ lab_id: lab_id,
                      lab_name: title,
                      location: '',
                      PoC_name: '',
                      PoC_address: '',
                      certification: '',
                      networks: '',
                      LDMS: '',
                      qa_services: '',
                      lab_test_performed: '',
                      Certified_By: '',
                      Latitude: '',
                      Longtitude: '',
                    });
                    console.log(laboratory);
    this.http
      .post('http://localhost:3000/api/lab_list', laboratory)
      .subscribe(responseData => {
        console.log(responseData);
        this.labs.push(laboratory[0]);
        console.log(this.labs);
        this.labsUpdated.next([...this.labs]);
      });
  }
}
