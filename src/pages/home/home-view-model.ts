import { action, observable, makeObservable } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { ClassInfo } from 'shared/models';
import { httpService } from 'shared/services';
export class HomeViewModel extends BaseViewModel {
  allClass: ClassInfo[] = [];

  constructor() {
    super();

    const cur: ClassInfo = {
      id: 123,
      roleOfCurrentUser: 'teacher',
      name: 'Web nâng cao',
      teacherName: 'Nguyễn Huy Khánh',
      description: 'Web nâng cao',
      room: '2',
      startDate: new Date('11/11/2021'),
    };
    this.allClass.push(cur);

    makeObservable(this, {
      allClass: observable,
      getAllClass: action,
    });
  }

  async getAllClass() {
    const response = await httpService.sendGet(
      '/class',
      httpService.getBearerToken()
    );
    console.log(response);
    return response;
  }
}
