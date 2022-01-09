export const createURL = (type:number,classId:number):string=>
{
    let url = '';
    switch (type) {
        case 1:
            url = `class/${classId}/grade-table`;
            break;
        case 2:
            url = `class/${classId}/grade-table`;
            break;
        case 3:
            url = `/class/${classId}/grade-reviews`;
            break;
        case 4:
            url = `/class/${classId}/grade-reviews`;
            break;
        default:
            break;
    }
    return url;
}