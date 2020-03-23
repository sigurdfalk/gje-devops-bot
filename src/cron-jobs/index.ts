import cron from 'node-cron';
import { checkIfBirthdayAndSendMessage } from './birthdays';

const cronJobs = () => {
  // tslint:disable-next-line:no-console
  console.log('⏰ CronJobs loaded!');

  // Birthday weekday
  cron.schedule(
    '30 8 * * MON,TUE,WED,THU,FRI',
    () => {
      checkIfBirthdayAndSendMessage();
    },
    {
      scheduled: true,
      timezone: 'Europe/Stockholm'
    }
  );

  // Birthday Weekend
  cron.schedule(
    '0 12 * * SAT,SUN',
    () => {
      checkIfBirthdayAndSendMessage();
    },
    {
      scheduled: true,
      timezone: 'Europe/Stockholm'
    }
  );
};

export default cronJobs;
