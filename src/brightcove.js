const fetch = require('node-fetch');

const {
  BRIGHTCOVE_CLIENT_ID: clientId,
  BRIGHTCOVE_CLIENT_SECRET: clientSecret,
  BRIGHTCOVE_ACCOUNT_ID: accountId,
} = require('./env');

const { log } = console;

const getAccessToken = async () => {
  const response = await fetch('https://oauth.brightcove.com/v4/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${clientId}:${clientSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (!response.ok) {
    log('Bad Response', response);
    throw new Error('Invalid credentials, check client id secret and account id.');
  }
  const { access_token: token } = await response.json();
  return token;
};

const retrieveVideo = async (videoId) => {
  const accessToken = await getAccessToken();
  const url = `https://cms.api.brightcove.com/v1/accounts/${accountId}/videos/${videoId}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    log('Bad Response', response);
    throw new Error('Bad response from Brightcove API');
  }
  return response.json();
};

module.exports = async (id) => {
  const video = await retrieveVideo(id);
  // @todo pull out more details
  return { ...video };
};
