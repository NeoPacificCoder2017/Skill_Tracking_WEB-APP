import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];
  formations: {};
  formation: any;
  environment = environment;
  newFormationForm: FormGroup;
  loading = false;
  submitted = false;
  newFormationImage: File;

  totalFormations: Number;
  totalStudents: Number;
  totalTeachers: Number;
  totalModules: Number;
  totalSkills: Number;
  totalSkillsValidatedByStudents: Number;
  totalSkillsValidatedByTeachers: Number;
  totalProgressions: Number;
  totalMales: Number;
  totalFemales: Number;
  totalBusinesses: Number;
  totalFormationsHours: Number;

  progression = {
    teacher_validated: 40,
    student_validated: 20,
    skills: 80
  };
  yearsGraph = [];
  teachersDataGraph = {};
  studentsDataGraph = {};
  skillsDataGraph = {};

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private ngZone: NgZone) {
    // this.formations = {};
  }
  ngOnInit() {
    this.newFormationForm = this.formBuilder.group({
        name: ['', Validators.required],
        start_at: ['', Validators.required],
        end_at: ['', Validators.required]
    });
    this.apiService.get('getAllFormationsForAdmin').subscribe(data => {this.formations = data;});
    this.apiService.get('getTotalFormations').subscribe(data => {this.totalFormations = data;});
    this.apiService.get('getTotalStudents').subscribe(data => {this.totalStudents = data;});
    this.apiService.get('getTotalTeachers').subscribe(data => {this.totalTeachers = data;});
    this.apiService.get('getTotalModules').subscribe(data => {this.totalModules = data;});
    this.apiService.get('getTotalSkills').subscribe(data => {this.totalSkills = data;console.log('getTotalSkills data', data)});
    this.apiService.get('getTotalProgressions').subscribe(data => {this.totalProgressions = data;console.log('totalProgressions data', data)});
    this.apiService.get('getTotalSkillsValidatedByStudents').subscribe(data => {this.totalSkillsValidatedByStudents = data;console.log('totalSkillsValidatedByStudents data', data)});
    this.apiService.get('getTotalSkillsValidatedByTeachers').subscribe(data => {this.totalSkillsValidatedByTeachers = data;console.log('totalSkillsValidatedByTeachers data', data)});
    this.apiService.get('getTotalMales').subscribe(data => {this.totalMales = data;});
    this.apiService.get('getTotalFemales').subscribe(data => {this.totalFemales = data;});
    this.apiService.get('getTotalBusinesses').subscribe(data => {this.totalBusinesses = data;console.log('totalBusinesses', this.totalBusinesses);});
    this.apiService.get('getTotalFormationsHours').subscribe(data => {this.totalFormationsHours = data;console.log('totalFormationsHours', this.totalFormationsHours);});
    this.apiService.get('getTotalFormationsHours').subscribe(data => {this.totalFormationsHours = data;console.log('totalFormationsHours', this.totalFormationsHours);});
    
    this.retrieveStudentsGraphData();
    this.retrieveTeachersGraphData();
    this.retrieveSkills();
  }

  retrieveStudentsGraphData() {
    this.apiService.get('getTotalStudentsByYear').subscribe(
      totalStudentsByYear => {
        const studentsGraph = [];
        const studentsMaleGraph = [];
        const studentsFemaleGraph = [];
        
        for(let i = 0; i < totalStudentsByYear.length; i++) {
          this.yearsGraph.push(totalStudentsByYear[i].year); 
          studentsGraph.push(totalStudentsByYear[i].total); 
        }
        this.apiService.get('getTotalStudentsMaleByYear').subscribe(
          totalStudentsMaleByYear => {
            for(let i = 0; i < totalStudentsMaleByYear.length; i++) studentsMaleGraph.push(totalStudentsMaleByYear[i].total);
            this.apiService.get('getTotalStudentsFemaleByYear').subscribe(
              totalStudentsFemaleByYear => {
                for(let i = 0; i < totalStudentsFemaleByYear.length; i++) studentsFemaleGraph.push(totalStudentsFemaleByYear[i].total);
                this.studentsDataGraph = {
                  labels: this.yearsGraph,
                  datasets: [
                    {
                      label: 'Hommes',
                      data: studentsMaleGraph,
                      fill: false,
                      backgroundColor: "rgba(75, 192, 192, 0.2)"
                    },
                    {
                      label: 'Total',
                      data: studentsGraph,
                      fill: false,
                      backgroundColor: "rgba(255, 99, 132, 0.2)"
                    },
                    {
                      label: 'Femmes',
                      data: studentsFemaleGraph,
                      fill: false,
                      backgroundColor: "rgba(54, 162, 235, 0.2)"
                    },
                  ],
                };
              }
            );
          }
        );
      }
    );
  }

  retrieveTeachersGraphData() {
    this.apiService.get('getTotalTeachersByYear').subscribe(
      totalTeachersByYear => {
        const teachersGraph = [];
        const teachersMaleGraph = [];
        const teachersFemaleGraph = [];
        
        for(let i = 0; i < totalTeachersByYear.length; i++) teachersGraph.push(totalTeachersByYear[i].total);
        this.apiService.get('getTotalTeachersMaleByYear').subscribe(
          totalTeachersMaleByYear => {
            
            for(let i = 0; i < totalTeachersMaleByYear.length; i++) teachersMaleGraph.push(totalTeachersMaleByYear[i].total);
            this.apiService.get('getTotalTeachersFemaleByYear').subscribe(
              totalTeachersFemaleByYear => {
                for(let i = 0; i < totalTeachersFemaleByYear.length; i++) teachersFemaleGraph.push(totalTeachersFemaleByYear[i].total);
                this.teachersDataGraph = {
                  labels: this.yearsGraph,
                  options: {
                    legend: {
                      display: false,
                    }
                  },
                  datasets: [
                    {
                      label: 'Hommes',
                      data: teachersMaleGraph,
                      fill: false,
                      backgroundColor: "rgba(75, 192, 192, 0.2)"
                    },
                    {
                      label: 'Total',
                      data: teachersGraph,
                      fill: false,
                      backgroundColor: "rgba(255, 99, 132, 0.2)"
                    },
                    {
                      label: 'Femmes',
                      data: teachersFemaleGraph,
                      fill: false,
                      backgroundColor: "rgba(54, 162, 235, 0.2)"
                    },
                  ],
                };
              }
            );
          }
        );
      }
    );
  }

  retrieveSkills() {
    //getTotalSkillsValidatedByStudentsByMonthOfYear
    const labels = [];
    const studentsSkillsValidatedGraph = [];
    const teachersSkillsValidatedGraph = [];
    this.apiService.get('getTotalSkillsValidatedByStudentsByMonthOfYear/2018').subscribe(
      dataStudents => {
        for(let i = 0; i < dataStudents.length; i++){
          labels.push(dataStudents[i].month);
          studentsSkillsValidatedGraph.push(dataStudents[i].total);
        }
        console.log('studentsSkillsValidatedGraph', studentsSkillsValidatedGraph);
        this.apiService.get('getTotalSkillsValidatedByTeachersByMonthOfYear/2018').subscribe(
          dataTeachers => {
            console.log('')
            for(let i = 0; i < dataTeachers.length; i++) teachersSkillsValidatedGraph.push(dataTeachers[i].total);
            console.log('teachersSkillsValidatedGraph', teachersSkillsValidatedGraph);
            this.skillsDataGraph = {
              labels: labels,
              options: {
                legend: {
                  display: false,
                }
              },
              datasets: [
                {
                  label: 'Formateurs',
                  data: teachersSkillsValidatedGraph,
                  fill: true,
                  backgroundColor: "rgba(230, 137, 184, 0.3)",
                  borderColor: "rgba(219, 87, 153, 1)",
                  borderWidth: 1
                },
                {
                  label: 'Etudiants',
                  data: studentsSkillsValidatedGraph,
                  fill: true,
                  backgroundColor: "rgba(222, 221, 255, 0.3)",
                  borderColor: "rgba(161, 158, 255, 1)",
                  borderWidth: 1
                },
              ],
            };
          }
        )
      }
    );
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.newFormationForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newFormationImage = event.target.files[0];
  }

  showFormation(idFormation) {
    console.log('Formation', idFormation);
    this.router.navigate(['/admin/formation'], { queryParams: { idFormation: idFormation } });
  }


  createFormation(): any {
    this.submitted = true;

    if (this.newFormationForm.invalid && this.newFormationImage == null) {
        return;
    }

    this.loading = true;
    const start_at = this.f.start_at.value.split('/');
    const end_at = this.f.end_at.value.split('/');
    const uploadData = new FormData();
    uploadData.append('name', this.f.name.value);
    uploadData.append('start_at', start_at[2]+'-'+start_at[1]+'-'+start_at[0]+' 00:00:00:00');
    uploadData.append('end_at', end_at[2]+'-'+end_at[1]+'-'+end_at[0]+' 00:00:00:00');
    uploadData.append('logo', this.newFormationImage, this.newFormationImage.name);

    console.log('uploadData', uploadData);
    console.log('this.newFormationImage',this.newFormationImage)
    this.apiService.upload('formation/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteFormation(idFormation): any {
    this.apiService.delete('formation/' + idFormation)
    .subscribe(data => {
      this.ngOnInit();
    });
  }

}
