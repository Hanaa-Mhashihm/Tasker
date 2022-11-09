import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProjTaskEntryComponent } from './projtask-entry/projtask-entry.component';
import { ProjTaskModel } from './projtask.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProjTaskService } from './projtask.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MyFilterComponent } from '../journalentry/operation/my-filter/my-filter.component';
import { MySortComponent } from '../journalentry/operation/my-sort/my-sort.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sources } from 'src/app/source.model';
import { ProjTaskEntryService } from './projtask-entry/projtask-entry.service';
import { UploadService } from '../upload/upload.service';

@Component({
    selector: 'app-projtask',
    templateUrl: './projtask.component.html',
    styleUrls: ['./projtask.component.scss']
  })

export class ProjTaskComponent implements OnInit {


  taskFormGroup: FormGroup;
    displayedColumns: string[] =
        ['select', 'Project', 'Task', 'Status', 'Comment', 'Assigned', 'Due', 'To', 'By', 'Phase', 'Responsible'];
        // 'projTaskId'

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    last: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }

    direction!: Direction;
    projTaskId!: string;

    Project: string;
    Task: string;
    Status: string;
    Comment: string;
    Assigned: string;
    Due: string;
    To: string;
    By: string;
    Phase: string;
    Responsible: string;

    expName!: string;
    vendor!: string;
    procDate!: string;
    amount!: string;
    miscText!: string;
  accountName!: string;
  accountType!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;

  selection = new SelectionModel<ProjTaskModel>(true, []);;
  pageData :any
  model!: Send;
  clickedRows = new Set<ProjTaskModel>();
  indexes!: any[];
  userId: any;
  res: any;
  tasks: any[] = [];
  checkAssign: any;
  isShown: boolean = false;

  breakpoint: number;
  data: Sources[];
  ver2: Sources;
  ver3: Sources;
  dropList: Sources[] = [];
  light: Sources[] = [];
  dark: Sources[] = [];
  dropItem: Sources;
  container: any[][] =[];
  checkParentAccountId!:any 
  spacezone: boolean;
  spacepoint: any;
  obj1: Sources;
  obj2: Sources
  imgHttp:string = "http://ta"

  items = [
    {'id': 1, 'name': 'Outliner'}, 
    {'id': 2, 'name': 'Green field'}, 
    {'id': 3, 'name': 'Tasker'}
  ];
  status = [
    {'id': 1, 'name': 'To do'}, 
    {'id': 2, 'name': 'Doing'}, 
    {'id': 3, 'name': 'Done'}
  ];
  assignedTo = [
    {'id': 1, 'name': 'Hanaa'}, 
    {'id': 2, 'name': 'Milesh'}, 
    {'id': 3, 'name': 'Yousif'}
  ];
  phase = [
    {'id': 1, 'name': 'Analysis'}, 
    {'id': 2, 'name': 'Develop'}, 
    {'id': 3, 'name': 'Impl'},
    {'id': 4, 'name': 'Testing'}
  ];
  responsible = [
    {'id': 1, 'name': 'External'}, 
    {'id': 2, 'name': 'Internal'}
  ];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    totalRecords: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _globals: AppGlobals,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private projtaskservice: ProjTaskService,
        private fb: FormBuilder,
        private dapiService: ProjTaskEntryService,
        private upload: UploadService,
        private dialogRef: MatDialogRef<ProjTaskEntryComponent>,
      ) {
        this.pTableName = 'ProjTask';
        this.pScreenId = 116;
        this.pTableId = 116;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
        this.userId = localStorage.getItem('userId');
        console.log('user id', this.userId)
      }

  ngOnInit() {
    this.pageData = {
      tableId: this.pTableId,
      userId: this.userId,
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
    this._cf.setSort("")
    this._cf.setFilter("")
    this.refreshMe();
    this.initForm();

  }

  initForm() {
    this.taskFormGroup = this.fb.group({
      projectName: [null, Validators.required],
      taskName: [null, Validators.required],
      statusName: [null, Validators.required],
      comment: [null, Validators.required],
      dateAssign: [null, Validators.required],
      dueDate: [null, Validators.required],
      assignedToName: [null, Validators.required],
      assignedByName: [null, Validators.required],
      categoryName: [null, Validators.required],
      responsibleName: [null, Validators.required],
    })
  }

  get taskForm() {
    return this.taskFormGroup.controls;
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Tasker"
      this.projTaskId = "projTaskId"
      this.Project = "Project"
      this.Task = "Task"
      this.Status = "Status"
      this.Comment = "Comment"
      this.Assigned = "Assigned"
      this.Due = "Due"
      this.To = "To"
      this.By = "By"
      this.Phase = "Phase"
      this.Responsible = "Responsible"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "Tasker"
      
      this.projTaskId = "projTaskId"
      this.Project = "المشروع"
      this.Task = "المهام"
      this.Status = "الحالة"
      this.Comment = "التعليقات"
      this.Assigned = "Assigned"
      this.Due = "إلى"
      this.To = "To"
      this.By = "By"
      this.Phase = "المرحلة"
      this.Responsible = "Responsible"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar

    // this._ui.loadingStateChanged.next(true);
    // this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    //       this.dataSource = new MatTableDataSource(result);
    //       this.indexes = result
    //       console.log(result)
    // })
    this._cf.getPageData('ProjTask', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          if (this._auth.getUniqueName() === 'milesh@markoncs.com' || 'omi@markoncs.com' || 's.muawia@markoncs.com') {
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = this.recordsPerPage;
            result.forEach((item: any) => {
              if(item.assignedBy == this.userId || item.assignedTo == this.userId) {
                item= item;
                this.tasks.push(item)
              }
            })
            console.log('items', this.tasks)
            this.dataSource = this.tasks;
            this.indexes = result;
            console.log('result', this.indexes);
          }else {
            var newResult = []
            for (let j = 0; j < result.length; j++) {
              if (result[j].assignedBy === Number(this._auth.getUserId()) || result[j].assignedTo === Number(this._auth.getUserId())) {
                newResult.push(result[j])
              }
            }
            this.totalRecords = newResult[0].totalRecords;
            this.recordsPerPage = this.recordsPerPage;
            this.dataSource = new MatTableDataSource(newResult);
            this.indexes = newResult
          }
         
        }
      );
    // this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
    //   this.screenRights = {
    //     amendFlag: true,
    //     createFlag: true,
    //     deleteFlag: true,
    //     editFlag: true,
    //     exportFlag: true,
    //     printFlag: true,
    //     reverseFlag: true,
    //     shortCloseFlag: true,
    //     viewFlag: true
    //   };
    // });
  }

  // checkAssigned(items: any) {
  //   items.forEach((item: any) => {
  //    this.checkAssign = item;
  //   });
  //   console.log('checkAssign', this.checkAssign)
  // }
  onClearSort() {
    this.pageData.sort = ""
    this._cf.setSort("")
    // this.invoiceservice.setFilter("")
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
    })
    this.paginator.firstPage()
  }
  
  onClearFilter() {
    this.pageData.filter = ""
    // this.invoiceservice.setSort("")
    this._cf.setFilter("")
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
    })
    this.paginator.firstPage()
  }
  onMySort  () {
    
      const dialogRef = this.dialog.open(MySortComponent, {
        disableClose: true,
        data: {
          tableId: 15,
          recordId: 0,
          userId: this.userId,
          roleId: 2,
          languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        }
      });
    
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }
  
  onMyFilter  () {

    const dialogRef = this.dialog.open(MyFilterComponent, {
        disableClose: true,
        data: {
          tableId: 15,
          recordId: 0,
          userId: this.userId,
          roleId: 2,
          languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        }
      });
    
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar
      this.pageData.recordsPerPage = event.pageSize
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords, 
        this.pageData.sort, 
        this.pageData.filter).subscribe(
          (result: any) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
      // this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        // this.pTableId, this.totalRecords).subscribe(
        //   (result: any) => {
        //     this._ui.loadingStateChanged.next(false);
        //     this.totalRecords = result[0].totalRecords;
        //     this.recordsPerPage = event.pageSize;
        //     this.dataSource = result;
            
        //   }, error => {
        //     this._ui.loadingStateChanged.next(false);
        //     this._msg.showAPIError(error);
        //     return false;
        //   });
    } catch (error:any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort  () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd () {
    this.model = {
      tableId: 116,
      recordId: 0,
      userId: this.userId,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Task");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مهمة");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.projtaskservice.getProjTaskEntry(id).subscribe((result: ProjTaskModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 116,
      recordId: id,
      userId: this.userId,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Task");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مهمة");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }
    
    // this.openEntry2(this.model)
    this.openForm(this.model)
  }

  onDelete = function(id: number) {
      
  };

 

  openEntry  (result: ProjTaskModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProjTaskEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProjTaskEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach((row:any) => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:ProjTaskModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }
  openEntry2  (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProjTaskEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProjTaskEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  addRow() {
    const newRow = {
      id: Date.now(),
      name: '',
      occupation: '',
      dateOfBirth: '',
      age: 0,
      isEdit: true,
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  onAddForm() {
    this.model = {
      tableId: 116,
      recordId: 0,
      userId: this.userId,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    this.openForm(this.model)
  }

  openForm(result: Send) {
    /* Get Form Data from API */
    
    console.log('result in add form', result);
    
    this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(result).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;

        this.data[5].access = "NoAccess"
        this.data[6].access = "NoAccess"
        this.data[7].access = "NoAccess"
        this.data[8].access = "NoAccess"
        this.data[9].access = "NoAccess"
        this.data[10].access = "NoAccess"
        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') === "Add") {
        this.data[15].value = this._auth.getUserId()
      }
      

        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
            console.log('light', this.light);
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          // if (this.dropList[k].tableColumnId === 1037) {
            for (let i = 0; i < this.dropList[k].myarray.length; i++) {
        if (this.dropList[k].myarray[i].id === Number(this.dropList[k].value)) {
          this.dropList[k].myarray2 = this.dropList[k].myarray[i].name
        }
      }
          // }
          this.container.push(res);
      });
  
        }  
      })
  }
  showForm() {
    this.isShown = true;
  }

  onParent(){}

  onResize(event:any) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : this.data[0].maxRowSize;
  }

  onSubmit() {
    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }
    }));
	
    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

     this.last.records.forEach((Object2:any)=> {
      if(Object2 && Object2.tableColumnId === 248){
        if(this.upload.imgFullPath != null) {
          Object2.value = this.imgHttp.concat(this.upload.imgFullPath.substring(this.upload.imgFullPath.indexOf('h') + 1))
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 1027){
        if(this.upload.imgApiPath != null) {
          Object2.value = this.upload.imgApiPath
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 1028){
        if(this.upload.imgExtention != null) {
          Object2.value = this.upload.imgExtention
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 1029){
        if(this.upload.imgFileName != null) {
          Object2.value = this.upload.imgFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
      // else if(Object2.tableColumnId === 15){
      //   Object2.value = this.dapiService.imgFullPath
      // }
      else if(Object2 && Object2.tableColumnId === 1031){
        if(this.upload.imgOriginalFileName != null) {
          Object2.value = this.upload.imgOriginalFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
    })

     console.log(this.last);
     this.last.records.sort(function(a:any, b:any) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });

          if(this.last.records[0].entryMode == "A"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this.dapiService.EntryA(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
              window.location.reload();
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
              window.location.reload();
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }else if(this.last.records[0].entryMode == "E"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this.dapiService.EntryE(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
              window.location.reload();
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
              window.location.reload();
            this.dialogRef.close();
            }
     
           }, error => {
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfo("خطأ!!", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }
      }

      onCancel() {
        this.dialogRef.close();
      }
  // onSubmit() {
  //   let data = this.taskFormGroup.value;
  //   console.log('data', data)
  // }

}
