import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyBankModel } from '../companybank.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { CompanyBankService } from '../companybank.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { Sources } from 'src/app/source.model';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CompanyBankEntryService } from './companybank-entry.service';
import { FileListModel } from 'src/app/system/upload/upload-file.model';
import { UploadService } from 'src/app/system/upload/upload.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-companybank-entry',
  templateUrl: './companybank-entry.component.html',
  styleUrls: ['./companybank-entry.component.scss']
})

export class PaymentEntryComponent implements OnInit {
  url!: string;
  checkParentAccountId!:any

  model: Send = {
    tableId: 104,
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

  light: Sources[] = [];
  dark: Sources[] = [];

  ver2!: Sources;
  ver3!: Sources;
  ver4!: Sources;
  obj1!: Sources;
  obj2!: Sources;
  showSub:boolean=false
  

  direction!: Direction;

  dropItem!: Sources;
  container: any[][] =[];

  accountList: SelectModel[] = [];

  dialog_title: string|null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  dropList: Sources[] = [];

  showit!: boolean;
  visible: boolean = true;
  imagePathUrl!: string;
  imagePathUrl2!: string;
  lFiles: FileListModel[] = [];
  imgHttp:string = "http://g"


  constructor(
    private dapiService: CompanyBankEntryService,
    private upload: UploadService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: CompanyBankService,
      private dialogRef: MatDialogRef<PaymentEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    this.showit = false
    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit3') == "edit") {
      this.showSub=true
      let id 
      // for(let i=0;i<=this.light.length;i++){
      //   if (this.light[i].tableColumnId===999){
      //     id=Number(this.light[i].value)
      //   }
      // }
      // if (id=== 132){
      //   this._select.getDropdown('customerid','customer','customername','active=1 and deleted=0 and customerid>1',false).subscribe((res: SelectModel[]) => {
      //     console.log('cus',res);
      //     for(let i=0;i<=this.light.length;i++){
      //       if (this.light[i].tableColumnId===1000){
      //         this.light[i].myarray=res
      //         this.showSub=true
      //       }
      //     }
      //   })
      // } else if (id=== 131){
      //   this._select.getDropdown('SupplierId','supplier','SupplierName','active=1 and deleted=0 and SupplierId>1',false).subscribe((res: SelectModel[]) => {
      //     console.log('sup',res);
      //     for(let i=0;i<=this.light.length;i++){
      //       if (this.light[i].tableColumnId===1000){
      //         this.light[i].myarray=res
      //         this.showSub=true
      //       }
      //     }
      //   })
      // } else if (id=== 107){
      //   this._select.getDropdown('shareholderid','shareholder','shname','active=1 and deleted=0 and shareholderid>1',false).subscribe((res: SelectModel[]) => {
      //     console.log('share',res);
      //     for(let i=0;i<=this.light.length;i++){
      //       if (this.light[i].tableColumnId===1000){
      //         this.light[i].myarray=res
      //         this.showSub=true
      //       }
      //     }
      //   })
      // }
    }

    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        
        this.submit = "Submit"
        this.cancel = "Cancel"
        
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
       
  
      }
      this._ui.loadingStateChanged.next(true);
      this.dapiService.companyBankControllers(this.pModel).subscribe((res:any) => {
        this._ui.loadingStateChanged.next(false);
        console.log("hello",res)
        this.data = res;

        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit3') == "edit") {
          // this.showSub=true
          let id 
          console.log("light: ",res);
          // for(let i=0;i<=res.length;i++){
          //   if (res[i].tableColumnId===999){
              id=Number(res[11].value)
          //   }
          // }
          if (id=== 132){
            this._select.getDropdown('customerid','customer','customername','active=1 and deleted=0 and customerid>1',false).subscribe((resu: SelectModel[]) => {
              console.log('cus',resu);
              for(let i=0;i<=res.length;i++){
                if (res[i].tableColumnId===1000){
                  res[i].myarray=resu
                  this.showSub=true
                }
              }
            })
          } else if (id=== 131){
            this._select.getDropdown('SupplierId','supplier','SupplierName','active=1 and deleted=0 and SupplierId>1',false).subscribe((resu: SelectModel[]) => {
              console.log('sup',resu);
              for(let i=0;i<=res.length;i++){
                if (res[i].tableColumnId===1000){
                  res[i].myarray=resu
                  this.showSub=true
                }
              }
            })
          } else if (id=== 107){
            this._select.getDropdown('shareholderid','shareholder','shname','active=1 and deleted=0 and shareholderid>1',false).subscribe((resu: SelectModel[]) => {
              console.log('share',resu);
              for(let i=0;i<=res.length;i++){
                if (res[i].tableColumnId===1000){
                  res[i].myarray=resu
                  this.showSub=true
                }
              }
            })
          }
        }
        
  
        for(let i=0;i<this.data.length;i++){
          this.ver2 = this.data[i]
          if(this.ver2 && this.ver2.tableColumnId == 248) {
            this.imagePathUrl = this.ver2.value
            console.log("img :" , this.imagePathUrl);
          }else if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
  
  
              // this.tableId = this.ver2.refId;
              // this.tableName = this.ver2.refTable;
              // this.displayColumn = this.ver2.refColumn;
              // this.condition = this.ver2.refCondition;
            }
            this.light.push(this.ver2);
  
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
  
              // this.tableId = this.dropItem.refId;
              // this.tableName = this.dropItem.refTable;
              // this.displayColumn = this.dropItem.refColumn;
              // this.condition = this.dropItem.refCondition;
  
            this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          console.log("drop: ", res);
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log(this.container)
  
  
      });
  
        }
        
        console.log("light: ",this.light);
        console.log("dark: ",this.dark);
  
        
  
  
  
      })
  }

  public uploadFinished = (event:any) => { // this is event being called when file gets uploaded
    
    const file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); 
    this.imagePathUrl2 = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('g') + 1))
    console.log(this.imagePathUrl2);
    
    this.showit = true
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}
handleKeyUp(e:any){
  if(e.keyCode === 13){
     this.onSubmit();
  }
}
onChangeAccount1(id: number, i?: number) {
  console.log(id);
  if (id=== 132){
    this._select.getDropdown('customerid','customer','customername','active=1 and deleted=0 and customerid>1',false).subscribe((res: SelectModel[]) => {
      console.log('cus',res);
      for(let i=0;i<=this.light.length;i++){
        if (this.light[i].tableColumnId===1000){
          this.light[i].myarray=res
          this.showSub=true
        }
      }
    })
  } else if (id=== 131){
    this._select.getDropdown('SupplierId','supplier','SupplierName','active=1 and deleted=0 and SupplierId>1',false).subscribe((res: SelectModel[]) => {
      console.log('sup',res);
      for(let i=0;i<=this.light.length;i++){
        if (this.light[i].tableColumnId===1000){
          this.light[i].myarray=res
          this.showSub=true
        }
      }
    })
  } else if (id=== 107){
    this._select.getDropdown('shareholderid','shareholder','shname','active=1 and deleted=0 and shareholderid>1',false).subscribe((res: SelectModel[]) => {
      console.log('share',res);
      for(let i=0;i<=this.light.length;i++){
        if (this.light[i].tableColumnId===1000){
          this.light[i].myarray=res
          this.showSub=true
        }
      }
    })
  }else {
    for(let i=0;i<=this.light.length;i++){
      if (this.light[i].tableColumnId===1000){
        this.light[i].value='1'
        this.showSub=false
      }
    }
  }
  // this._select.getDropdown('accounttype','account','accountname','active=1 and deleted=0 and customerid>1',false).subscribe((res: SelectModel[]) => {
    // if(res[0].id == 19004) {
    //   this.elem[i].showCost1 = true
    // }else if(res[0].id == 19005) {
    //   this.elem[i].showCost1 = true
    // }else {
    //   this.elem[i].showCost1 = false
    //   this.elem[i].costCenterId1 = 1
    // }
    
// });
  
  // if(id === 107) {
  //   this.elem[i].showShare1 = true
  // }else if(id === 131) {
  //   this.elem[i].showSupplier1 = true
  // }else if(id === 132) {
  //   this.elem[i].showCustomer1 = true
  // }else {
  //   this.elem[i].showShare1 = false
  //   this.elem[i].showSupplier1 = false
  //   this.elem[i].showCustomer1 = false
  //   this.elem[i].shareholderId1 = 1
  //   this.elem[i].supplierId1 = 1
  //   this.elem[i].customerId1 = 1

  // }
}

onParent(){}

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

     this.last.records.forEach((Object2:any)=> {
      if(Object2 && Object2.tableColumnId === 248){
        if(this.upload.imgFullPath != null) {
          Object2.value = this.imgHttp.concat(this.upload.imgFullPath.substring(this.upload.imgFullPath.indexOf('h') + 1))
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 249){
        if(this.upload.imgApiPath != null) {
          Object2.value = this.upload.imgApiPath
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 250){
        if(this.upload.imgExtention != null) {
          Object2.value = this.upload.imgExtention
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 251){
        if(this.upload.imgFileName != null) {
          Object2.value = this.upload.imgFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
      // else if(Object2.tableColumnId === 15){
      //   Object2.value = this.dapiService.imgFullPath
      // }
      else if(Object2 && Object2.tableColumnId === 253){
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
            console.log('Last:', JSON.stringify(this.last));
           this.dapiService.companyBankEntryA(this.last).subscribe(nexto => {
             this.res = nexto;
             this.visible = false;
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
           this.dapiService.companyBankEntryE(this.last).subscribe(nexto => {
             this.res = nexto;
             this.visible = false;
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
      event.target.innerWidth <= 1500
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 1500
        ? 1
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }

  
}
