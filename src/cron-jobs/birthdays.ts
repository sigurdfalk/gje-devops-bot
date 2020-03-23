import boltApp from '../bolt';
import moment from 'moment';

const DEVOPS_USER_GROUP = 'STBBJR0AJ';

const birthdays: Birthday[] = [{
  slackId: 'WT7GV5VP1',
  name: 'Sigurd',
  date: '20.04'
}];

const getTeamMembers = async () =>
  await boltApp.client.usergroups.users.list({
    usergroup: DEVOPS_USER_GROUP,
    token: process.env.SLACK_BOT_TOKEN
  })
    .then(({ users }) => users as string[]);

export const checkIfBirthdayAndSendMessage = async () => {
  const members = await getTeamMembers();

  birthdays
    .filter(cur => moment(cur.date, 'DD.MM').isSame(moment().utc(), 'day'))
    .forEach(birthday => {
      members
        .filter(member => member !== birthday.slackId)
        .forEach(member => {
          boltApp.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: member,
            text: `Psssst! It's <@${birthday.slackId}> birthday today :tada::cake:`
          });
        });
    });
};
