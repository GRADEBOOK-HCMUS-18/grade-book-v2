import { action, makeObservable, observable } from "mobx"
import {classDetailViewModel, BaseViewModel } from 'shared/view-models';
import { LOCAL_URL } from 'shared/constants';
import { httpService } from "shared/services";
import { HttpError } from 'shared/errors';

 class ClassMemberViewModel extends BaseViewModel {
    showInsertEmailModal:boolean = false;
    isEmailForInvitingTeacher:boolean = false;
    constructor()
    {
        super()
        makeObservable(this,{
            showInsertEmailModal:observable,
            
            setShowInsertEmailModal:action,
        })
    }

    setShowInsertEmailModal(value:boolean)
    {
        this.showInsertEmailModal= value;
    }

    setIsEmailForInvitingTeacher(value:boolean)
    {
        this.isEmailForInvitingTeacher= value;
    }

    async sendEmailList (emailList:string[]){
        const {id,inviteStringStudent,inviteStringTeacher} = classDetailViewModel.classInfo
        const inviteID = this.isEmailForInvitingTeacher?inviteStringTeacher:inviteStringStudent;
        const urlToSent= `${LOCAL_URL}/class/${id}?invite=${inviteID}`
        const role = this.isEmailForInvitingTeacher?'teacher':'student';
        const body ={
            "mailList": emailList,
            "isEmailForInvitingTeacher": this.isEmailForInvitingTeacher,
            "mailSubject": `You has been invited as a ${role} in GradeBook App`,
            "urlToSend": urlToSent,
            "mailContent": "Come to my class"
          }
        const response: any|HttpError= await httpService.sendPost('/Invite/email/send', body, httpService.getBearerToken());
        if(response instanceof HttpError)
        {
            this.makeError('Không thể gửi email, xin vui lòng thử lại sau')
            return false;
        }
        return true;
    }
}

export const classMemberViewModel = new ClassMemberViewModel();