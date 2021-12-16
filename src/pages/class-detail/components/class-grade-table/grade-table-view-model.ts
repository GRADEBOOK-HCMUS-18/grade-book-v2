import { StudentGradeInfo } from './../../../../shared/models/class-detail-info';
import { makeObservable } from 'mobx';
import * as XLSX from 'xlsx';
import { BaseViewModel ,lineLoadingViewModel, classDetailViewModel} from 'shared/view-models';

export class GradeTableViewModel extends BaseViewModel {
    studentGradeList: StudentGradeInfo[] = [];

    constructor() {
        super();
        makeObservable(this, {})
    }

    downloadTemplateFile (fileType:string):string{
        let output:string= '';
        if (fileType === "xlsx") {
            //prepare data
            const data = null;

            output = JSON.stringify({states: data}, 
              null, 4);
        } else if (fileType === "csv"){
          // Prepare data:
          let contents = [];
          contents.push (["studentId", "fullname"]);
            //prepare data

        }

        return output;
    }

    async uploadStudentList(fileType:string, file: File){

    }

    exportStudentGrade (fileType:string){

    }

    async importStudentGrade (fileType:string, file:File){

    }

    downloadEntireFile(fileType:string)
    {

    }

}
