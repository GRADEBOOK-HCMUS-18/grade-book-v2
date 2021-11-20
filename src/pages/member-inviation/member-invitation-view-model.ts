import React from 'react'
import { observable,makeObservable,action } from 'mobx'
import { BaseViewModel, userViewModel } from 'shared/view-models'
import {User} from 'shared/models'

export class MemberInvitationViewModel extends BaseViewModel{
    user: User = new User();
    inviteID:string = ''
    roleOfInviteID:string = 'teacher'
    constructor()
    {
        super()
        makeObservable(this,{
            user:observable,
            inviteID:observable,
            roleOfInviteID:observable,
            getUser:action
        });
    }

    //user
    getUser(){
        this.user = userViewModel.getUser()
        return this.user
    }

    //inviteID
    setInviteID(value:string){
        this.inviteID=value;
    }

    //class
    async getClassInfo(){
        this.startLoading();
        this.stopLoading()
    }
}
