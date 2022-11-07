import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule} from "@angular/material/card";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatChipsModule} from "@angular/material/chips";
import {MatDividerModule } from "@angular/material/divider";
import {MatExpansionModule } from "@angular/material/expansion";
import {MatGridListModule } from "@angular/material/grid-list";
import {MatInputModule } from "@angular/material/input";
import {MatListModule } from "@angular/material/list";
import { MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule } from "@angular/material/paginator";
import {MatProgressBarModule } from "@angular/material/progress-bar";
import {MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatRadioModule } from "@angular/material/radio";
import { MatRippleModule} from "@angular/material/core";
import {MatSelectModule } from "@angular/material/select";
import { MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule} from "@angular/material/sort";
import {MatStepperModule } from "@angular/material/stepper";
import {MatTableModule } from "@angular/material/table";
import {MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule} from "@angular/material/tooltip";
import { MatTreeModule} from "@angular/material/tree";
import { MAT_DATE_LOCALE} from "@angular/material/core";
import {DateAdapter } from "@angular/material/core";
import {MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'DD/MM/YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'DD/MM/YYYY',
    },
};


@NgModule({
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ],
    imports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        ResizableModule,
        DragDropModule
    ],
    exports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        ResizableModule,
        DragDropModule
    ]
})
export class MaterialModule { }
