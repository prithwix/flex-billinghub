import { Component } from '@angular/core';
import { DocumentDescriptor, SheetDescriptor, SpreadsheetComponent, SpreadsheetExcelImportEvent, SpreadsheetMainMenuItem } from '@progress/kendo-angular-spreadsheet';
import { KendoModule } from '../kendo.module';
import { SVGIcon, dataJsonIcon } from '@progress/kendo-svg-icons';
import * as XLSX from 'xlsx'
import { CommonModule } from '@angular/common';
import { SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { JVFileRequestModel } from '../model/jvrequestModel';
import { JvFileService } from '../services/jv-file.service';
type AOA = any[][];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    KendoModule],
  selector: 'app-load-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent {
  public filter: CompositeFilterDescriptor = {
    filters: [],
    logic: 'and'
  };
  public sheets: SheetDescriptor[] = [];
  public items: SpreadsheetMainMenuItem[] = [
    { id: "file", active: true },
    { id: "home" },
    { id: "insert" },
  ];
  excelJsonData!: DocumentDescriptor;
  public excelSVG: SVGIcon = dataJsonIcon;
  public rootData: JVFileRequestModel[] = [];
  data!: any[];
  gridColumns!: string[];
  excelColumns: { column: string, title: string, required: boolean }[] = [
    { column: 'Sequence Number', title: 'SequenceNumber', required: true },
    { column: 'Company Code', title: 'CompanyCode', required: false },
    { column: 'Cost Center', title: 'CostCenter', required: false },
    { column: 'GL Account', title: 'GLAccount', required: true },
    { column: 'Project ID', title: 'ProjectID', required: false },
    { column: 'Mgr E-mail  OR Employee WWID', title: 'MgrEmailOrEmpWWID', required: true },
    { column: 'FA E-mail', title: 'FAEmail', required: false },
    { column: 'Description for invoice', title: 'DescriptionForInvoice', required: true },
    { column: 'Quantity', title: 'Quantity', required: true },
    { column: 'Amount', title: 'Amount', required: true },
    { column: 'Product Info', title: 'ProductInfo', required: true },
    { column: "Identifyer's E-mail or URL", title: 'IndentifiersEmailOrURL', required: true },
    { column: 'Start Date', title: 'StartDate', required: false },
    { column: 'End Date', title: 'EndDate', required: false }
  ];

  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  monthlyAmountData: any[] = [];

  data1 = [
    {
      kind: "Hydroelectric",
      share: 0.175,
    },
    {
      kind: "Nuclear",
      share: 0.238,
    },
    {
      kind: "Coal",
      share: 0.118,
    },
    {
      kind: "Solar",
      share: 0.052,
    },
    {
      kind: "Wind",
      share: 0.225,
    },
    {
      kind: "Other",
      share: 0.192,
    },
  ];
  totalAmount: number = 0;
  isJvFileInvalid: boolean = true;
  jvFileValidtedByAPI: boolean = false;

  constructor(private jvService: JvFileService) {

  }

  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }

  public onImport(event: SpreadsheetExcelImportEvent): void {
    console.log(event);
  }

  public onSave(spreadsheet: SpreadsheetComponent): void {
    spreadsheet.spreadsheetWidget.saveJSON().then((data) => {
      this.excelJsonData = data;
      console.log(this.excelJsonData);
    });
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    //clear rootdata
    this.rootData = [];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (this.data?.length > 1) {
        this.gridColumns = [...this.data[0]];
        this.data.forEach((item: any[], dataIndex) => {
          //if excel row is empty then think it as end of file
          if (this.checkBlankRow(item)) {
            return;
          } else if (this.checkIfNoSeqId(item)) {
            return;
          }

          if (dataIndex > 0) {
            let obj: any = {};
            this.gridColumns.forEach((column, columnIndex) => {
              if (column == 'Leave Blank') {
                this.gridColumns[columnIndex] = '';
              }
              let excelColumn = this.excelColumns.filter(item => item.column == column)?.[0];
              if (excelColumn) {
                obj[excelColumn.title] = item[columnIndex] + '';
                if (column == 'Start Date' || column == 'End Date') {
                  obj[excelColumn.title] = this.convertExcelDate(item[columnIndex]);
                }
              }

            });
            this.rootData.push(obj);
          }
        })
      }

      this.monthlyAmountData = [];
      this.rootData.forEach(item => {
        this.checkDataValidity(item);
      });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  checkBlankRow(rowDetails: any[]) {
    let allEmptyCell = true;
    if (rowDetails.length) {
      allEmptyCell = rowDetails.every(item => !item);
    }

    return allEmptyCell;
  }

  checkIfNoSeqId(rowDetails: any[]) {
    let noSeqId = true;
    if (rowDetails.length) {
      noSeqId = rowDetails[0] ? false : true;
    }
    if (!noSeqId && isNaN(rowDetails[0])) {
      noSeqId = true;
    }
    return noSeqId;
  }

  checkDataValidity(rowDetails: any) {
    this.isJvFileInvalid = false;
    this.excelColumns.forEach(item => {
      if (item.required && !rowDetails[item.title]) {
        rowDetails[item.title + '-bgStyle'] = 'red';
        rowDetails[item.title + '-requiredMsg'] = 'This is required';
        this.isJvFileInvalid = true;
      }
    })
  }

  calculateMonthlyData(rowDetails: JVFileRequestModel) {
    let startMonth = new Date(rowDetails['StartDate']).getMonth();
    let startYear = new Date(rowDetails['StartDate']).getFullYear();
    let endMonth = new Date(rowDetails['EndDate']).getMonth();
    let endYear = new Date(rowDetails['EndDate']).getFullYear();
    let amount: number = +rowDetails['Amount'];
    //if end year is greater
    if (endYear > startYear) {
      let totalMonthInStartYear = (12 - startMonth);
      let totalMonthInEndYear = endMonth + 1;
      let totalMonths = totalMonthInStartYear + totalMonthInEndYear;
      let monthlyAmount = +parseFloat((amount / totalMonths) + '').toFixed(2);
      while (startMonth < 12) {
        let obj = {
          year: startYear,
          combo: this.months[startMonth] + ' - ' + startYear,
          amount: monthlyAmount
        }
        this.updateMonthlyData(obj);
        startMonth++;
      }

      while (endMonth > 0) {
        let obj = {
          year: startYear,
          month: this.months[endMonth],
          combo: this.months[endMonth] + '-' + startYear,
          amount: monthlyAmount
        }
        this.updateMonthlyData(obj);
        endMonth--;
      }
    }
    //if both year is same
    else if (endYear == startYear) {
      let totalMonths = endMonth - startMonth + 1;
      let monthlyAmount = +parseFloat((amount / totalMonths) + '').toFixed(2);
      while ((endMonth + 1) > startMonth) {
        let obj = {
          year: startYear,
          month: this.months[endMonth],
          combo: this.months[endMonth] + '-' + startYear,
          amount: monthlyAmount
        }
        this.updateMonthlyData(obj);
        endMonth--;
      }
    }
    //if end year is less, incorrect data
    else {

    }
  }

  updateMonthlyData(data: any) {
    if (!this.monthlyAmountData.length) {
      this.monthlyAmountData.push(data);
    }
    else {
      let findIndex = this.monthlyAmountData.findIndex(item => data['month'] == item['month'] && data['year'] == item['year']);
      if (findIndex > -1) {
        this.monthlyAmountData[findIndex]['amount'] = this.monthlyAmountData[findIndex]['amount'] + data['amount'];
        this.monthlyAmountData[findIndex]['amount'] = +parseFloat(this.monthlyAmountData[findIndex]['amount'] + '').toFixed(2);
      } else {
        this.monthlyAmountData.push(data);
      }
    }
  }

  convertExcelDate(excelSerialDate: any) {
    return new Date(Date.UTC(0, 0, excelSerialDate - 1));
  }
  validateJVfile() {
    this.jvFileValidtedByAPI = false;
    this.monthlyAmountData = [];
    this.totalAmount = 0;

    this.jvService.validateJVFile(this.rootData)
      .subscribe(res => {
        if (!res.length) {
          this.jvFileValidtedByAPI = true;
          this.rootData.forEach(item => {
            this.calculateMonthlyData(item);
            this.totalAmount = this.totalAmount + +item.Amount;
          });
        }
      });
  }
}


