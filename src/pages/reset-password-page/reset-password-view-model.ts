import { BASE_URL } from 'shared/constants';
import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';
import { responsiveType } from 'shared/styles';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { ErrorType } from './types';
import { translateApiErrorMessage } from './helper';

class ResetPasswordViewModel extends BaseViewModel{
    private bearerToken:string = '';
    
    async verifyIsEmailExist(email:string):Promise<ErrorType>{
        lineLoadingViewModel.startLoading();

        const res:ErrorType = {
            status:false,
            errorMessage:'',
        }
        
        const response:string|HttpError = await httpService.sendPost(`/Authentication/forgotPassword`, {email:email});

        if(response instanceof HttpError)
        {
            res.status=false;
            res.errorMessage = translateApiErrorMessage('email', response?.getMessage());
        }
        else{
            res.status =true;
        }

        lineLoadingViewModel.stopLoading();

        return res;
    }

    async verifyIsValidCode(email:string, verificationCode:string):Promise<ErrorType>{
        const res:ErrorType = {
            status:false,
            errorMessage:'',
        }

        lineLoadingViewModel.startLoading()

        const response:any|HttpError= await httpService.sendPost(`/Authentication/forgotPassword/code`, {email:email,confirmationCode:verificationCode});
        
        if(response instanceof HttpError)
        {
            res.status=false;
            res.errorMessage = translateApiErrorMessage('code',response.getMessage());
        }
        else{
            res.status =true;
            this.bearerToken = response.token;
        }
        
        lineLoadingViewModel.stopLoading()

        return res;
    }

    async updateNewPassword (newPassword:string):Promise<ErrorType>{
        lineLoadingViewModel.startLoading();
    
        const res:ErrorType = {
            status:false,
            errorMessage:'',
        }

        const response:string|HttpError = await httpService.sendPost(`/user/password`, {password:newPassword}, this.bearerToken);

        if(response instanceof HttpError)
        {
            this.makeError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
        else{
            res.status =true;
            res.errorMessage = '';
        }
        
        lineLoadingViewModel.stopLoading()

        return res;
    }
}

export const resetPasswordViewModel = new ResetPasswordViewModel();