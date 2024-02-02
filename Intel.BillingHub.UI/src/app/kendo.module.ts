import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadsheetModule } from '@progress/kendo-angular-spreadsheet';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ChartsModule } from '@progress/kendo-angular-charts';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpreadsheetModule,
    ButtonsModule,
    GridModule,
    InputsModule,
    NavigationModule,
    ProgressBarModule,
    LabelModule,
    ButtonsModule,
    ChartsModule
  ],
  exports: [
    SpreadsheetModule,
    ButtonsModule,
    GridModule,
    InputsModule,
    NavigationModule,
    ProgressBarModule,
    LabelModule,
    ButtonsModule,
    ChartsModule
  ]
})
export class KendoModule { }
