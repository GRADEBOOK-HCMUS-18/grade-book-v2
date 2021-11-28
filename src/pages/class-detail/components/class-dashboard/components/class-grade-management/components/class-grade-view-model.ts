import {observable, action, makeObservable} from 'mobx'
import { BaseViewModel,lineLoadingViewModel, classDetailViewModel} from 'shared/view-models';
import {GradeCategory} from 'shared/models'
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';

export class ClassGradeViewModel extends BaseViewModel{
    gradeStructureList:GradeCategory[]=[]
    
    constructor()
    {
        super();
        makeObservable(this,{
            gradeStructureList:observable,
            fetchGradeStructure:action,
            reorderGradeStructure:action,
            addGradeCategory:action,
            deleteGradeCategory:action,
            updateGradeCategory:action,
        })
    }

    async fetchGradeStructure(){
        const {id} = classDetailViewModel.classInfo;
        lineLoadingViewModel.startLoading();

        const response:GradeCategory[]|HttpError =await httpService.sendGet(`/Class/${id}/assignment`, httpService.getBearerToken())
        if(response instanceof HttpError){
            this.makeError('Không thể tải được trang, vui lòng thử lại sau')
            lineLoadingViewModel.stopLoading();
            return false;
        }
        else{
            this.gradeStructureList = response;
            lineLoadingViewModel.stopLoading();
            return true;
        }
        
    }

    async reorderGradeStructure(startIndex:number, finishIndex:number){
        const {id} = classDetailViewModel.classInfo;
    
        const newArray = Array.from (this.gradeStructureList);
        const temp:GradeCategory = newArray[startIndex];
    
        newArray.splice(startIndex,1);
        newArray.splice(finishIndex,0,temp);
    
        const orderArray:number[] = newArray.map(item=>item.id)
        const body ={
            assignmentIdPriorityOrder:orderArray,
        }
        const response:GradeCategory[]|HttpError =await  httpService.sendPut(`/class/${id}/assignment/priority`,body, httpService.getBearerToken());

        if(response instanceof HttpError)
        {
            this.makeError("Đổi thứ tự không thành công, vui lòng thử lại sau");
            return false;
        }
        else{
            this.gradeStructureList= newArray;
            return true;
        }
    
    }

    async addGradeCategory(value: GradeCategory){
        const {id} = classDetailViewModel.classInfo;
        lineLoadingViewModel.startLoading();
        const body:any= {
            name: value.name,
            point: value.point
        }
        const response: GradeCategory|HttpError = await httpService.sendPost(`/class/${id}/assignment`,body, httpService.getBearerToken());
        if(response instanceof HttpError)
        {
            this.makeError('Không thể tạo bài tập mới, vui lòng thử lại sau')
            lineLoadingViewModel.stopLoading();
            return false;
        }
        else
        {
            const newArray:GradeCategory[] = Array.from(this.gradeStructureList);
            newArray.push(response);
            this.gradeStructureList=newArray;

            lineLoadingViewModel.stopLoading();
            return true;
        }
    }

    async deleteGradeCategory(assignmentId:number)
    {
        const {id} = classDetailViewModel.classInfo;
        const temp = this.gradeStructureList.find(item=>item.id ===assignmentId);
        if(temp){
            lineLoadingViewModel.startLoading();
            const index = this.gradeStructureList.indexOf(temp);
            const response: string|HttpError = await httpService.sendDelete(`/class/${id}/assignment/${assignmentId}`, httpService.getBearerToken());
            if(response instanceof HttpError){
                this.makeError('Không thể xóa bài tập, vui lòng thử lại sau')
                lineLoadingViewModel.stopLoading();
                return false;
            }
            else{
                const newArray = Array.from(this.gradeStructureList);
                newArray.splice(index,1);
                this.gradeStructureList=newArray;

                lineLoadingViewModel.stopLoading();
                return true;
            }
        }
    }

    async updateGradeCategory(assignmentId:number, updateValue :GradeCategory)
    {
        const {id} = classDetailViewModel.classInfo;
        const temp= this.gradeStructureList.find(item=>item.id===assignmentId)
        if(temp){
            lineLoadingViewModel.startLoading();
            const index = this.gradeStructureList.indexOf(temp);
            const body:any = {name:updateValue.name, point:updateValue.point}
            
            const response: GradeCategory|HttpError = await httpService.sendPut(`/class/${id}/assignment/${assignmentId}`,body, httpService.getBearerToken());
            
            if(response instanceof HttpError){
                this.makeError('Không thể thay đổi nội dung, vui lòng thử lại sau')
                lineLoadingViewModel.stopLoading();
            }
            else{
                temp.name =updateValue.name;
                temp.point = updateValue.point;

                const newArray = Array.from(this.gradeStructureList);
                newArray.splice(index,1,temp);
                this.gradeStructureList=newArray;
                
                lineLoadingViewModel.stopLoading();
                return false;
            }
        }
    }
}

export const classGradeViewModel = new ClassGradeViewModel();
