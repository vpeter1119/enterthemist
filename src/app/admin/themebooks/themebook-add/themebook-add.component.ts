import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Themebook } from '../themebook.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-themebook-add',
  templateUrl: './themebook-add.component.html',
  styleUrls: ['./themebook-add.component.css']
})
export class ThemebookAddComponent implements OnInit {

  newTb;

  newThemeBookForm = this.fb.group({
    tbtype: [''],
    name: [''],
    ptagq: this.fb.group({
      A: [''],
      B: [''],
      C: [''],
      D: [''],
      E: [''],
      F: [''],
      G: [''],
      H: [''],
      I: [''],
      J: [''],
    }),
    wtagq: this.fb.group({
      A: [''],
      B: [''],
      C: [''],
      D: [''],
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
  ) { }

  ngOnInit() {
    this.newTb = {};
  }

  onSubmit() {
    console.warn(this.newThemeBookForm.value);
    var newThemeBook = {
      name: this.newThemeBookForm.value.name.toLowerCase(),
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
    this.admin.addNewThemebook(newThemeBook);
    this.newThemeBookForm.reset();
  }

}