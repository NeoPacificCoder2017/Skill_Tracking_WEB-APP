import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})

export class AdminSkillsComponent implements OnInit {
  listSkills: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getSkills();
  }

  public getSkills(): any {
    this.apiService.get('skills')
    .subscribe((data) => {
      this.listSkills = data.data;
      console.log('skills data', this.listSkills);
    });
  }

}
