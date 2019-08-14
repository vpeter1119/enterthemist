import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Themebook } from '../themebook.model';
import { AdminService } from '../../admin.service';
import { TextConvertService } from '../../../assets/text-convert.service'

@Component({
  selector: 'app-themebook-edit',
  templateUrl: './themebook-edit.component.html',
  styleUrls: ['./themebook-edit.component.css']
})
export class ThemebookEditComponent implements OnInit, OnDestroy {

  newTb: Themebook = {};
  isLoading: boolean;
  allTbs: Themebook[];
  allTbsSub: Subscription;
  selected = 'adaptation';
  selectedTb;

  newThemeBookForm = this.fb.group({
    tbtype: [''],
    name: [''],
    description: [''],
    ptagq: this.fb.group({
      A: [''],
      aXmp: [''],
      B: [''],
      bXmp: [''],
      C: [''],
      cXmp: [''],
      D: [''],
      dXmp: [''],
      E: [''],
      eXmp: [''],
      F: [''],
      fXmp: [''],
      G: [''],
      gXmp: [''],
      H: [''],
      hXmp: [''],
      I: [''],
      iXmp: [''],
      J: [''],
      jXmp: [''],
    }),
    wtagq: this.fb.group({
      A: [''],
      aXmp: [''],
      B: [''],
      bXmp: [''],
      C: [''],
      cXmp: [''],
      D: [''],
      dXmp: [''],
    }),
    improvements: this.fb.group({
      imp1: this.fb.group({
        name: [''],
        description: ['']
      }),
      imp2: this.fb.group({
        name: [''],
        description: ['']
      }),
      imp3: this.fb.group({
        name: [''],
        description: ['']
      }),
      imp4: this.fb.group({
        name: [''],
        description: ['']
      }),
      imp5: this.fb.group({
        name: [''],
        description: ['']
      }),
    })
  });

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private _tc: TextConvertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.allTbsSub = this.admin.getAllTbs()
    .subscribe((response) => {
      this.allTbs = response.m.concat(response.l);
      this.setSelected(this.selected);
      console.warn(this.allTbs);
      this.isLoading = false;
      //this.newThemeBookForm.controls['tbtype'].disable();
    })
  }

  onSubmit() {
    console.warn(this.newThemeBookForm.value);
    var newThemeBook: Themebook = {
      name: this.newThemeBookForm.value.name.toLowerCase(),
      description: this.newThemeBookForm.value.description,
      tbtype: this.newThemeBookForm.value.tbtype,
      ptagq: this.newThemeBookForm.value.ptagq,
      wtagq: this.newThemeBookForm.value.wtagq,
      improvements: [
        this.newThemeBookForm.value.improvements.imp1,
        this.newThemeBookForm.value.improvements.imp2,
        this.newThemeBookForm.value.improvements.imp3,
        this.newThemeBookForm.value.improvements.imp4,
        this.newThemeBookForm.value.improvements.imp5
      ]
    }
    console.warn(newThemeBook);
    //this.admin.replaceThemebook(newThemeBook);
    this.router.navigate(['themebooks']);
  }

  setSelected(value) {
    console.warn('Seleced value: ' + value);
    this.selectedTb = this.getTbData(value);
    console.warn('this.selectedTb');
    console.warn(this.selectedTb);
  }

  getTbData(tbname) {
    console.warn(tbname);
    return this.allTbs.find(element => {
      return element.name === tbname;
    })
  }

  getImpData(impname) {
    console.warn(impname);
    return this.selectedTb.improvements.find(element => {
      return element.name === impname;
    })
  }

  ngOnDestroy() {
    this.allTbsSub.unsubscribe();
  }

}