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
import { PartnerEntryService } from './partner-entry.service';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { UploadService } from 'src/app/system/upload/upload.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-partner-entry',
  templateUrl: './partner-entry.component.html',
  styleUrls: ['./partner-entry.component.scss']
})

export class PartnerEntryComponent implements OnInit {

	url!: string;
  checkParentAccountId!:any
    model: Send = {
      tableId: 83,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: Number(localStorage.getItem('role')),
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
	  private dapiService: PartnerEntryService,
    private upload: UploadService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<PartnerEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
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

        console.log(res);
        
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
    console.log(file);
    console.log(event);
    
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

onParent(){}

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
       this.last.records.push(this.obj1);
     }
   }

  //  console.log(JSON.stringify(this.last));
  //  console.log("Dark",JSON.stringify(this.lastDark));

   

   this.last.records.forEach((Object2:any)=> {
    if(Object2 && Object2.tableColumnId === 707){
      if(this.upload.imgFullPath != null) {
        Object2.value = this.imgHttp.concat(this.upload.imgFullPath.substring(this.upload.imgFullPath.indexOf('h') + 1))
      }else {
        Object2.value = Object2.value
      }
      
    }else if(Object2 && Object2.tableColumnId === 708){
      if(this.upload.imgApiPath != null) {
        Object2.value = this.upload.imgApiPath
      }else {
        Object2.value = Object2.value
      }
      
    }else if(Object2 && Object2.tableColumnId === 709){
      if(this.upload.imgExtention != null) {
        Object2.value = this.upload.imgExtention
      }else {
        Object2.value = Object2.value
      }
      
    }else if(Object2 && Object2.tableColumnId === 710){
      if(this.upload.imgFileName != null) {
        Object2.value = this.upload.imgFileName
      }else {
        Object2.value = Object2.value
      }
      
    }
    // else if(Object2.tableColumnId === 15){
    //   Object2.value = this.dapiService.imgFullPath
    // }
    else if(Object2 && Object2.tableColumnId === 712){
      if(this.upload.imgOriginalFileName != null) {
        Object2.value = this.upload.imgOriginalFileName
      }else {
        Object2.value = Object2.value
      }
      
    }
  })
 
  console.log(JSON.stringify(this.last));
  
   

   this.last.records.sort(function(a:any, b:any) { 
    return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
  });
  // for (let i = 0; i < this.lastDark.child1.length; i++) {
  //   this.lastDark.child1[i].records.sort(function(a, b) { 
  //     return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
  //   });
  // }
  

   
    
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

