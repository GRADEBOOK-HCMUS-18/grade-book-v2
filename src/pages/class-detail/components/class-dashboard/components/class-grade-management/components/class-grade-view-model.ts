import { BaseViewModel } from 'shared/view-models';
import {observable, action, makeObservable} from 'mobx'
import {GradeCategory} from 'shared/models'


class ClassGradeViewModel extends BaseViewModel{
    gradeStructureList:GradeCategory[]=[]
    
    constructor()
    {
        super();
        let item = new GradeCategory()
        item.id = 1;
        item.title = 'final term';
        item.grade = '10';
        this.gradeStructureList.push(item)

        item = new GradeCategory()
        item.id = 2;
        item.title = 'mid term';
        item.grade = '10';
        this.gradeStructureList.push(item)

        item = new GradeCategory()
        item.id = 3;
        item.title = 'excercise 1';
        item.grade = '10';
        this.gradeStructureList.push(item)

        item = new GradeCategory()
        item.id = 4;
        item.title = 'excercise 2';
        item.grade = '10';
        this.gradeStructureList.push(item)

        makeObservable(this,{
            gradeStructureList:observable,
            fetchGradeStructure:action,
            reorderGradeStructure:action,
            addGradeCategory:action,
            deleteGradeCategory:action,
            updateGradeCategory:action,
        })
    }

    fetchGradeStructure(){
        
    }

    reorderGradeStructure(startIndex:number, finishIndex:number){
        const newArray = Array.from (this.gradeStructureList);
        const temp:GradeCategory = newArray[startIndex];
        newArray.splice(startIndex,1);
        newArray.splice(finishIndex,0,temp);
        this.gradeStructureList= newArray;
    }

    addGradeCategory(value: GradeCategory){
        const newValue :GradeCategory= {
            id: this.gradeStructureList.length+100,
            title: value.title,
            grade: value.grade
        }
        const newArray = Array.from (this.gradeStructureList);
        newArray.push(newValue);
        this.gradeStructureList= newArray;
    }

    deleteGradeCategory(id:number)
    {
        const newList = this.gradeStructureList.filter(item=>item.id!==id)
        this.gradeStructureList = newList;
    }

    updateGradeCategory(id:number, updateValue :GradeCategory)
    {
        console.log(updateValue);
        const item= this.gradeStructureList.find(item=>item.id===id)
        if(item){
            const index = this.gradeStructureList.indexOf(item);
            item.grade = updateValue.grade;
            item.title = updateValue.title;
            this.gradeStructureList.splice(index,1,item);
        }
    }
}

export const classGradeViewModel = new ClassGradeViewModel();
