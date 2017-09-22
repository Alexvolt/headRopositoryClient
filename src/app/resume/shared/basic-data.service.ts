import { Injectable } from '@angular/core';
import { HttpService } from "../../core/http.service";
import { environment } from "../../../environments/environment";


@Injectable()
export class BasicDataService {

  baseRoute: string = '';

  constructor(
    private httpSer: HttpService,
  ) { 
  }

  getAll(params?: string | URLSearchParams | {
      [key: string]: any | any[];
    } | null) {
    return this.httpSer.get(this.baseUrl + '', params ? { params: params } : undefined);
  }

  getById(id: number) {
    return this.httpSer.get(this.baseUrl + '/' + id);
  }

  create(dataObject: any) {
    return this.httpSer.post(this.baseUrl + '/', { body: dataObject });
  }
  
  update(dataObject: any) {
    return this.httpSer.put(this.baseUrl + '/' + dataObject.id, { body: dataObject });
  }

  delete(id: number) {
    return this.httpSer.delete(this.baseUrl + '/' + id);
  }

  private get baseUrl(){
    return environment.apiUrl + '/' + this.baseRoute;
  }


}

