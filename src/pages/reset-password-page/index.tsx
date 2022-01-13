import { useCallback, useState } from 'react';
import { useFormFields } from 'shared/hooks';
import {
  RequestEmailForm,
  RequestVerificationCodeForm,
  ResetPasswordForm,
  SuccessMessage,
} from './components';
import {
  getEmailError,
  getPasswordError,
  getVerificationCodeError,
} from './helper';
import { resetPasswordViewModel } from './reset-password-view-model';
import { ErrorType } from './types';

import './style/index.css';

export const ResetPasswordPage = () => {
  const [fields, handleFieldsChange] = useFormFields({
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSendEmailClick = useCallback(async () => {
    setIsSendingEmail(true);

    let message = getEmailError(fields.email);

    if (message === '') {
      const result: ErrorType = await resetPasswordViewModel.verifyIsEmailExist(
        fields.email
      );

      if (result.status) setEmailSent(true);
      message = result.errorMessage;
    }

    setIsSendingEmail(false);
    setErrorMessage(message);
  }, []);

  const handleSendCodeClick = useCallback(async () => {
    setIsSendingCode(true);

    let message = getVerificationCodeError(fields.code);

    if (message === '') {
      const result: ErrorType = await resetPasswordViewModel.verifyIsValidCode(
        fields.email,
        fields.code
      );

      if (result.status) setCodeSent(true);
      message = result.errorMessage;
    }

    setIsSendingCode(false);
    setErrorMessage(message);
  }, []);

  const handleComfirmClick = useCallback(async () => {
    setIsConfirming(true);

    let message = getPasswordError(fields.password);

    if (message === '') {
      const result: ErrorType = await resetPasswordViewModel.updateNewPassword(
        fields.passsword
      );

      if (result.status) setConfirmed(true);
      message = result.errorMessage;
    }

    setIsConfirming(false);
    setErrorMessage(message);
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
        errorMessage={errorMessage}
      />
    ) : emailSent === true ? (
      <RequestVerificationCodeForm
        fields={fields}
        handleSendCodeClick={handleSendCodeClick}
        handleFieldChange={handleFieldsChange}
        isLoading={isSendingCode}
        errorMessage={errorMessage}
      />
    ) : (
      <RequestEmailForm
        fields={fields}
        handleSendEmailClick={handleSendEmailClick}
        handleFieldChange={handleFieldsChange}
        isLoading={isSendingEmail}
        errorMessage={errorMessage}
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
