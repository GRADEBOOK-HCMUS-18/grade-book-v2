import { useState } from 'react';
import { useFormFields } from 'shared/hooks';
import {
  RequestEmailForm,
  RequestVerificationCodeForm,
  ResetPasswordForm,
  SuccessMessage,
} from './components';
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

  const handleSendEmailClick = async () => {
    let errorMessage: string = '';
    setIsSendingEmail(true);

    try {
      //errorMesssage = resetPasswordViewModel.verifyIsExistEmail(email);
      setEmailSent(true);
    } catch (error) {
      setIsSendingEmail(false);
    }
    return errorMessage;
  };

  const handleSendCodeClick = async (): Promise<string> => {
    const errorMessage: string = '';
    setIsSendingCode(true);

    try {
      // const params = {
      //   email:fields.email,
      //   code:fields.code
      // }
      //errorMesssage = resetPasswordViewModel.verifyIsValidEmail(params);
      setCodeSent(true);
    } catch (error) {
      setIsSendingCode(false);
    }
    return errorMessage;
  };

  const handleComfirmClick = async (): Promise<string> => {
    const errorMessage: string = '';
    setIsConfirming(true);

    try {
      //errorMesssage = resetPasswordViewModel.updateNewPassword(fields);
      setConfirmed(true);
    } catch (error) {
      setIsConfirming(false);
    }
    return errorMessage;
  };

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
