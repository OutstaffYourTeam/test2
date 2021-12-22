import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ObjectInterface } from '../interfaces/object';
import { ObjectService } from '../services/object/object.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectResolver implements Resolve<ObjectInterface> {
  constructor(
    private objectService: ObjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ObjectInterface> | Promise<ObjectInterface> | ObjectInterface {
    const { id } = route.params;
    if(!id) return null;
    else {
      return this.objectService.getObjectById(id);
    }
  }
}
