const { envalid } = require('@base-cms/tooling');

const { custom, cleanEnv, num } = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  BRIGHTCOVE_ACCOUNT_ID: num({ desc: 'The Brightcove account ID' }),
  BRIGHTCOVE_CLIENT_ID: nonemptystr({ desc: 'The Brightcove CMS API OAuth client_id.' }),
  BRIGHTCOVE_CLIENT_SECRET: nonemptystr({ desc: 'The Brightcove CMS API OAuth client_secret.' }),
  PORT: num({ default: 80 }),
  EXPOSED_PORT: num({ default: 80 }),
});
