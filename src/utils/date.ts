export const stringToDateDisplay = (input: string) => {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  let dayDisplay = day < 10 ? '0' + day.toString() : day.toString();
  let monthDisplay = month < 10 ? '0' + month.toString() : month.toString();
  let hourDisplay = hour < 10 ? '0' + hour.toString() : hour.toString();
  let minuteDisplay = minute < 10 ? '0' + minute.toString() : minute.toString();

  return `${dayDisplay}/${monthDisplay}/${year}  ${hourDisplay}:${minuteDisplay}`;
};
