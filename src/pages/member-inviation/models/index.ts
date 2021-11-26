import { SingleClass } from 'pages/home/models';

export class InvitationResponse {
  isAlreadyInClass: boolean = false;
  currentRoleInClass: string = '';
  isTeacherInvitation: false = false;
  classInformation: SingleClass = new SingleClass();
}
