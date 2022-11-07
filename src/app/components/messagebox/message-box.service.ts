import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { APIResultModel } from '../misc/APIResult.Model';
import { ErrorApiBoxComponent } from './error-api-box/error-api-box.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AppGlobals } from 'src/app/app.global';
import { SnackbarComponent } from '../snackbar/snackbar.component';



@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  blankGroup(arg0: string) {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: 'Fill all required fields with proper values!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: 'Fill all required fields with proper values!',
        type: 'error'
      }
    })
  }
  blankGroupMessage() {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: 'Fill all required fields with proper values!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: 'Fill all required fields with proper values!',
        type: 'error'
      }
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition= 'end'
  verticalPosition: MatSnackBarVerticalPosition= 'top'

  constructor(
    public dialog: MatDialog,
    private _snakBar: MatSnackBar,
    private _globals: AppGlobals,
    ) { }

  public OpertaionNotAllowed(fieldName: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Not Allowed!',
    //     errorMessage: fieldName + ' operation is not allowed..!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Not Allowed!',
        message: fieldName + ' operation is not allowed..!',
        type: 'error'
      }
    })
  }

  public FillRequired(): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: 'Fill all required fields with proper values!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: 'Fill all required fields with proper values!',
        type: 'error'
      }
    })
  }

  public InvlaidEntry(): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: 'Invalid entry!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: 'Invalid entry!',
        type: 'error'
      }
    })
  }

  public InvalidEntryLine() {
    return 'Invalid Entry!';
  }

  public InvalidLine(fieldName: string) {
    return 'Invalid ' + fieldName + '!';
  }

  public payrollProcessed() {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Success!',
    //     errorMessage: 'Payroll processed!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Success!',
        message: 'Payroll processed!',
        type: 'success'
      }
    })
  }

  public warning(warningMessage: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: warningMessage
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: warningMessage,
        type: 'error'
      }
    })
  }

  public blank(fieldName: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: fieldName + ' cannot be blank!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: fieldName + ' cannot be blank!',
        type: 'error'
      }
    })
  }

  public requiredField(fieldName: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: fieldName + ' is required for following action!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: fieldName + ' is required for following action!',
        type: 'error'
      }
    })
  }

  public blankLine(fieldName: string) {
    return fieldName + ' cannot be blank!';
  }

  public success(fieldName: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Success!',
    //     errorMessage: fieldName + ' completed successfully!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Success!',
        message: fieldName + ' completed successfully!',
        type: 'success'
      }
    })
  }

  public save(fieldName: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Saved!',
    //     errorMessage: fieldName + ' saved successfully!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Saved!',
        message: fieldName + ' saved successfully!',
        type: 'success'
      }
    })
  }

  public notMatching(fieldName1: string, fieldName2: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: fieldName1 + ' not matching with ' + fieldName2 + '!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: fieldName1 + ' not matching with ' + fieldName2 + '!',
        type: 'error'
      }
    })
  }

  public showError(error: string): void {
    // this.dialog.open(ErrorBoxComponent, {
    //   data: {
    //     boxTitle: 'Error!',
    //     errorMessage: error
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Error!',
        message: error,
        type: 'error'
      }
    })
  }

  public showAPIError(error: APIResultModel): void {
    this.dialog.open(ErrorApiBoxComponent, {
      data: error
    });
  }


  public showInfo(title: string, message: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: title,
    //     errorMessage: message
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: title,
        message: message,
        type: 'info'
      }
    })

  }
  public showInfoError(title: string, message: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: title,
    //     errorMessage: message
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: title,
        message: message,
        type: 'error'
      }
    })

  }
  public showInfoSuccess(title: string, message: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: title,
    //     errorMessage: message
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: title,
        message: message,
        type: 'success'
      }
    })

  }

  public showEmployeeInfo(title: string, message: string, cb:any): void {
    // const ref = this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: title,
    //     errorMessage: message
    //   }
    // });
    this.snackPosition()
    const snackRef= this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: title,
        message: message,
        type: 'info'
      }
    })
    snackRef.afterDismissed().subscribe(()=> cb())
    // ref.afterClosed().subscribe((res) => cb());
  }

  public greaterThenEqualTo(fieldName1: string, fieldName2: string): void {
    // this.dialog.open(WarningBoxComponent, {
    //   data: {
    //     boxTitle: 'Warning!',
    //     errorMessage: fieldName1 + ' cannot be greater then or equalt to ' + fieldName2 + '!'
    //   }
    // });
    this.snackPosition()
    this._snakBar.openFromComponent(SnackbarComponent,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        title: 'Warning!',
        message: fieldName1 + ' cannot be greater then or equalt to ' + fieldName2 + '!',
        type: 'error'
      }
    })
  }

  private snackPosition(){
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002"){
      this.horizontalPosition= 'start'
    } else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001"){
      this.horizontalPosition= 'end'
    }
  }

}
