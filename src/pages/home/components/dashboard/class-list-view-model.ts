import { action, observable, makeObservable } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { Class} from 'shared/models'

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
            Classes:observable
        });
    }


}