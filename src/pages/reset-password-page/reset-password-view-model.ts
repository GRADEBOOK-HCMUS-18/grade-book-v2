import { BaseViewModel } from 'shared/view-models';

class ResetPasswordViewModel extends BaseViewModel{
    async verifyIsEmailExist(email:string):Promise<string>{
        return 'false';
    }

    async verifyIsValidEmail(email:string, verificationCode:string):Promise<string>{
        return '';
    }

}

export const resetPasswordViewModel = new ResetPasswordViewModel();