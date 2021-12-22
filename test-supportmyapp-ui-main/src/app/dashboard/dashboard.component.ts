import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrType } from '../enums/toastr-type.enum';
import { PaginationInterface } from '../interfaces/base';
import { ObjectInterface } from '../interfaces/object';
import { Paginator } from '../interfaces/paginator';
import { ObjectService } from '../services/object/object.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: ObjectInterface[] = [];
  isLoading: Boolean = false;
  pagination: PaginationInterface;

  constructor(
    private objectService: ObjectService,
    private toastr: ToastrService,
  ) { }

  removeItem(id) {
    this.deleteItem(id);
  }

  ngOnInit() {
    this.loadItems();
  }

  async loadItems(){
    try {
      this.isLoading = true;
      const res = await this.objectService.getObjects(this.pagination).toPromise();
      this.items = res.data;      
    } catch (error) {
      this.showToastr(ToastrType.Danger, 'Failed to load items.');
    } finally {
      this.isLoading = false;
    }
  }

  async deleteItem(id: number){
    try {
      this.isLoading = true;
      const res = await this.objectService.deleteObjectById(id).toPromise();
      if(res.success) {
        this.showToastr(ToastrType.Success, 'Item is deleted successfully.');
        this.items = this.items.filter(item => item.id !== id);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      this.showToastr(ToastrType.Danger, 'Failed to delete item');
    } finally {
      this.isLoading = false;
    }
  }

  showToastr(type: ToastrType, msg: string) {
    switch (type) {
      case ToastrType.Danger:
        this.toastr.error(
          `<span class="now-ui-icons ui-1_bell-53"></span> ${msg}`, '',
          {
            timeOut: 8000,
             enableHtml: true,
             closeButton: true,
             toastClass: "alert alert-danger alert-with-icon",
             positionClass: 'toast-top-center',
          }
        )
        break;
      case ToastrType.Success:
        this.toastr.success(
          `<span class="now-ui-icons ui-1_bell-53"></span> ${msg}`, '',
          {
            timeOut: 8000,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: 'toast-top-center',
          }
        )
        break;
      default:
        break;
    }
  }
}
