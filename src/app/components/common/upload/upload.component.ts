import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from "@angular/core";
import { HttpEventType, HttpClient } from "@angular/common/http";
import { AppGlobals } from "src/app/app.global";
import { FileListModel } from "./upload-file.model";
import { NgxImageCompressService } from "ngx-image-compress";
import { UploadFilesComponent } from "./upload-files/upload-files.component";
import { Ng2ImgMaxService } from "ng2-img-max";
import { MessageBoxService } from "../../messagebox/message-box.service";
import { UIService } from "../../shared/uiservices/UI.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  // step.2
  @Input() myFiles!: FileListModel[];
  tmpFilesList: FileListModel[] = [];
  public progress!: number;
  public message!: string;
  public uploadStatus!: boolean;
  public uploadedFile!: FileListModel;
  public role!: string|null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDeleteFile = new EventEmitter();
  @ViewChild(UploadFilesComponent) childFileListComponent!: UploadFilesComponent;

  constructor(
    private http: HttpClient,
    private _globals: AppGlobals,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private imageCompress: NgxImageCompressService,
    private ng2ImgMax: Ng2ImgMaxService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.progress = 0;
    this.uploadStatus = false;
    this.uploadedFile = {
      apiPath: this._globals.baseAPIFileUrl + "Resources/Images/NoImage.jpg",
      extention: "jpg",
      fileName: "NoImage.jpg",
      fullPath: this._globals.baseAPIRootUrl + "Resources/Images/NoImage.jpg",
      originalFileName: "NoImage.jpg",
      apiImagePath:
        this._globals.baseAPIRootUrl + "Resources/Images/NoImage.jpg"
    };
  }

  public uploadFile = (files:any) => {
    let fileValidations = 1;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
        // do nothing
      } else {
        fileValidations = 0;
      }
    }
    if (fileValidations === 0) {
      files = [];
      this._msg.showInfoError(
        "Info",
        "File types not accepted! Upload only JPEG or PNG Images!!"
      );
      return;
    }
    this.uploadStatus = false;
    if (files.length === 0) {
      return false;
    }
    // tslint:disable-next-line:prefer-const

    // this.ng2ImgMax.resizeImage(fileToUpload, 400, 300).subscribe( // first way
    // this.ng2ImgMax.compressImage(image, 0.075).subscribe( // second way
    try {
      for (let i = 0; i < files.length; i++) {
        // this._ui.loadingStateChanged.next(true);
        let fileToUpload = <File>files[i];
        const formData = new FormData();
        formData.append("file", fileToUpload, fileToUpload.name);
        this.http
          .post(this._globals.baseAPIUrl + "file/upload", formData, {
            reportProgress: true,
            observe: "events"
          })
          .subscribe((event:any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              this.uploadStatus = false;
            } else if (event.type === HttpEventType.Response) {
              const res: any = event.body;
              this.uploadedFile = {
                apiPath: res.apiPath,
                extention: res.extention,
                fileName: res.fileName,
                fullPath: res.fullPath,
                originalFileName: res.originalFileName,
                // apiImagePath: this._globals.baseAPIRootUrl + res.apiPath
                apiImagePath: res.apiImagePath
              };
              this.uploadStatus = true;
              this.onUploadFinished.emit(event.body);
              // this.tmpFilesList.push(this.uploadedFile);
              // this.myFiles.push(this.uploadedFile);
              this.message = fileToUpload.name + " upload success!";
            }
            // this.myFiles = this.tmpFilesList;

            this.childFileListComponent.refreshMe();
            // this._ui.loadingStateChanged.next(false);
          });
        // this.ng2ImgMax.compressImage(fileToUpload, 0.5).subscribe(
        //   result => {
        //     fileToUpload = result;

        // });
      }
      return;
    } catch (error:any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      files = [];
      return false;
    }
  };

  public onFileDeleteFromList = (event:any) => {
    if (event !== undefined || event !== null) {
      for (let index = 0; index < this.myFiles.length; index++) {
        if (this.myFiles[index].fileName === event._body) {
          const delIndex = this.myFiles.indexOf(this.myFiles[index], 0);
          if (delIndex > -1) {
            this.myFiles.splice(delIndex, 1);
          }
        }
      }
    }
    this.onDeleteFile.emit(event);
    this.childFileListComponent.refreshMe();
  };

  showProgress() {
    if (this.progress > 0 && this.progress < 100) {
      return true;
    } else {
      return false;
    }
  }
}
