export const getRoleName = (isTeacherInvitation:boolean):string=>{
    switch(isTeacherInvitation){
        case false:
            return 'học sinh';
        case true:
            return 'giáo viên';
        default:
            return ''
    }
}