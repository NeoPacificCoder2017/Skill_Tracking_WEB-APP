import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  getFormations() {
    return this.http.get(apiUrl + 'formation')
    .subscribe((data) => {
      console.log('logout test', data);
    });
  }

  postFormationDetail() {
    this.http.post('formationdetail/create', {formation_id: 200, formateur_id: 200, module_id: 200})
    .subscribe((data) => {
      console.log('logout test', data);
    });
  }

  updateFormationDetail() {
    this.http.put('formationdetail', {formation_detail_id: 506, formation_id: 300, formateur_id: 300, module_id: 300})
    .subscribe((data) => {
      console.log('logout test', data);
    });
  }

  deleteFormationDetail() {
    this.http.delete('formationdetail/506')
    .subscribe((data) => {
      console.log('logout test', data);
    });
  }
}
