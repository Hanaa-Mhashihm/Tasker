import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data:any,
    private _snackRef: MatSnackBarRef<SnackbarComponent>
  ) { }

  ngOnInit() {
    console.log('snack data', this.data);
    
  }

  isSuccess(){
    if ((this.data.type==='success')){
      return true;
    }else if ((this.data.type==='error')) {
      return false
    // }else if ((this.data.type==='info')&& (this.data.message!=="Saved succesfully")&& (this.data.message!=="تم الحفظ بنجاح")) {
    //   return false
    } else {
      return false;
    }
  }

  closeDialog(){
    this._snackRef.dismiss()
  }

}