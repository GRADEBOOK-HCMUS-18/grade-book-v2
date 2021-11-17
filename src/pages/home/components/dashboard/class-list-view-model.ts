import { action, observable, makeObservable,reaction } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { Class} from 'shared/models'
import { httpService } from 'shared/services';
export class ClassListViewModel extends BaseViewModel {
    public Classes: Class[] = []



    constructor() {
        super();

        const cur:Class = {
            id : 123,
            roleOfCurrentUser: 'teacher',
            name :'Web nâng casssssssssss',
            teacherName:'Nguyễn Huy Khánh',
            description:'Web nâng cao',
            room:"2",
            startDate: new Date('11/11/2021')
        }
        this.Classes.push(cur)
        this.Classes.push(cur)
        this.Classes.push(cur)
        this.Classes.push(cur)
        this.Classes.push(cur)

        makeObservable(this, {
            Classes:observable,
            getClasses:action
        });
    }

    async getClasses(){
        const response =  await httpService.sendGet('/class', httpService.getBearerToken())
        console.log(response)
        return response;
    }
}