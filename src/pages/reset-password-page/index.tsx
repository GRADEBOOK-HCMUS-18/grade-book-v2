import { useCallback, useState } from 'react';
import { useFormFields } from 'shared/hooks';
import {
  RequestEmailForm,
  RequestVerificationCodeForm,
  ResetPasswordForm,
  SuccessMessage,
} from './components';
import { resetPasswordViewModel } from './reset-password-view-model';
import './style/index.css';

export const ResetPasswordPage = () => {
  const [fields, handleFieldsChange] = useFormFields({
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSendEmailClick = useCallback(async () => {
    setIsSendingEmail(true);
    const result = await resetPasswordViewModel.verifyIsEmailExist(
      fields.email
    );
    if (result) setEmailSent(true);
    else setIsSendingEmail(false);
  }, [resetPasswordViewModel]);

  const handleSendCodeClick = useCallback(async (): Promise<string> => {
    const errorMessage: string = '';
    setIsSendingCode(true);

    try {
      // const params = {
      //   email:fields.email,
      //   code:fields.code
      // }
      //errorMesssage = resetPasswordViewModel.verifyIsValidEmail(email,verificationCode);
      setCodeSent(true);
    } catch (error) {
      setIsSendingCode(false);
    }
    return errorMessage;
  }, [resetPasswordViewModel]);

  const handleComfirmClick = useCallback(async (): Promise<string> => {
    const errorMessage: string = '';
    setIsConfirming(true);

    try {
      //errorMesssage = resetPasswordViewModel.updateNewPassword(fields);
      setConfirmed(true);
    } catch (error) {
      setIsConfirming(false);
    }
    return errorMessage;
  }, []);

  const content =
    confirmed === true ? (
      <SuccessMessage />
    ) : codeSent === true ? (
      <ResetPasswordForm
        fields={fields}
        handleConfirmClick={handleComfirmClick}
        handleFieldChange={handleFieldsChange}
        isLoading={isConfirming}
      />
    ) : emailSent === true ? (
      <RequestVerificationCodeForm
        fields={fields}
        handleSendCodeClick={handleSendCodeClick}
        handleFieldChange={handleFieldsChange}
        isLoading={isSendingCode}
      />
    ) : (
      <RequestEmailForm
        fields={fields}
        handleSendEmailClick={handleSendEmailClick}
        handleFieldChange={handleFieldsChange}
        isLoading={isSendingEmail}
      />
    );
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      {content}
    </div>
  );
};
