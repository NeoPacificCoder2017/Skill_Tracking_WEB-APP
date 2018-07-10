import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  me : any;

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  ngOnInit() {
    console.log('test');
    this.me =  JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    if(this.me) console.log('connecté');
    else console.log('non connecté');
  }

  login() {
    this.authService.login('formator@hotmail.fr','formator').subscribe((data)=> {
      console.log('apiService get users', data);
    })
  }

  logout() {
    console.log('logout launched');
    this.authService.logout().subscribe((data) => {
      console.log('logout test',data);
    })
  }

  getFormations() {
    this.apiService.get('formator/myFormations')
    .subscribe((data) => {
      console.log('logout test',data);
    })
  }

  postFormationDetail() {
    this.apiService.post('formationdetail/create',{formation_id:200,formateur_id:200,module_id:200})
    .subscribe((data) => {
      console.log('logout test',data);
    })
  }

  updateFormationDetail() {
    this.apiService.put('formationdetail',{formation_detail_id:506,formation_id:300,formateur_id:300,module_id:300})
    .subscribe((data) => {
      console.log('logout test',data);
    })
  }

  deleteFormationDetail() {
    this.apiService.delete('formationdetail/506')
    .subscribe((data) => {
      console.log('logout test',data);
    })
  }
}
