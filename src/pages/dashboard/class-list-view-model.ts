import { action, observable, makeObservable } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { Class} from 'shared/models'

export class ClassListViewModel extends BaseViewModel {
    public Classes: Class[] = []


    constructor() {
        super();
        const cur:Class = {
            classID : '123',
            className :'Web nâng casssssssssss',
            teacherID:'1234',
            teacherName:'Nguyễn Huy Khánh',
            description:'Web nâng cao',
            room:"2",
            createdAt: new Date('11/11/2021')
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