import * as XLSX from 'xlsx';

class FileService {
  dictionary: Map<string, any> = new Map();
  constructor() {
    this.dictionary.set('csv', new CSVFileService());
    this.dictionary.set('xls', new ExcelFileService());
    this.dictionary.set('xlsx', new ExcelFileService());
  }

  readFile(fileObj: any): Array<Array<string>> {
    if (fileObj === undefined) return [];
    const fileName: string = fileObj.name;
    const tokens = fileName.split('.');
    const fileType = tokens[tokens.length - 1];
    if (this.dictionary.has(fileType)) {
      const service = this.dictionary.get(fileType);
      const data: Array<Array<string>> = service.readFile(fileObj);
      return data;
    }
    return [];
  }

  writeFile(
    headers: Array<string>,
    content: Array<Array<string>>,
    fileName: string,
    fileType: string
  ) {
    if (this.dictionary.has(fileType)) {
      const service = this.dictionary.get(fileType);
      service?.writeFile(headers, content, fileName);
    }
  }
}

class ExcelFileService {
  getType() {
    return 'excel file service';
  }
  writeFile(
    headers: string[],
    content: Array<Array<string>>,
    fileName: string
  ): void {
    let newData: Array<Array<string>> = [headers.slice()];
    content.map((item) => newData.push(item));
    const newWB = XLSX.utils.book_new();
    const newWS = XLSX.utils.aoa_to_sheet(newData);
    XLSX.utils.book_append_sheet(newWB, newWS, 'sheet1');
    XLSX.writeFile(newWB, `${fileName}.xlsx`, { bookType: 'xlsx' });
  }
  readFile(fileObj: any): Promise<Array<Array<string>>> {
    const reader = new FileReader();
    reader.readAsBinaryString(fileObj);

    return new Promise((resolve, reject) => {
      reader.onload = (event: any) => {
        const data: any = event.target?.result;
        const wb = XLSX.read(data, {
          type: 'binary',
        });
        const sheetNames: string[] = wb.SheetNames;
        const ws = wb.Sheets[sheetNames[0]];
        const csv_data = XLSX.utils.sheet_to_csv(ws);
        const array_data: Array<Array<string>> =
          CSVService.csvToArray(csv_data);
        resolve(array_data);
      };
    });
  }
}

class CSVFileService {
  getType() {
    return 'csv file service';
  }
  writeFile(
    headers: string[],
    content: Array<Array<string>>,
    fileName: string
  ): void {
    let newData: Array<Array<string>> = [headers.slice()];
    content.map((item) => newData.push(item));
    const newWB = XLSX.utils.book_new();
    const newWS = XLSX.utils.aoa_to_sheet(newData);
    XLSX.utils.book_append_sheet(newWB, newWS, 'sheet1');
    XLSX.writeFile(newWB, `${fileName}.csv`, { bookType: 'csv' });
  }
  readFile(fileObj: any): Promise<Array<Array<string>>> {
    const reader = new FileReader();
    reader.readAsText(fileObj);
    return new Promise((resolve, reject) => {
      reader.onload = (event: any) => {
        const data: any = event.target?.result;
        console.log('csv', data);
        const array_data: Array<Array<string>> = CSVService.csvToArray(data);
        return resolve(array_data);
      };
    });
  }
}
class CSVService {
  static makeCSV(content: Array<Array<string>>): string {
    let csv: string = '';
    content.forEach((value) => {
      value.forEach((item, index) => {
        let innerValue = item === null ? '' : item.toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"';
        }
        if (index > 0) {
          csv += ',';
        }
        csv += result;
      });
      csv += '\n';
    });
    return csv;
  }
  static csvToArray(
    str: string | undefined,
    delimiter: string = ','
  ): Array<Array<string>> {
    if (str === undefined) return [];
    const headers: string[] = str
      .slice(0, str.indexOf('\n'))
      .split(delimiter)
      .filter((item) => item.length !== 0);
    const rows: string[] = str.slice(str.indexOf('\n') + 1).split('\n');

    const filteredRow: string[] = rows.filter((row) => row.length !== 0);

    const arr: Array<Array<string>> = filteredRow.map(function (row: string) {
      const values: string[] = row.split(delimiter);
      const el: string[] = headers.reduce(function (
        object: string[],
        header: string,
        index: number
      ): string[] {
        object.push(values[index]);
        return object;
      },
      []);
      return el;
    });
    return arr;
  }
}

export const fileService = new FileService();
