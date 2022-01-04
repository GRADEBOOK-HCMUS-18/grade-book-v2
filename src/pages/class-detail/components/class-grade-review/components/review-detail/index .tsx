import { MessageInput } from './components/message-input';

export const ReviewDetail = () => {
  const onSendMessage = (content: string) => {
    console.log(content);
  };
  return (
    <div className="review-detail-container">
      <div style={{ height: '85%' }}>Message go here</div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
};
