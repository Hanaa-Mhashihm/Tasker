import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CompanyBankBranchModel } from '../companybankbranch.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
// import { CompanyBankBranchService } from '../companybankbranch.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Sources } from 'src/app/source.model';
import { Send } from 'src/app/send.model';
import { CompanyBankBranchEntryService } from './companybankbranch-entry.service';
import { CompanyBankBranchService } from '../../AnotherComponents/companybankbranch/companybankbranch.service';
import { CompanyBankBranchEntryComponent } from '../../AnotherComponents/companybankbranch/companybankbranch-entry/companybankbranch-entry.component';
import { Direction } from '@angular/cdk/bidi';
import { MatTableDataSource } from '@angular/material/table'
import { BookExpListModel } from '../booking.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-companybankbranch-entry',
  templateUrl: './companybankbranch-entry.component.html',
  styleUrls: ['./companybankbranch-entry.component.scss']
})


export class CompanyBankBranchEntryComponent2 implements OnInit {
    url!: string;
    checkParentAccountId!:any
    model: Send = {
      tableId: 102,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    last: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: this._auth.getUserId(),
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
  
    }
    myFormGroup!: FormGroup;
  
    breakpoint!: number;
    checked= false;
    checkedR = false;
    disabled = false;
    sources: Sources[] = [];
    res: any;
    spacepoint: any;
    spacezone!: boolean;
    data!: Sources[];
    ver!: Sources;
    maxSize!: number;
    submit!: string;
    cancel!: string;
    expType!: string;
    supplier!: string;
    currency!: string;
    expDate!: string;
    forexRate!: string;
    amount!: string;
    delete!: string;
    inUSD!: string;
    inAED!: string;
    inSDG!: string;
    totalAddCost!: string;
    usdValue!: string;
    aedValue!: string;
    sdgValue!: string;
    
        
  displayedColumns: string[] = ['expType', 'supplier', 'currency', 'expDate', 'forexRate', 'amount', 'delete'];

  
    ELEMENT_DATA!: any[] 

    light: Sources[] = [];
    dark: Sources[] = [];
  
    ver2!: Sources;
    ver3!: Sources;
    ver4!: Sources;
    obj1!: Sources;
    obj2!: Sources;
  
    direction!: Direction;
  
    dropItem!: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string|null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];
    dataSource!:any
    suppOption!:any
    currOption!:any


  constructor(
    private dapiService: CompanyBankBranchEntryService,
    private _globals: AppGlobals,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: CompanyBankBranchService,
      private dialogRef: MatDialogRef<CompanyBankBranchEntryComponent2>,
      @Inject(MAT_DIALOG_DATA) public pModel: any
  ) { }

  ngOnInit() {
  // setTimeout(()=>{
  //   console.log('this.ELEMENT_DATA',this.ELEMENT_DATA);
  // },10000)
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.expType = "Expense"
        this.supplier = "Supplier"
        this.currency = "Currency"
        this.expDate = "Date"
        this.forexRate = "Rate"
        this.amount = "Amount"
        this.delete = "Delete"
        this.inUSD = "USD"
        this.inAED = "AED"
        this.inSDG = "SDG"
        this.totalAddCost = "Total additional cost:"
        
        this.submit = "Submit"
        this.cancel = "Cancel"
        
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.expType = "Expense"
        this.supplier = "Supplier"
        this.currency = "Currency"
        this.expDate = "Date"
        this.forexRate = "Rate"
        this.amount = "Amount"
        this.delete = "Delete"
        this.inUSD = "USD"
        this.inAED = "AED"
        this.inSDG = "SDG"
        this.totalAddCost = "إجمالي التكلفة الإضافية:"

        this.submit = "ارسال"
        this.cancel = "الغاء"
       
  
      }

    this.dapiService.getUSDVal(this.pModel.bookingId).subscribe((res:any)=>{
      console.log('usd',res);
      this.usdValue =res.name
    })

    this.dapiService.getSDGVal(this.pModel.bookingId).subscribe((res:any)=>{
      console.log('sdg',res);
      this.sdgValue =res.name
    })

    this.dapiService.getAEDVal(this.pModel.bookingId).subscribe((res:any)=>{
      console.log('aed',res);
      this.aedValue =res.name
    })
      
    console.log('pModel',this.pModel);
    this.dapiService.getData(this.pModel.bookingId).subscribe((result)=>{
      let editData:any[] = Object.keys(result).map(function(personNamedIndex){
        let person = (result as any)[personNamedIndex];
        // do something with person
        return person;
    });
      console.log('data',result, editData, typeof(editData));

        this._ui.loadingStateChanged.next(true);
        this._select.getDropdown("supplierid", "supplier", "suppliername", "active=1 and deleted=0 and supplierid>1", false).subscribe((res: SelectModel[]) => {
          console.log("drop2: ", res);
          this.suppOption = res;
          this._select.getDropdown("miscdetailid", "miscdetail", "misctext", "miscid=17", false).subscribe((res: SelectModel[]) => {
            this._ui.loadingStateChanged.next(false);
            console.log("drop3: ", res);
            this.currOption = res;
            if(editData.length==0){
              this.afterDropdowns()
            } else {
              editData.map((row)=>{
                row.suppOption=this.suppOption,
                row.currOption=this.currOption,
                row.expDate= formatDate(row.expDate, 'yyyy-MM-dd', 'en_US')
                // row.expDate=new Date()
              })
              console.log(editData);
              this.ELEMENT_DATA=editData
      
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              
            }
          });
        });
      
    })
    

      
    // this.dataSource = new MatTableDataSource([])
  
  
  
      // // this._ui.loadingStateChanged.next(true);
      // this.dapiService.Controllers(this.pModel).subscribe(res => {
      //   this._ui.loadingStateChanged.next(false);
      //   console.log("hello")
      //   this.data = res;
  
      //   for(let i=0;i<=this.data.length;i++){
      //     this.ver2 = this.data[i]
      //     if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
      //       if (this.ver2.type === "dropdown") {
      //         this.dropList.push(this.ver2);
      //         console.log("droplist: ",this.dropList)
  
  
      //         // this.tableId = this.ver2.refId;
      //         // this.tableName = this.ver2.refTable;
      //         // this.displayColumn = this.ver2.refColumn;
      //         // this.condition = this.ver2.refCondition;
      //       }
      //       this.light.push(this.ver2);
  
      //     }else{
      //       if(this.ver2) {
      //         this.dark.push(this.ver2);
      //       }
  
  
      //     }
  
      //   }
      //   this.breakpoint =
      //   window.innerWidth <= 960
      //     ? 1
      //     : this.data[0].maxRowSize;
  
      //   for(let k=0;k<=this.dropList.length;k++) {
      //     this.dropItem = this.dropList[k]
  
      //         // this.tableId = this.dropItem.refId;
      //         // this.tableName = this.dropItem.refTable;
      //         // this.displayColumn = this.dropItem.refColumn;
      //         // this.condition = this.dropItem.refCondition;
  
      //       this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
      //     console.log("drop: ", res);
      //     this.dropList[k].myarray = res;
      //     this.container.push(res);
      //     console.log(this.container)
  
  
      // });
  
      //   }
      //   console.log("light: ",this.light);
      //   console.log("dark: ",this.dark);
  
        
  
  
  
      // })
  }

  deleteFun(i:any){
    console.log(i);
    this.ELEMENT_DATA.splice(i,1)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log(this.ELEMENT_DATA);
    
  }

  afterDropdowns(){
    let date =formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    console.log(date);
    
    this.ELEMENT_DATA= [
      {
        bookExpListId: 0, 
        bookingId: this.pModel.bookingId, 
        expType: '', 
        supplier: 2, 
        currency: 17001, 
        forexRate: 1, 
        amount: 0, 
        journalId: 1, 
        journalDetailId: 1, 
        desc1: '', 
        desc2: '', 
        active: true, 
    entryMode: 'A', 
    readOnly: false, 
    auditColumns: [] ,
    suppOption:this.suppOption,
    currOption:this.currOption,
    expDate:date
    },
    ];

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // this.dataSource =this.ELEMENT_DATA;
  }

  onAddRecord(){
    this.ELEMENT_DATA.push({
      bookExpListId: 0, 
      bookingId: this.pModel.bookingId, 
      expType: '', 
      supplier: 1, 
      currency: 17001, 
      forexRate: 1, 
      amount: 0, 
      journalId: 1, 
      journalDetailId: 1, 
      desc1: '', 
      desc2: '', 
      active: true, 
  entryMode: 'A', 
  readOnly: false, 
  auditColumns: [] ,
  suppOption:this.suppOption,
  currOption:this.currOption,
  expDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
  })

  console.log('this.ELEMENT_DATA',this.ELEMENT_DATA);
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // setTimeout(()=>{
  //   console.log('this.ELEMENT_DATA',this.ELEMENT_DATA);
  // },10000)
  }

  onSubmit2(){
    this.ELEMENT_DATA.map((row:any)=>{
      row.auditColumns= {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: this._auth.getUserId(),
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
      return row
    })
    let last ={
      records:this.ELEMENT_DATA
  }
  console.log('last',JSON.stringify(last));
  this.dapiService.EntryA2(last).subscribe((res)=>{
    console.log(res);
    
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
     this._msg.showInfoSuccess("Message", "Saved succesfully");
   this.dialogRef.close();
   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
     this._msg.showInfoSuccess("رسالة", "تم الحفظ بنجاح");
   this.dialogRef.close();
   }
}, error => {
    console.log(error);
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
     this._msg.showInfoError("Message", "Error!!");
   this.dialogRef.close();
   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
     
     this._msg.showInfoError("رسالة", "توجد مشكلة");
   this.dialogRef.close();
   }
  })

  
  }

  onParent(){}


  handleKeyUp(e:any){
    if(e.keyCode === 13){
       this.onSubmit();
    }
  }

  onResults(row:any, e:any) {
    console.log('ee',e, row.supplier);
    row.supplier=e
    console.log('ee',e, row.supplier,row);

    
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

  onSubmit() {

    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }

    }));

    console.log(JSON.stringify(this.data))

    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

     console.log(this.last);
     this.last.records.sort(function(a:any, b:any) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
     
          if(this.last.records[0].entryMode == "A"){
            console.log('Last:', JSON.stringify(this.last));
           this.dapiService.EntryA(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfoSuccess("Message", "Saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfoSuccess("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfoError("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfoError("رسالة", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }else if(this.last.records[0].entryMode == "E"){
           this.dapiService.EntryE(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfoSuccess("Message", "Saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfoSuccess("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfoError("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfoError("خطأ!!", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }
        
      
      
      

    

      }











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

  onCancel() {
    this.dialogRef.close();
  }
}
