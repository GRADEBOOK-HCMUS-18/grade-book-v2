export class SingleClass {
    id:number= 0
    roleOfCurrentUser:string=""
    name:string=""
    room:string = ""
    startDate:Date= new Date()
    description:string = ''
    mainTeacher: MainTeacher  = new MainTeacher()
    inviteStringStudent:string = ''
    InviteStringTeacher:string = ''
}

export class MainTeacher{
email:string = ""
firstName:string= ""
lastName:string =""  
profilePictureUrl:string = ''
defaultProfilePictureHex:string  = '' 
displayName?:string = ''

}

export class ClassListResponse{
    classList:SingleClass[] = []
}