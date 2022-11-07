import { Component, OnInit } from '@angular/core';
import { MatDialog,   } from '@angular/material/dialog';
import { PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CustOpenEntryComponent } from './custopen-entry/custopen-entry.component';
import { CustOpenModel } from './custopen.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { CustOpenService } from './custopen.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AppGlobals } from 'src/app/app.global';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-custopen',
    templateUrl: './custopen.component.html',
    styleUrls: ['./custopen.component.scss']
  })

export class CustOpenComponent implements OnInit {

  model!: Send;
  idS! : number;
  direction!: Direction;
  edit!: string;
  header!: string;
  custOpenId!: string;
  submit!: string;
  cancel!: string;
    displayedColumns: string[] =
        ['select', 'custOpenId'];

    dataSource: any;
    clickedRows = new Set<CustOpenModel>();
    selection = new SelectionModel<CustOpenModel>(true, []);;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
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
        private _globals: AppGlobals,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private custopenservice: CustOpenService,
        private titleService: Title,


      ) {
        this.pTableName = 'CustOpen';
        this.pScreenId = 94;
        this.pTableId = 94;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Customer opening balance - Tasker");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Customer opening balance"
      this.custOpenId = "custOpenId"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الرصيد الافتتاحي للعميل"
      this.custOpenId = "custOpenId"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('CustOpen', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);

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
      tableId: 94,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Customer opening balance");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة الرصيد الافتتاحي للعميل");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.custopenservice.getCustOpenEntry(id).subscribe((result: CustOpenModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 94,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Customer opening balance");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل الرصيد الافتتاحي للعميل");
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

  onId(id: number, row:CustOpenModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: CustOpenModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CustOpenEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CustOpenEntryComponent, {
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
      const dialogRef = this.dialog.open(CustOpenEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CustOpenEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
