import { Direction } from '@angular/cdk/bidi';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { FilterService } from 'src/app/components/filter/filter.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { FilteringModel } from '../../journalentry.model';


@Component({
  selector: 'app-my-filter',
  templateUrl: './my-filter.component.html',
  styleUrls: ['./my-filter.component.scss']
})
export class MyFilterComponent implements OnInit {

  submit!: string;
    cancel!: string;
    direction!: Direction;
    header!: string;

    forDB: string = ""

    pageData :any

  done!: FilteringModel[]

  

  choices1 = [
    {id:0,name:'None'},
    {id:1,name:'>'},
    {id:2,name:'<'},
    {id:3,name:'='},
    {id:4,name:'between'}
  ]
  choices2 = [
    {id:0,name:'None'},
    {id:1,name:'Contains'},
  ]

  constructor(
    private dialogRef: MatDialogRef<MyFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public pModel: Send,
    private _globals: AppGlobals,
    private _ui: UIService,
    private _cf: CommonService
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Apply"
      this.cancel = "Cancel"
      this.header = "Filtering"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "تطبيق"
      this.cancel = "الغاء"
      this.header = "تصفية"
     

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
    this._cf.getFilter(this.pageData.tableId).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      console.log(result);
      this.done = result
      this.done.forEach((beju:any) => {
        beju.array1 = this.choices1
        beju.array2 = this.choices2
        beju.operation = 'None'
        beju.permission1 =  false
        beju.permission2 = false
        beju.value1 = null
        beju.value2 = null
      })

    })
    // this.done = [
    //   {displayName: 'Name', type: 'text' , databaseName: 'dataName', array1: null, array2: null, operation: null, permission1: false, permission2: false, value1: null, value2: null},
    //   {displayName: 'Address', type: 'number' , databaseName: 'dataAddress', array1: null, array2: null, operation: null, permission1: false, permission2: false, value1: null, value2: null},
    //   {displayName: 'Currency', type: 'date' , databaseName: 'dataCurrency', array1: null, array2: null, operation: null, permission1: false, permission2: false,  value1: null, value2: null}
    // ];

    // this.done.forEach((beju) => {
    //   beju.array1 = this.choices1
    //   beju.array2 = this.choices2
    //   beju.operation = 'None'
    // })
  }


  onNumDate(choice: string, id:number){
    if (choice == ">") {
      this.done[id].permission1 = true
    } else if (choice == "<") {
      this.done[id].permission1 = true
    }else if (choice == "=") {
      this.done[id].permission1 = true
    }else if (choice == "between") {
      this.done[id].permission1 = true
      this.done[id].permission2 = true
    }else {
      this.done[id].permission1 = false
      this.done[id].permission2 = false
      this.done[id].value1 = null
      this.done[id].value2 = null
    }
    
  }

  onText(choice: string, id: number){
    if (choice == "Contains") {
      this.done[id].permission1 = true
    } else {
      this.done[id].permission1 = false
      this.done[id].value1 = null
    }
    
  }

  onApply() {
    this.forDB = ""
    console.log(this.done);
    for (let i = 0; i < this.done.length; i++) {
      if (this.done[i].operation != "None") {
        if (this.done[i].operation != "between") {
          if (this.done[i].frontEndType == "Number") {
          this.forDB += (' and ' + this.done[i].columnName + " " + this.done[i].operation + " " + this.done[i].value1 )
          }else if(this.done[i].frontEndType == "Text"){
            this.forDB += (' and ' + this.done[i].columnName +" " +'like'+" " + "'%" + this.done[i].value1+ "%'" )
          }else if(this.done[i].frontEndType == "Date"){
            this.forDB += (' and ' + this.done[i].columnName + " " + this.done[i].operation + " " + "'" + this.done[i].value1+ "'" )
          }
        }else if(this.done[i].operation == "between") {
          if(this.done[i].frontEndType == "Number") {
          this.forDB += (' and ' + this.done[i].columnName + " " + this.done[i].operation + " " + this.done[i].value1 + ' and ' + this.done[i].value2)
        }else {
          this.forDB += (' and ' + this.done[i].columnName + " " + this.done[i].operation + " " + "'"+ this.done[i].value1 + "'" + ' and ' + "'"+ this.done[i].value2 + "'")
        }
      }
      }
    }
    this.forDB = this.forDB.substring(this.forDB.indexOf('d') + 1)
    this.forDB = this.forDB.substring(this.forDB.indexOf(' ') + 1)
    
    console.log(this.forDB);
    this._cf.setFilter(this.forDB)
    this.dialogRef.close();
    
  }
  onCancel() {
    this.dialogRef.close();
  }

}
