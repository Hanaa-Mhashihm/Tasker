import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayData } from './my-test-auto.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
// import { MatAutocomplete } from '@angular/material/autocomplete';
@Component({
  selector: 'app-my-test-auto',
  templateUrl: './my-test-auto.component.html',
  styleUrls: ['./my-test-auto.component.css']
})

export class MyTestAutoComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;

  myControl = new FormControl();
  // options: ArrayData[] = [{id: 1, name: 'Mary'}, {id: 3, name: 'Shelley'}, {id: 4, name: 'Igor'}];
  filteredOptions: Observable<ArrayData[]>;
  // selectedValue : number = 4;
  options : SelectModel[];
  @Input() refId : string;
  @Input() refTable : string;
  @Input() refColumn : string;
  @Input() refCondition : string;
  @Input() initialValue : string;
  @Input() labelValue : string;
  @Input() disabled : boolean;
  @Input() cssClass : string;
  @Input() appearance : MatFormFieldAppearance;
  @Output() resultId = new EventEmitter<Number|null>();

  constructor(
    private _select: SelectService,
  ) { }

  ngOnInit(): void {
    // console.log('cc',this.options);
    // console.log('cc1',this.initialValue);
    // console.log('cc2',this.labelValue);
    //  if (this.myControl.value!= null){
      console.log(this.refId, this.refTable, this.refColumn, this.refCondition);
      
      this._select.getDropdown(this.refId, this.refTable, this.refColumn, this.refCondition, false).subscribe((res: SelectModel[]) => {
        this.options = res
        console.log('op',this.options);
        this.myControl.setValue(this.options.filter((option)=>{return option.id === Number(this.initialValue)})[0]);
      // console.log(this.options.filter((option)=>{return option.id === this.selectedValue})[0]);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.options.slice())),
        
      );
        
      });
    //  }
    // this.myControl.setValue(null)
    
    // this.filteredOptions.subscribe.prototype.map(this.options[1]);
    // let options2 = this._auto.autocomplete.options.toArray()
    // this.myControl.setValue(options2[1].value)

  }

  // onInput(e:any){
  //   let value= (<HTMLInputElement>e.target).value
  //   console.log('any',value);
  //   if(value===''){
  //     this.myControl.setValue(null)
  //     this.initialValue=''
  //     this.refColumn=''
  //     this.refCondition=''
  //     this.refId=''
  //     this.refTable=''
  //   }
    
  // }

  displayFn(user: ArrayData): string {
    console.log('ABC');
    //console.log(user.id);
    return user && user.name ? user.name.toString() : '';
  }

  onEmployeeSelect(e:any,id: number) {
    if (e.isUserInput){
      console.log('My id: ' + id, e.isUserInput);
      this.resultId.emit(id);

    }
  }

  private _filter(name: string): ArrayData[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

//   onEmployeeSelect(pId: number) {
//     //  Assiging the managerId

//     console.log('test company: ', pId.toString());
//     this.myControl.setValue(this.options[0]);
// }

}
