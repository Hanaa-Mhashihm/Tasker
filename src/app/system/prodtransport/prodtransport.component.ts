import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProdTransportEntryComponent } from './prodtransport-entry/prodtransport-entry.component';
import { ProdTransportModel } from './prodtransport.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProdTransportService } from './prodtransport.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';


@Component({
    selector: 'app-prodtransport',
    templateUrl: './prodtransport.component.html',
    styleUrls: ['./prodtransport.component.scss']
  })

export class ProdTransportComponent implements OnInit {

    displayedColumns: string[] =
        ['select', 'invoiceNo', 'regNo', 'driverName', 'productName', 'baleCount','quantity','fcy','transportCost','totalCost','totalCostSDG'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    direction!: Direction;
    transCode!: string;
    invoiceNo!: string;
    truckName!: string;
    truckModel!: string;
    regNo!: string;
    productName!: string;
    quantity!: string;
    fcy!: string;
    transportCost!: string;
    totalCost!: string;
    totalCostSDG!: string;
    baleCount!: string;
    driverName!: string;
    driverLicense!: string;
    contact1!: string;
    contact2!: string;
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

  selection = new SelectionModel<ProdTransportModel>(true, []);;
    
    model!: Send;
    clickedRows = new Set<ProdTransportModel>();
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
        private prodtransportservice: ProdTransportService,
        private titleService: Title,


      ) {
        this.pTableName = 'ProdTransport';
        this.pScreenId = 81;
        this.pTableId = 81;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Transporting goods - Tasker");
      this.refreshMe();
  }

  refreshMe() {
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.header = "Transporting goods"
        this.invoiceNo = "Invoice"
        this.transCode= "Transport code"
        this.truckName = "Truck"
        this.truckModel = "Model"
        this.regNo = "Truck"
        this.productName = "Product"
        this.quantity = "Tons"
        this.fcy = "FCY(COG)"
        this.transportCost = "Trans cost"
        this.totalCost = "Total cost"
        this.totalCostSDG = "Total cost (SDG)"
        this.baleCount = "Bale#"
        this.driverName = "Driver"
        this.driverLicense = "license"
        this.contact1 = "Contact1"
        this.contact2 = "Contact2"
        
       
        
        
        this.edit = "Edit"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.header = "نقل السلع"
        this.invoiceNo = "الفاتورة"
        this.transCode= "الكود"
        this.truckName = "الشاحنة"
        this.truckModel = "الموديل"
        this.regNo = "الشاحنة"
        this.productName = "المنتج"
        this.quantity = "الأطنان"
        this.fcy = "FCY"
        this.transportCost = "تكلفة النقل"
        this.totalCost = "التكلفة الكلية"
        this.totalCostSDG = "التكلفة الكلية (جنيه)"
        this.baleCount = "الحزم#"
        this.driverName = "السائق"
        this.driverLicense = "الرخصة"
        this.contact1 = "الهاتف1"
        this.contact2 = "الهاتف2"
        
        
        this.edit = "تعديل"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }
    this._cf.getPageData('ProdTransport', this.pScreenId, this._auth.getUserId(), this.pTableId,
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

  onSort () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd  () {
    this.model = {
      tableId: 81,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add Transporting goods");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة نقل سلعة");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.prodtransportservice.getProdTransportEntry(id).subscribe((result: ProdTransportModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number, isEditable?: boolean) => {
  //   if (isEditable){
  //     this.model = {
  //       tableId: 81,
  //       recordId: id,
  //       userId: 26,
  //       roleId: 2,
  //       languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //     };
  //     if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Transporting goods");
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
  //     }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل نقل سلعة");
  //       localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
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

  onId(id: number, row:ProdTransportModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: ProdTransportModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ProdTransportEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProdTransportEntryComponent, {
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
      const dialogRef = this.dialog.open(ProdTransportEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ProdTransportEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
