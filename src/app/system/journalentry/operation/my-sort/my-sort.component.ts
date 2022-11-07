import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppGlobals } from 'src/app/app.global';

import { Send } from 'src/app/send.model';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { FilterService } from 'src/app/components/filter/filter.service';
import { CommonService } from 'src/app/components/common/common.service';
import { SortingModel } from '../../journalentry.model';
import { Direction } from '@angular/cdk/bidi';


@Component({
  selector: 'app-my-sort',
  templateUrl: './my-sort.component.html',
  styleUrls: ['./my-sort.component.scss']
})
export class MySortComponent implements OnInit {

  submit!: string;
    cancel!: string;
    direction!: Direction;
    header!: string;

    forDB: string = ""

    pageData: any

  done!: SortingModel[]

  choices = [
    {id:0,name:'None'},
    {id:1,name:'asc'},
    {id:2,name:'desc'}
  ]

  constructor(
    private dialogRef: MatDialogRef<MySortComponent>,
    @Inject(MAT_DIALOG_DATA) public pModel: Send,
    private _ui: UIService,
    private _globals: AppGlobals,
    private _cf: CommonService
  ) { }

  ngOnInit() {
    console.log(this.pModel);
    
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Apply"
      this.cancel = "Cancel"
      this.header = "Sorting"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "تطبيق"
      this.cancel = "الغاء"
      this.header = "تنظيم"
     

    }
    this.pageData = {
      tableId: this.pModel.tableId,
      userId: this.pModel.userId,
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
    this._ui.loadingStateChanged.next(true);
    this._cf.getSort(this.pageData.tableId).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      console.log(result);
      this.done = result
      this.done.forEach((beju) => {
        beju.array = this.choices
        beju.value = 'None'
      })

      
    })
    // this.done = [
    //   {displayName: 'Name', databaseName: 'dataName', array: null, value: null},
    //   {displayName: 'Address', databaseName: 'dataAddress', array: null, value: null},
    //   {displayName: 'Currency', databaseName: 'dataCurrency', array: null, value: null}
    // ];

    this.done.forEach((beju) => {
      beju.array = this.choices
      beju.value = 'None'
    })
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  onApply() {
    this.forDB = ""
    console.log(this.done);
    for (let i = 0; i < this.done.length; i++) {
      if (this.done[i].value != "None") {
        this.forDB += (',' + this.done[i].code + " " + this.done[i].value )
      }
    }
    this.forDB = this.forDB.substring(this.forDB.indexOf(',') + 1)
    
    console.log(this.forDB);
    this._cf.setSort(this.forDB)
    this.dialogRef.close();
    
    
  }
  onCancel() {
    this.dialogRef.close();
  }


}

