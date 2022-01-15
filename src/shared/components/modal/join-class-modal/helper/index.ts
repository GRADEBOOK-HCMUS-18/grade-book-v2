export const translateErrorMessage = (message: string) => {
    switch (message) {
      case 'Invitation string does not exist':
        return 'Link mời không tồn tại';
      case "This user don't allow to join this class":
        return 'Bạn không được phép tham gia lớp học này';
      case 'User already joined this class':
        return 'Người dùng đã tham gia lớp học';
      default:
        return message;
    }
  };