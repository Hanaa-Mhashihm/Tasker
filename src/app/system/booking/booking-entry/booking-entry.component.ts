import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { BookingEntryService } from './booking-entry.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-booking-entry',
  templateUrl: './booking-entry.component.html',
  styleUrls: ['./booking-entry.component.scss']
})

export class BookingEntryComponent implements OnInit {

  checkParentAccountId!:any
	url!: string;
  model2!: Send ;
  model3!: Send ;
    childElemInit: Sources[] = [];
    childElemInit2: Sources[] = [];
    verCh2!: Sources;
    verCh22!: Sources;
    childElemDark: Sources[] = [];
    vale!: Sources[]
    childElem: any = {
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
    childElemT: any = {
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
    childElem2: any = {
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
    childElem2T: any = {
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
    childElem3: any = {
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
    childElemDark2: any = {
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
    childElemDark3: any = {
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
     
    last: any = {
      records: [],
      child1: [],
      child2: [],
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
    lastDark: any = {
      records: [],
      child1: [],
      child2: [],
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
  

    model: Send = {
      tableId: 86,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };

    // last: any = {
    //   records: [],
    //   auditColumn: {
    //     approvalStatusId: 1100001,
    //     companyId: 10001,
    //     branchId: 201,
    //     financialYearId: 1,
    //     userId: 1,
    //     mACAddress: "unidentified",
    //     hostName: "unidentified",
    //     iPAddress: "unidentified",
    //     deviceType: "Win32"
    //   }
    // }
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
  
    direction!: Direction;
    dropListItem1: Sources[] = [];
    dropItemchild1!: Sources;
  
    dropItem!: Sources;
    dropItemchild!: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string|null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];
    dropListItem: Sources[] = [];


  constructor(
	  private dapiService: BookingEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<BookingEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Add") {
      this.addChild1Item(0)
      // this.addChild2Item(0)
      
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
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;

        console.log(this.data);
        
        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Edit") {
          
          if(this.data.length > 0) {
    
            this.dapiService.getChild1ItembyChild1(+this.data[0].value).subscribe((res) => {
      
            this._ui.loadingStateChanged.next(false);
            
              console.log("EditRes",res)
    
              
              for(let k=0;k<res.length;k++){
                this.addChild1Item(res[k].bookContId)
                
              }
    
              
              
              
            }
            )
            // this.dapiService.getChild2byChild2(+this.data[0].value).subscribe((res) => {
    
              
            //   this._ui.loadingStateChanged.next(false);
            //   // console.log("EditRes",res)
            //   // console.log("res:", res)
            //   for(let k=0;k<res.length;k++){
            //     this.addChild2Item(res[k].bookContId)
            //   }
    
              
              
            // }
            // )
            
            
            
          }else {
            this.addChild1Item(0)
          }
        }
  
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
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
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          this.container.push(res);
      });
  
        }  
      })
  }

  addChild2Item(id:number){
  //   let myElem = {
  //     records: []as any[],
  //     auditColumn: {
  //       approvalStatusId: 1100001,
  //       companyId: 10001,
  //       branchId: 201,
  //       financialYearId: 1,
  //       userId: this._auth.getUserId(),
  //       mACAddress: "unidentified",
  //       hostName: "unidentified",
  //       iPAddress: "unidentified",
  //       deviceType: "Win32"
  //     }
  //   }
  //   let childElemDark3 = {
  //     records: [] as any[],
  //     auditColumn: {
  //       approvalStatusId: 1100001,
  //       companyId: 10001,
  //       branchId: 201,
  //       financialYearId: 1,
  //       userId: this._auth.getUserId(),
  //       mACAddress: "unidentified",
  //       hostName: "unidentified",
  //       iPAddress: "unidentified",
  //       deviceType: "Win32"
  //     }
  //   }
  //   this.model3 = {
  //     tableId: 87,
  //     recordId: id,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
  //   };
  //   this._ui.loadingStateChanged.next(true);
  //   this.dapiService.child2ItemControllers(this.model3).subscribe((res) => {
  //     console.log('child2 control',res);
      
  //     this._ui.loadingStateChanged.next(false);

  //     this.childElemInit2 = res
  //     console.log(this.childElemInit2)

  //     this.dropListItem1.push(this.childElemInit2[2])
      
  //     for(let k=0;k<this.dropListItem1.length;k++) {
  //       console.log("loop cycle" + k)
  //       this.dropItemchild1 = this.dropListItem1[k]
  //       console.log("DropitemTax", this.dropItemchild1)

            
  //             this._select.getDropdown(this.dropListItem1[k].refId, this.dropListItem1[k].refTable, this.dropListItem1[k].refColumn, this.dropListItem1[k].refCondition, false).subscribe((res: SelectModel[]) => {
  //               this.dropListItem1[k].myarray = res
  //             })


    
  // }
      

  //     for(let i=0;i<this.childElemInit2.length;i++){
  //       this.verCh22 = this.childElemInit2[i]
  //       childElemDark3.records.push(this.verCh22);
        

  //     }
  //     this.lastDark.child2.push(childElemDark3);
  //     this.childElemInit2.forEach((itemE) =>{
  //       if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
  //         // this.childElem.records.push(itemE);
  //         myElem.records.push(itemE)
          
  
  //       }else{
          
  //           this.childElemDark.push(this.verCh2);
  //           // console.log(this.childElemDark)
          
  
  
  //       }
  //     })
      
  //     // this.childElem = res
  //     // console.log(JSON.stringify(this.child1Data))
  //     this.childElem2T = null
  //     this.childElem2T = this.childElemT

  //     //this.last.child1.push(this.childElem2);
  //     this.last.child2.push(myElem)
     
      
  //   })
  //   console.log("child2 final", this.last)
  }

  deleteFun(a:any){}
  deleteFun2(a:any){}
  onChange1(a:any,b:any){}
  onChangeTax(a:any,b:any){}
  onChangeValue(a:any,b:any){}
  onParent(){}
  onAmountChange(a:any){}

  addChild1Item(id:number) {
    
    let myElem = {
      records: []as any[],
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
    let childElemDark2 = {
      records: []as any[],
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
    this.model2 = {
      tableId: 87,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child1ItemControllers(this.model2).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit = res
      console.log(this.childElemInit)
      this.dropListItem.push(this.childElemInit[1])
      

      for(let k=0;k<this.dropListItem.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild = this.dropListItem[k]
        console.log("DropitemTax", this.dropItemchild)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;

            
            if(this.dropItemchild.tableColumnId == 231) {
              this.dapiService.getProductPricing(0).subscribe((result) => {
                this.dropItemchild.myarray = result
              })

            }else {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                // console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
               
              });
            }

        
        // this.container.push(res);
        // console.log(this.container)


    
  }

      for(let i=0;i<this.childElemInit.length;i++){
        this.verCh2 = this.childElemInit[i]
        childElemDark2.records.push(this.verCh2);
        

      }
      this.lastDark.child1.push(childElemDark2);
      this.childElemInit.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark.push(this.verCh2);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem2 = null
      this.childElem2 = this.childElem

      //this.last.child1.push(this.childElem2);
      this.last.child1.push(myElem)
     
      
    })
    console.log("child1 final", this.last)
    console.log("DarlDarl",this.lastDark)

    
  }

  onSubmit() {

    // this.data.forEach((Object)=> this.light.forEach((obj)=>
    // {
    //   if(Object.tableColumnId === obj.tableColumnId){
    //     Object.value = obj.value
    //   }

    // }));
    // this.childElemInit.forEach((Object)=> this.childElem.forEach((obj)=>
    // {
    //   if(Object.tableColumnId === obj.tableColumnId){
    //     Object.value = obj.value
    //   }

    // }));

    // console.log(JSON.stringify(this.data))

    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
        //  this.last.records.push(this.obj1);
         this.lastDark.records.push(this.obj1);
       }
     }

    //  console.log(JSON.stringify(this.last));
    //  console.log("Dark",JSON.stringify(this.lastDark));

     for(let i=0; i< this.lastDark.child1.length;i++){
       this.lastDark.child1[i].records[0].value = "0"
       this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
       this.vale = this.lastDark.child1[i].records
       this.vale.forEach((val) => {
         val.entryMode = "A"
       })
     }

     this.lastDark.records.sort(function(a:any, b:any) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
    for (let i = 0; i < this.lastDark.child1.length; i++) {
      this.lastDark.child1[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
    for (let i = 0; i < this.lastDark.child2.length; i++) {
      this.lastDark.child2[i].records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
    }
   

     console.log("Dark",JSON.stringify(this.lastDark));

     
      
          if(this.lastDark.records[0].entryMode == "A"){
            console.log('Last:', JSON.stringify(this.lastDark));
           this.dapiService.EntryA(this.lastDark).subscribe(nexto => {
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
         }else if(this.lastDark.records[0].entryMode == "E"){
           this.dapiService.EntryE(this.lastDark).subscribe(nexto => {
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

  onResults(id:number, e:any) {
    console.log('ee',e);
    
    this.light.forEach((res:any) => {
      if (res.tableColumnId === id) {
        console.log('ee', e);
        
        res.value = e.toString()
        // if(res.tableColumnId === 195) {
        //   this.onChangeValue(res.value)
        // }
        
      }
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}

