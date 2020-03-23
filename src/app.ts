import boltApp from './bolt';
import cronJobs from './cron-jobs';
import {checkIfBirthdayAndSendMessage} from "./cron-jobs/birthdays";

cronJobs();
checkIfBirthdayAndSendMessage();

(async () => {
  await boltApp.start(process.env.PORT || 3000);
  // tslint:disable-next-line:no-console
  console.log('⚡️ Bolt app is running!');
})();
