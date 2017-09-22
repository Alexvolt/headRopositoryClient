import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

import { AlertService } from "../../../core/alerts/alert.service";
import { ProfessionalAreasService } from "../professional-areas.service";

@Component({
  selector: 'app-professional-areas',
  templateUrl: './professional-areas.component.html',
  styleUrls: ['./professional-areas.component.css']
})
export class ProfessionalAreasComponent implements OnInit {
  rows: any[];
  columns = [
    {name:'id', prop: 'id'},
    {name:'Наименование', prop: 'name'},
    {name:'parentId', prop: 'parentId'},
  ];
  selected = [];

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 50;
  isLoading: boolean;

  constructor(
    private professionalAreasService: ProfessionalAreasService,
    private alertService: AlertService,
    private el: ElementRef,
    private router: Router) {  
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.professionalAreasService.getAll().subscribe(
      rows => {
        this.rows = rows;
        this.isLoading = false;
      },
      error => {
        this.alertService.error(error); 
        this.isLoading = false;
      }
    )
  }
}
