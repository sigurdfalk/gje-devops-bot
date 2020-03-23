import boltApp from './bolt';

(async () => {
  await boltApp.start(process.env.PORT || 3000);
  // tslint:disable-next-line:no-console
  console.log('⚡️ Bolt app is running!');
})();
