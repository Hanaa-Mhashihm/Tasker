import { Component, OnInit } from '@angular/core';
import { MatDialog   } from '@angular/material/dialog';
import { PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { BookingEntryComponent } from './booking-entry/booking-entry.component';
import { BookingModel } from './booking.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { BookingService } from './booking.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyBankBranchEntryComponent2 } from './companybankbranch-entry/companybankbranch-entry.component';
// import { BookingEntryComponent3 } from './booking-entry copy/booking-entry.component';
// import { CompanyBankEntryComponent2 } from './companybank-entry/companybank-entry.component';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
  })

export class BookingComponent implements OnInit {

    displayedColumns: string[] =
        ['select','bookingNo','costOfGoods','additionalCost','totalCostOfGoods','totalBales','totalTons','averageCostBale','averageCostTon', 'edit'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    direction!: Direction;
    bookingNo!: string;
    costOfGoods!: string;
    additionalCost!: string;
    totalCostOfGoods!: string;
    totalBales!: string;
    totalTons!: string;
    averageCostBale!: string;
    averageCostTon!: string;
    bookingDate!: string;
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
  expenses!: string;

  selection = new SelectionModel<BookingModel>(true, []);
;
    
    model!: Send;
    clickedRows = new Set<BookingModel>();
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
        private _globals: AppGlobals,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private bookingservice: BookingService,
        private titleService: Title,


      ) {
        this.pTableName = 'Booking';
        this.pScreenId = 86;
        this.pTableId = 86;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Booking - Tasker");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Booking"
      this.bookingNo = "Booking"
      this.costOfGoods = "COGs"
      this.additionalCost = "Additinal cost"
      this.totalCostOfGoods = "Total COGs"
      this.totalBales = "Total Bales"
      this.totalTons = "Total Tons"
      this.averageCostBale = "Avg cost/Bale"
      this.averageCostTon = "Avg cost/Ton"
      this.bookingDate = "Date"
     
      
      
      this.edit = "Edit"
      this.expenses = "Expenses"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الحجوزات"
      this.bookingNo = "حجز"
      this.costOfGoods = "COGs"
      this.additionalCost = "التكلفة الإضافية"
      this.totalCostOfGoods = "إجمالي COGs"
      this.totalBales = "إجمالي البالات"
      this.totalTons = "إجمالي الأطنان"
      this.averageCostBale = "Avg cost/Bale"
      this.averageCostTon = "Avg cost/Ton"
      this.bookingDate = "التاريخ"
      
      
      this.expenses = "Expenses"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('Booking', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
          console.log('data',result)

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
      tableId: 86,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Booking");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة حجز");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.bookingservice.getBookingEntry(id).subscribe((result: BookingModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  // onEdit = (id: number) => {
  //   this.model = {
  //     tableId: 86,
  //     recordId: id,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Booking");
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حجز");
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
  //   }
    
  //   this.openEntry2(this.model)
  // }

  onEdit2 =  (id: number) => {
    this.model = {
      tableId: 102,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Booking");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حجز");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }
    this.open(
      {
        model:this.model,
        bookingId: id
      }
      )
  };

  open (result:any){
    if (result === undefined) {
      const dialogRef = this.dialog.open(CompanyBankBranchEntryComponent2, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CompanyBankBranchEntryComponent2, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
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

  onId(id: number, row:BookingModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry (result: BookingModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(BookingEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(BookingEntryComponent, {
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
      const dialogRef = this.dialog.open(BookingEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(BookingEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
