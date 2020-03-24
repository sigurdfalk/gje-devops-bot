import boltApp from '../bolt';
import moment from 'moment';

const DEVOPS_USER_GROUP = 'STBBJR0AJ';

const birthdays: Birthday[] = [{
  slackId: 'WT7GV5VP1',
  name: 'Sigurd',
  date: '20.04'
}, {
  slackId: 'WT8UT7WNB',
  name: 'Hassan',
  date: '06.10'
}, {
  slackId: 'WSTNZA04T',
  name: 'Rasmus',
  date: '26.12'
}, {
  slackId: 'WT2GGFBT2',
  name: 'Asaad',
  date: '30.11'
}, {
  slackId: 'WTK5A1XPV',
  name: 'Morten',
  date: '05.03'
}, {
  slackId: 'WUBFMTCCE',
  name: 'Roger',
  date: '30.05'
}, {
  slackId: 'WT57JJN3X',
  name: 'Varun',
  date: '23.05'
}, {
  slackId: 'WT70SFZ5M',
  name: 'Alexander',
  date: '22.01'
}, {
  slackId: 'WT7393A6T',
  name: 'Tom Christian',
  date: '20.02'
}, {
  slackId: 'WT4AA4B71',
  name: 'Magnus',
  date: '15.03'
}, {
  slackId: 'WT51772AU',
  name: 'Øyvind',
  date: '28.11'
}, {
  slackId: 'WSTNZ9KJ7',
  name: 'Ritesh',
  date: '27.02'
}, {
  slackId: 'WV1QRNHUZ',
  name: 'Eddy',
  date: '11.10'
}, {
  slackId: 'WUPDHPDQR',
  name: 'Brage',
  date: '12.07'
}];

const getUserGroupMembers = async () =>
  await boltApp.client.usergroups.users.list({
    usergroup: DEVOPS_USER_GROUP,
    token: process.env.SLACK_BOT_TOKEN
  })
    .then(({ users }) => users as string[]);

export const checkIfBirthdayAndSendMessage = async () => {
  const members = await getUserGroupMembers();

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
