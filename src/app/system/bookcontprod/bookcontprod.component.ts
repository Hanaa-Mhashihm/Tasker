import { Component, OnInit } from '@angular/core';
import { MatDialog   } from '@angular/material/dialog';
import { PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { BookContProdEntryComponent } from './bookcontprod-entry/bookcontprod-entry.component';
import { BookContProdModel } from './bookcontprod.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { BookContProdService } from './bookcontprod.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AppGlobals } from 'src/app/app.global';
import { ContWareEntryEntryComponent } from './contwareentry-entry/contwareentry-entry.component';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-bookcontprod',
    templateUrl: './bookcontprod.component.html',
    styleUrls: ['./bookcontprod.component.scss']
  })

export class BookContProdComponent implements OnInit {

  idS !: number;
  direction!: Direction;
  customerCode!: string;
  customerName!: string;
  customerMobile!: string;
  balance!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;
  selection = new SelectionModel<BookContProdModel>(true, []);;

  model!: Send;
  bookContProdId!:string;
  containerNo!:string;
  productName!:string;
  baleCount!: string
  sold!:string;
  remaining!:string;
  totalTon!:string;
  totalCost!:string;
  addStock!: string

  clickedRows = new Set<BookContProdModel>();

    displayedColumns: string[] =
        ['select', 'containerNo', 'productName', 'baleCount', 'totalTon', 'totalCost'];

    dataSource: any;
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
  // selection: any;
  // clickedRows: any;
  // model: { tableId: number; recordId: number; userId: number; roleId: number; languageId: number; };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private bookcontprodservice: BookContProdService,
        private titleService: Title,


      ) {
        this.pTableName = 'BookContProd';
        this.pScreenId = 88;
        this.pTableId = 88;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Container loading - Tasker");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Container loading"
      this.bookContProdId = "bookContProdId"
      this.containerNo = "Container"
      this.productName = "Product"
      this.baleCount = "Bale"
      this.sold = "Sold"
      this.remaining = "Remaining"
      this.totalTon = "Total tonnes"
      this.totalCost = "Total cost(USD)"
      this.addStock = "Add stock"
    //  this.nameT = "Name"
    //  this.amount = "Amount"
    //  this.statusT = "Status"
      this.edit = "Edit"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "منتجات الحاويات "
      this.bookContProdId = "اسم البنك"
      this.containerNo = "الحاوية"
      this.productName = "المنتج"
      this.baleCount = "الحزم"
      this.sold = "المبيعة"
      this.remaining = "المتبقية"
      this.totalTon = "الاطنان الكلية"
      this.totalCost = "التكلفة الكلية(USD)"
      this.addStock = "Add stock"
    //   this.nameT = "الاسم"
    //  this.amount = "المبلغ"
    //  this.statusT = "الحالة"
      this.edit = "تعديل"
      
    }
    this._cf.getPageData('BookContProd', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes= result
          console.log(result);
          

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
    console.log(this.bookContProdId)
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

  // onAdd() {
  //   this.model = {
  //     tableId: 88,
  //     recordId: 0,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add container loading");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة تحميل الحاويات");
  //   }

    
  //   this.openEntry2(this.model);
  // };

  
  onAddStock  (id: number) {
    console.log(id);
    
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add container loading");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "إضافة تحميل حاويات");
      }
    if (id === undefined) {
      const dialogRef = this.dialog.open(ContWareEntryEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ContWareEntryEntryComponent, {
        disableClose: true,
        
        data: {BookContProdId:id,
          array:{
              tableId: 92,
              recordId: 0,
              userId: 26,
              roleId: 2,
              languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
            }
          }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };
  
  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.bookcontprodservice.getBookContProdEntry(id).subscribe((result: BookContProdModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number, isEditable?: boolean) => {
  //   if (isEditable){
  //     this.model = {
  //       tableId: 88,
  //       recordId: id,
  //       userId: 26,
  //       roleId: 2,
  //       languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //     };
  //     if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit container loading");
  //     }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل تحميل حاويات");
  //     }
      
  //     this.openEntry2(this.model)
  //   }
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

  onId(id: number, row:BookContProdModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: BookContProdModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(BookContProdEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(BookContProdEntryComponent, {
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
      const dialogRef = this.dialog.open(BookContProdEntryComponent, {
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
      const dialogRef = this.dialog.open(BookContProdEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
