import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProcExpenseEntryComponent } from './procexpense-entry/procexpense-entry.component';
import { ProcExpenseModel } from './procexpense.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProcExpenseService } from './procexpense.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AppGlobals } from 'src/app/app.global';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';

@Component({
    selector: 'app-procexpense',
    templateUrl: './procexpense.component.html',
    styleUrls: ['./procexpense.component.scss']
  })

export class ProcExpenseComponent implements OnInit {

    displayedColumns: string[] =
        ['select','expName'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    direction!: Direction;
    expName!: string;
  accountName!: string;
  accountType!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;

  selection = new SelectionModel<ProcExpenseModel>(true, []);;
    
    model!: Send;
    clickedRows = new Set<ProcExpenseModel>();
    indexes!: any[];

    totalRecords!: number;
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
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private procexpenseservice: ProcExpenseService,
        private titleService: Title,
      ) {
        this.pTableName = 'ProcExpense';
        this.pScreenId = 78;
        this.pTableId = 78;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Procurement expense list - Tasker");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Procurement expense list"
      this.expName = "Expenses"
      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "قائمة حساب المشتريات"
      this.expName = "قائمة المصروفات"
      
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('ProcExpense', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result

        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
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
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
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

  onAdd  () {
    this.model = {
      tableId: 78,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Procurement expense list");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة قائمة حساب شراء");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.procexpenseservice.getProcExpenseEntry(id).subscribe((result: ProcExpenseModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 78,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Procurement expense list");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل قائمة حساب شراء");
    }
    
    this.openEntry2(this.model)
  }

  onDelete = function(id: number) {
      
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

  onId(id: number, row:ProcExpenseModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: ProcExpenseModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProcExpenseEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProcExpenseEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openEntry2  (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProcExpenseEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProcExpenseEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
