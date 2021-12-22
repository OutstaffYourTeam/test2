import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ObjectInterface } from '../interfaces/object';
import { ObjectService } from '../services/object/object.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrType } from '../enums/toastr-type.enum';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css']
})
export class ModelDetailComponent implements OnInit {

  item: ObjectInterface;
  isLoading: Boolean = false;
  color: string = '#ffffff';
  isEdit: Boolean = false;
  validate: Boolean = false;
  form: FormGroup = this.fb.group({
    item: this.fb.group({
      title: [null],
      color: [null, Validators.required],
      width: [0, Validators.required],
      height: [0, Validators.required],
      depth: [0, Validators.required],
    }),
  });

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private objectService: ObjectService,
    private toastr: ToastrService,
  ) { }

  handleClickSaveBtn() {
    if(this.isEdit) {
      const form = this.form?.get('item');
      if(form.valid) {
        const values = form.value;
        this.updateObject(values);
      }
    }
    
    this.isEdit = !this.isEdit;
  }

  cancelEdit() {
    this.item = this.route.snapshot.data.item;
    this.isEdit = false;
  }

  setColorValidation() {
    return [Validators.required,Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/#[0-9][A-F][a-f]{6}/)];
  }

  updateValidation() {
    this.form.get('item')?.get('color')?.setValidators(this.setColorValidation());
    this.form.get('item')?.get('color')?.updateValueAndValidity();

    this.form.get('item')?.get('width')?.setValidators(this.setRequired());
    this.form.get('item')?.get('width')?.updateValueAndValidity();

    this.form.get('item')?.get('height')?.setValidators(this.setRequired());
    this.form.get('item')?.get('height')?.updateValueAndValidity();

    this.form.get('item')?.get('depth')?.setValidators(this.setRequired());
    this.form.get('item')?.get('depth')?.updateValueAndValidity();
  }

  setRequired() {
    return [Validators.required];
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

  async updateObject(data: ObjectInterface) {
    try {
      this.isLoading = true;
      const rest = await this.objectService.updateObject(this.item.id, data).toPromise();
      this.item = rest;
    } catch (error) {
      this.showToastr(ToastrType.Danger, 'Failed to update object.');
    } finally {
      this.isLoading = false;
    }
  }

  handleColorChange(color) {
    this.color = color;
    this.item.color = color;
    this.form.get('item')?.get('color')?.setValue(color);
  }

  private updateItemFrom(item: ObjectInterface): void {
    this.form.get('item')?.get('color')?.setValue(item?.color || '#ffffff');
    this.form.get('item')?.get('width')?.setValue(item?.width || 0);
    this.form.get('item')?.get('height')?.setValue(item?.height || 0);
    this.form.get('item')?.get('depth')?.setValue(item?.depth || 0);
    this.form.get('item')?.get('title')?.setValue(item?.title || null);
  }

  ngOnInit(): void {
    const { item } = this.route.snapshot.data;
    if(!item) {
      this.router.navigate(['/dashboard']);
    } 
    this.item = item;
    this.color = item.color;
    this.updateItemFrom(item);  
  }
}
