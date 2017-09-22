import { Injectable } from '@angular/core';
import { HttpService } from "../../core/http.service";
import { environment } from "../../../environments/environment";
import { BasicDataService } from "./basic-data.service";


@Injectable()
export class ProfessionalAreasService extends BasicDataService {

  constructor(private http: HttpService) {
    super(http);
    this.baseRoute = 'professionalAreas';
  }

  getParents() {
    return this.http.get(environment.apiUrl + '/professionalAreas/parents');
  }
}
