import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-admin',
  templateUrl: './admin-profile-admin.component.html',
  styleUrls: ['./admin-profile-admin.component.css']
})
export class AdminProfileAdminComponent implements OnInit {

  idAdmin: any;
  profileAdmin: any;
  environment = environment;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.profileAdmin = {};
     }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idAdmin = params.idAdmin;
        this.getProfileAdmin();
      });
  }

  goBack() {
    this.location.back();
  }

  getProfileAdmin(): any {
    this.apiService.get('adminProfil/' + this.idAdmin)
      .subscribe((data) => {
        console.log('idAdmin', this.idAdmin);
        this.profileAdmin = data;
        console.log('getProfileAdmin', this.profileAdmin);
      });
  }

}
