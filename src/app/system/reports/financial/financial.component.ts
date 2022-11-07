import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog,   } from '@angular/material/dialog';
import { PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { AccountModel } from '../../account/account.model';
import { AccountService } from '../../account/account.service';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

  idS !: number;
  direction!: Direction;
  financialReports!: string;
  report!: string;
  from!: string;
  fetch!: string;
  to!: string;
  company!: string;
  account!: string;
  edit!: string;
  header!: string;
  submit!: string;
  cancel!: string;

  model!: Send;

  indexes!: any[];

    displayedColumns: string[] =
        ['report', 'from', 'to', 'account', 'company', 'fetch'];

    dataSource: any;
    selection = new SelectionModel<AccountModel>(true, []);;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

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
      acc!: SelectModel[];
      sub1!: SelectModel[];
      val3!: SelectModel[];
      drop5!:any
      drop2Appear:boolean=false

    constructor(
        public dialog: MatDialog,
        private _report: ReportPageService,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private accountservice: AccountService,
        public _nav: SystemNavigationComponent,
        private router: Router,
      ) {
        this.pTableName = 'Account';
        this.pScreenId = 12;
        this.pTableId = 12;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Account"
      this.financialReports = "Financial reports"
      this.report = "Report"
      this.from = "From"
      this.to = "To"
      this.fetch = "Fetch"
      this.account = "Account"
      this.company = "Group"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الحسابات"
      this.financialReports = "التقارير المالية"
      this.report = "التقرير"
      this.from = "من"
      this.to = "الى"
      this.fetch = "تحضير"
      this.account = "الحساب"
      this.company = "المجموعة"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }

    // this._ui.loadingStateChanged.next(true)
    this._select.getDropdown("accountid", "account", "concat(accountname,':',accountcode)", "active=1 and deleted=0 and accountid>1", false).subscribe((res: SelectModel[]) => {
      console.log("drop3: ", res);
      this.acc = res;
      this.beforAfterThat()
    });

    
    // this._cf.getPageData('Account', this.pScreenId, this._auth.getUserId(), this.pTableId,
    //   this.recordsPerPage, this.currentPageIndex, false).subscribe(
    //     (result) => {
    //       this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    
          


      //   }
      // );

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

  beforAfterThat(){
    this._select.getDropdown("miscdetailid", "miscdetail", "misctext", "miscid=31", false).subscribe((res: SelectModel[]) => {
      console.log("drop3: ", res);
      this.sub1=res
      this.afterThat()
    })
  }

  afterThat(){//http://greenfieldapi.autopay-mcs.com/api/ddl/getdropdown/miscdetailid/miscdetail/misctext/miscid=31/false
    this._select.getDropdown("syscompid", "syscomp", "businessname", "active=1 and deleted=0 and syscompid>1", false).subscribe((res: SelectModel[]) => {
    console.log("drop: ", res);
    var copm: SelectModel[] = res
    this._ui.loadingStateChanged.next(false)
    var Tdate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      var src = [
        {report: "Account summary", account: 148 , value2:this.acc, fromDate: Tdate, toDate: Tdate, companyAppear: false, accountAppear: true, inSub:false},
        {report: "Account summary (company-wise)", company: 2, value: copm, account: 148 ,  value2:this.acc, fromDate: Tdate , toDate: Tdate, companyAppear: true, accountAppear: true, inSub:false},
        {report: "Sub-account", account: 0, value2: this.sub1,value3:this.val3, accountDrop2:1, fromDate: Tdate, toDate: Tdate, companyAppear: true, accountAppear: true, inSub:true, drop2Appear: this.drop2Appear},
        {report: "Trial balance", fromDate: Tdate, toDate: Tdate, companyAppear: false, accountAppear: false, inSub:false },
        {report: "Trial balance (company)", company: 2, value: copm, fromDate: Tdate, toDate: Tdate, companyAppear: true, accountAppear: false, inSub:false },
        
        
      ]
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      var src = [
        {report: "ملخص الحساب", account: 148 , value2:this.acc, fromDate: Tdate, toDate: Tdate, companyAppear: false, accountAppear: true, inSub:false},
        {report: "ملخص الحسابات (الشركة)", company: 2, value: copm, account: 148 ,  value2:this.acc, fromDate: Tdate , toDate: Tdate, companyAppear: true, accountAppear: true, inSub:false},
        {report: "Sub-account", account: 0, value2: this.sub1,value3:this.val3, accountDrop2:1, fromDate: Tdate, toDate: Tdate, companyAppear: true, accountAppear: true, inSub:true, drop2Appear: this.drop2Appear },
        {report: "ميزان المراجعة", fromDate: Tdate, toDate: Tdate, companyAppear: false, accountAppear: false, inSub:false },
        {report: "ميزان المراجعة (الشركة)", company: 2, value: copm, fromDate: Tdate, toDate: Tdate, companyAppear: true, accountAppear: false, inSub:false },
        
        
      ]
    }
          this.dataSource = new MatTableDataSource(src!);
    
  });}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  subTypeChange(value:any){
    console.log(value);
    this.drop2Appear=true
    if (value=== 31002){//customer
      this._ui.loadingStateChanged.next(true)
      this._select.getDropdown("customerid", "customer", "customername", "active=1 and deleted=0 and customerid>1", false).subscribe((res: SelectModel[]) => {
        this.val3=res
        this._ui.loadingStateChanged.next(false)
        console.log("drop4: ", res);
        console.log(this.val3);
        
        // this.afterThat()
      })
    }else if (value=== 31003){//partner
      this._ui.loadingStateChanged.next(true)
      this._select.getDropdown("shareholderid", "shareholder", "shname", "active=1 and deleted=0 and shareholderid>1", false).subscribe((res: SelectModel[]) => {
        this.val3=res
        this._ui.loadingStateChanged.next(false)
        console.log("drop5: ", res);
        // this.afterThat()
      })
      
    }else if (value=== 31001){//supplier
      this._ui.loadingStateChanged.next(true)
      this._select.getDropdown("supplierid", "supplier", "suppliername", "active=1 and deleted=0 and supplierid>1", false).subscribe((res: SelectModel[]) => {
        this.val3=res
        this._ui.loadingStateChanged.next(false)
        console.log("drop6: ", res);
        // this.afterThat()
      })
      
    }
    
  }

  onResults(row:any, e:any) {
    row.account= e
    console.log('ee',e);
    this.subTypeChange(e)
    // this.light.forEach((res:any) => {
    //   if (res.tableColumnId === id) {
    //     console.log('ee', e);
        
    //     res.value = e.toString()
    //     // if(res.tableColumnId === 195) {
    //     //   this.onChangeValue(res.value)
    //     // }
        
    //   }
    // })
  }

  onReport(report: string,fromDate: Date, toDate:Date, company: number, account: number, accountDrop2:number) { 
    var reportId: number
    let restOfUrl: string; 
    if (report == "Account summary") {
      reportId = 4;
      restOfUrl = 'account=' + account; 
      restOfUrl = restOfUrl + '&from=' + fromDate; 
      restOfUrl = restOfUrl + '&to=' + toDate; 
    }else if (report == "Account summary (company-wise)") {
      reportId = 5; 
      restOfUrl = 'account=' + account; 
      restOfUrl = restOfUrl + '&company=' + company;
      restOfUrl = restOfUrl + '&from=' + fromDate; 
      restOfUrl = restOfUrl + '&to=' + toDate; 
    }
    else if (report == "Trial balance") {
      reportId = 6; 
      restOfUrl = 'from=' + fromDate; 
      restOfUrl = restOfUrl + '&to=' + toDate; 
    }
    else if (report == "Trial balance(company)") {
      reportId = 7; 
      restOfUrl = 'from=' + fromDate; 
      restOfUrl = restOfUrl + '&to=' + toDate; 
      restOfUrl = restOfUrl + '&company=' + company;
    }
    else if (report == "Sub-account") {
      reportId = 9; 
      restOfUrl = 'from=' + fromDate; 
      restOfUrl = restOfUrl + '&to=' + toDate; 
      restOfUrl = restOfUrl + '&accounttype=' + account;
      restOfUrl = restOfUrl + '&subaccount=' + accountDrop2;
    }
    
    console.log(restOfUrl!)
    this._report.passReportData({ reportId: reportId!, restOfUrl: restOfUrl! }); 
    this._nav.onClickListItem('FRP');
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

  // onAdd = function () {
  //   this.model = {
  //     tableId: 12,
  //     recordId: 0,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add account");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة حساب");
  //   }
    
  //   this.openEntry2(this.model);
  // };

  onView = (id: number) => {
  //   this._ui.loadingStateChanged.next(true);
  //   this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
  //     this._ui.loadingStateChanged.next(false);
  //     result.entryMode = 'V';
  //     result.readOnly = true;
  //     this.openEntry(result);
  //   });
  }

  // onEdit = (id: number) => {
  //   // this._ui.loadingStateChanged.next(true);
  //   // this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
  //   //   this._ui.loadingStateChanged.next(false);
  //   //   result.entryMode = 'E';
  //   //   result.readOnly = false;
  //   //   this.openEntry(result);
  //   // });

  //   this.model = {
  //     tableId: 12,
  //     recordId: id,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit account");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حساب");
  //   }
    
  //   this.openEntry2(this.model)


  // }

  onDelete = function(id: number) {

  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row:any) => this.selection.select(row));
  }

  onId() {
    this.selection.selected.forEach(function(item){
      console.log(item.accountId)
    })
  }

  // openEntry = function (result: AccountModel) {
  //   if (result === undefined) {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'custom-dialog',
  //       data: {}
  //     });
  //   } else {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'custom-dialog',
  //       data: result
  //     });
  //   }
  //   this.dialogRef.afterClosed().subscribe(() => {
  //     this.refreshMe();
  //   });
  // };
  // openEntry2 = function (result: Send) {
  //   if (result === undefined) {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       data: {}
  //     });
  //   } else {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       data: result
  //     });
  //   }
  //   this.dialogRef.afterClosed().subscribe(() => {
  //     this.refreshMe();
  //   });
  // };

}
