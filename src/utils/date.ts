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


export const calcReceivedTime= (startAt:Date):string=>
{
    const dateNow = new Date().valueOf();
    const seconds = Math.floor((dateNow - startAt.valueOf()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval).toString() + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval).toString() + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval).toString() + " minutes";
    }
    return Math.floor(seconds).toString() + " seconds";
}