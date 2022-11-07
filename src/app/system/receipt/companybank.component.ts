import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CompanyBankEntry3Component,  } from './companybank-entry/companybank-entry.component';
import { CompanyBankModel } from './companybank.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { CompanyBankService } from './companybank.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { SystemNavigationComponent } from '../system-navigation/system-navigation.component';

@Component({
    selector: 'app-receipt',
    templateUrl: './companybank.component.html',
    styleUrls: ['./companybank.component.scss']
  })

export class ReceiptComponent implements OnInit {

  model!: Send;
  idS !: number;
  direction!: Direction;
  customerCode!: string;
  customerName!: string;
  customerMobile!: string;
  balance!: string;
  edit!: string;
  header!: string;
  bankName!:string;
  receiptId!:string;
  submit!: string;
  cancel!: string;

  receiptCode:string
  recDate:string
  recFrom:string
  amount:string
    displayedColumns: string[] =
        [ 'select','receiptCode','recDate','recFrom', 'amount', 'report'];

    dataSource: any;
    clickedRows = new Set<any>();
    selection = new SelectionModel<any>(true, []);;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    indexes!: any[];
    report:string;

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
        private _report: ReportPageService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        public _nav: SystemNavigationComponent,
        private _auth: AuthService,
        private _select: SelectService,
        private companybankservice: CompanyBankService,
        private titleService: Title,
      ) {
        this.pTableName = 'receipt';
        this.pScreenId = 105;
        this.pTableId = 105;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Receipt - Tasker");
      this.refreshMe();
  }

  refreshMe() {

    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Receipt"
      this.receiptCode = "Receipt Code"
      this.recDate = "Date"
      this.recFrom = "From"
      this.amount = "Amount"
      // this.accountCode = "Account Code"
      // this.accountName = "Account Name"
      // this.accountType = "Account Type"
      this.balance = "Balance"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.report = "Report"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الاستلام"
      this.receiptId = "receiptId"
      this.receiptCode = "كود الاستلام"
      this.recDate = "التاريخ"
      this.recFrom = "من"
      this.amount = "الكمية"
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
      this.balance = "الحساب"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.report = "تقرير "
    }
    this._cf.getPageData('receipt', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          console.log(result);
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

  onAdd () {
    this.model = {
      tableId: 105,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add receipt");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة استلام");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.companybankservice.getCompanyBankEntry(id).subscribe((result: any) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 105,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit receipt");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل استلام");
    }
    
    this.openEntry2(this.model)
  }

  onDelete = function(id: number) {
      
  };

  onReport(rowId:number) { 
    var reportId: number
    reportId = 10
    // if (report == "Expense") {
    //    reportId = 3; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Revenue") {
    //  reportId = 4; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }else if (report == "Rev vs. Exp") {
    //   reportId = 5; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    // }
    
    let restOfUrl: string; 
    restOfUrl = 'receiptid=' + rowId; 
     
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    this._nav.onClickListItem('FRP');
  }

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

  onId(id: number, row:any) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }
  openEntry  (result: any) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CompanyBankEntry3Component, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CompanyBankEntry3Component, {
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
      const dialogRef = this.dialog.open(CompanyBankEntry3Component, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CompanyBankEntry3Component, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
