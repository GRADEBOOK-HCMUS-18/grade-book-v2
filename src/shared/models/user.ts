export class User {
  role: 'TEACHER' | 'STUDENT' | null = null;
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  displayName: string = '';
  studentIdentification: string | null = null;
  profilePictureUrl: string = '';
  defaultProfilePictureHex: string = '';
  isPasswordNotSet: boolean = false;

  static map(user: User) {
    const temp = new User();
    temp.defaultProfilePictureHex = user.defaultProfilePictureHex;
    temp.displayName = user.displayName;
    temp.profilePictureUrl = user.profilePictureUrl;
    temp.firstName = user.firstName;
    temp.lastName = user.lastName;
    temp.email = user.email;
    temp.studentIdentification = user.studentIdentification;
    temp.role = user.role;
    temp.isPasswordNotSet = user.isPasswordNotSet;
    return temp;
  }
}
