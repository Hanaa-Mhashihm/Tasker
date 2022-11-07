import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProdTransProdEntryComponent } from './prodtransprod-entry/prodtransprod-entry.component';
import { ProdTransProdModel } from './prodtransprod.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProdTransProdService } from './prodtransprod.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
// import { BookContProdEntryComponent } from '../bookcontprod/bookcontprod-entry/bookcontprod-entry.component';
import { BookContProdEntry2Component } from './bookcontprod-entry/bookcontprod-entry.component';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-prodtransprod',
    templateUrl: './prodtransprod.component.html',
    styleUrls: ['./prodtransprod.component.scss']
  })

export class ProdTransProdComponent implements OnInit {

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
  selection = new SelectionModel<ProdTransProdModel>(true, []);;

  model!: Send;
  transCode!:string;
  productName!:string;
  regNo!:string;
  baleCount!:string;
  baleLoaded!:string;
  baleRemaining!:string;
  addToContainer!:string;
  invoiceNo!:string;

  clickedRows = new Set<ProdTransProdModel>();

    displayedColumns: string[] =
        ['select', 'invoiceNo', 'regNo', 'productName', 'baleCount', 'baleLoaded', 'baleRemaining', 'addToContainer'];

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

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _globals: AppGlobals,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private prodtransprodservice: ProdTransProdService,
        private titleService: Title,


      ) {
        this.pTableName = 'ProdTransProd';
        this.pScreenId = 82;
        this.pTableId = 82;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Transported goods - Tasker");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Transported goods"
      this.transCode = "Transport"
      this.productName = "Product"
      this.regNo = "Truck"
      this.baleCount = "Bale"
      this.baleLoaded = "Loaded"
      this.baleRemaining= 'Remaining'
      this.invoiceNo= 'Invoice'
      this.addToContainer = "Add to container"
    //  this.nameT = "Name"
    //  this.amount = "Amount"
    //  this.statusT = "Status"
      this.edit = "Edit"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "البضائع المنقولة"
      this.transCode = "النقل"
      this.productName = " المنتج"
      this.regNo = "الشاحنة"
      this.baleCount = "الحزم"
      this.baleLoaded = "المحملة"
      this.baleRemaining= 'المتبقية'
      this.invoiceNo= 'الفاتورة'
      this.addToContainer = "اضافة الى الحاوية"
    //   this.nameT = "الاسم"
    //  this.amount = "المبلغ"
    //  this.statusT = "الحالة"
      this.edit = "تعديل"
      
    }

    this._cf.getPageData('ProdTransProd', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
          console.log(result)
          
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

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.prodtransprodservice.getProdTransProdEntry(id).subscribe((result: ProdTransProdModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {
      
  };

  onEdit = (id: number) => {
  //   this.model = {
  //     tableId: 88,
  //     recordId: id,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit container loading");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل تحميل حاويات");
  //   }
    
  //   this.openEntry2(this.model)
  } 

  onAddContainer  (id1:number ,id2:number) {
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit transported goods");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل البضائع المنقولة");
      }
    if (id1 === undefined) {
      const dialogRef = this.dialog.open(BookContProdEntry2Component, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(BookContProdEntry2Component, {
        disableClose: true,
        
        data: {
          prodTransProdId:id1,
          productId:id2,
          array:{
            tableId: 88,
            recordId: 0,
            userId: 26,
            roleId: 2,
            languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
          }
        }
        
      });
      console.log( {
        prodTransProdId:id1,
        productId:id2,
        array:{
          tableId: 88,
          recordId: 0,
          userId: 26,
          roleId: 2,
          languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
        }
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

  onId(id: number, row:ProdTransProdModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: ProdTransProdModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProdTransProdEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProdTransProdEntryComponent, {
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
      const dialogRef = this.dialog.open(ProdTransProdEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProdTransProdEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
