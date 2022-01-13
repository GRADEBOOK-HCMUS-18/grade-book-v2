import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCountdownTimer, useFormFields } from 'shared/hooks';
import { PopupAlert } from 'shared/components';
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
import { ResetPasswordViewModel } from './reset-password-view-model';
import { ErrorType } from './types';
import './style/index.css';

export const ResetPasswordPage = () => {
  const [viewModel] = useState(new ResetPasswordViewModel());
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
  const history = useHistory();
  //start countdown with 10 minutes
  const timer: {
    countdown: number;
    startCountDown: () => void;
    pauseCountDown: () => void;
  } = useCountdownTimer(1000 * 10);

  useEffect(() => {
    if (emailSent) timer.startCountDown();
    if (codeSent) timer.pauseCountDown();
  }, [emailSent, codeSent]);

  useEffect(() => {
    if (timer.countdown == 0) timer.pauseCountDown();
  }, [timer.countdown]);

  const handleSendEmailClick = useCallback(async () => {
    setIsSendingEmail(true);

    let message = getEmailError(fields.email);

    if (message === '') {
      const result: ErrorType = await viewModel.verifyIsEmailExist(
        fields.email
      );

      if (result.status) setEmailSent(true);
      message = result.errorMessage;
    }

    setIsSendingEmail(false);
    setErrorMessage(message);
  }, [fields.email, viewModel]);

  const handleSendCodeClick = useCallback(async () => {
    setIsSendingCode(true);

    let message = getVerificationCodeError(fields.code);

    if (message === '') {
      const result: ErrorType = await viewModel.verifyIsValidCode(
        fields.email,
        fields.code
      );

      if (result.status) setCodeSent(true);
      message = result.errorMessage;
    }

    setIsSendingCode(false);
    setErrorMessage(message);
  }, [fields.code, fields.email, viewModel]);

  const handleComfirmClick = useCallback(async () => {
    setIsConfirming(true);

    let message = getPasswordError(fields.password, fields.confirmPassword);

    if (message === '') {
      const result: ErrorType = await viewModel.updateNewPassword(
        fields.password
      );

      if (result.status) setConfirmed(true);
      message = result.errorMessage;
    }

    setIsConfirming(false);
    setErrorMessage(message);
  }, [fields.password, viewModel]);

  const onHide = useCallback(() => {
    viewModel.deleteError();
    history.push('/login');
  }, [history, viewModel]);

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
        countdown={timer.countdown}
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
    <div>
      {' '}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        {content}
      </div>
      <PopupAlert
        show={viewModel.isError}
        error={true}
        onHide={onHide}
        message={viewModel.message}
      />
    </div>
  );
};
