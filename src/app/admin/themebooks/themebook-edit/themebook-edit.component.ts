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
      this.isLoading = false;
      //this.newThemeBookForm.controls['tbtype'].disable();
    })
  }

  setFormDefaults(tb) {
    this.newThemeBookForm = this.fb.group({
      tbtype: [tb.tbtype],
      name: [tb.name],
      description: [tb.description],
      ptagq: this.fb.group({
        A: [tb.ptagq.A],
        aXmp: [tb.ptagq.aXmp],
        B: [tb.ptagq.B],
        bXmp: [tb.ptagq.bXmp],
        C: [tb.ptagq.C],
        cXmp: [tb.ptagq.cXmp],
        D: [tb.ptagq.D],
        dXmp: [tb.ptagq.dXmp],
        E: [tb.ptagq.E],
        eXmp: [tb.ptagq.eXmp],
        F: [tb.ptagq.F],
        fXmp: [tb.ptagq.fXmp],
        G: [tb.ptagq.G],
        gXmp: [tb.ptagq.gXmp],
        H: [tb.ptagq.H],
        hXmp: [tb.ptagq.hXmp],
        I: [tb.ptagq.I],
        iXmp: [tb.ptagq.iXmp],
        J: [tb.ptagq.J],
        jXmp: [tb.ptagq.jXmp],
      }),
      wtagq: this.fb.group({
        A: [tb.wtagq.A],
        aXmp: [tb.wtagq.aXmp],
        B: [tb.wtagq.B],
        bXmp: [tb.wtagq.bXmp],
        C: [tb.wtagq.C],
        cXmp: [tb.wtagq.cXmp],
        D: [tb.wtagq.D],
        dXmp: [tb.wtagq.dXmp],
      }),
      improvements: this.fb.group({
        imp1: this.fb.group({
          name: [tb.improvements[0].name],
          description: [tb.improvements[0].description]
        }),
        imp2: this.fb.group({
          name: [tb.improvements[1].name],
          description: [tb.improvements[1].description]
        }),
        imp3: this.fb.group({
          name: [tb.improvements[2].name],
          description: [tb.improvements[2].description]
        }),
        imp4: this.fb.group({
          name: [tb.improvements[3].name],
          description: [tb.improvements[3].description]
        }),
        imp5: this.fb.group({
          name: [tb.improvements[4].name],
          description: [tb.improvements[4].description]
        }),
      })
    });
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
    this.admin.replaceThemebook(newThemeBook);
    this.router.navigate(['themebooks']);
  }

  setSelected(value) {
    this.selectedTb = this.getTbData(value);
    this.setFormDefaults(this.selectedTb);
  }

  getTbData(tbname) {
    return this.allTbs.find(element => {
      return element.name === tbname;
    })
  }

  getImpData(impname) {
    return this.selectedTb.improvements.find(element => {
      return element.name === impname;
    })
  }

  ngOnDestroy() {
    this.allTbsSub.unsubscribe();
  }

}