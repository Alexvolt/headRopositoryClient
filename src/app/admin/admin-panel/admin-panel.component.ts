import { Component, ElementRef, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AlertService, UserService } from '../../core/index';
import { User } from '../../core/index';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  columns = [
    {name:'id', prop: 'id'},
    {name:'Пользователь', prop: 'username'},
    {name:'Имя', prop: 'firstName'},
    {name:'Фамилия', prop: 'lastName'},
    {name:'email', prop: 'email'},
    {name:'Администратор', prop: 'admin', bool:true},
    {name:'Есть доступ', prop: 'haveAccess', bool:true},
  ];
  selected = [];

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 50;
  isLoading: boolean;
  isSorting: boolean = false;

  constructor(
    private userServise: UserService,
    private alertService: AlertService,
    private el: ElementRef,
    private router: Router) {  
  }

  ngOnInit() {
    this.onScroll(0);
   }

  onSort(event){
    // server-side sorting - need to clear data
    const sort = event.sorts[0];
    let limit = this.users.length;
    //this.users = [];
    this.isSorting = true;
    this.loadPage(limit, sort);
  }

  onScroll(offsetY: number, sort?: any){
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.users.length * this.rowHeight) {

      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.users.length === 0) {

        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      this.loadPage(limit, sort);
    }
  }

  private loadPage(limit: number, sort?: any){
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.isLoading = true;
    let params = {offset: this.users.length, limit: limit};
    if(sort){
      params['orderBy' + (sort.dir === 'desc'?'Desc':'')] = sort.prop;
    }
    this.userServise.getAll(params).subscribe(
      users => {
        if(this.isSorting){
          this.users = users;
          this.isSorting = false;
        }
        else
          this.users.push(...users); 
        this.isLoading = false;
      },
      error => {
        this.alertService.error(error); 
        this.isLoading = false;
      }
    )
  }

  delete(selectedUsers: User[]){
    for (let item of selectedUsers) {
      this.userServise.delete(item.id).subscribe(
        () => {
          let idx = this.users.indexOf(item);
          if(idx != -1){
            this.users.splice(idx, 1);
          }
        },
        error => {this.alertService.error(error)}
      );
    }
  }

  edit(selectedUsers: User[]){
    for (let item of selectedUsers) {
      let link = ['/profile', item.id];
      this.router.navigate(link);
      break;
    }
  }



/*   createUsers(){
    for (let index = 0; index < 1000; index++) {
      let val:any = {
        username: 'user'+index,
        password: 'user'+index,
        firstName: 'user'+index,
        lastName: 'user'+index,
        email: 'user'+index,
        admin: false,
        haveAccess: false
      };
      this.userServise.create(val).subscribe(() => { console.log('created' + val.username); },
            error => {console.log(error);});;    
     
    }  
  }
 */

}

