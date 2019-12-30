const client = require('scp2');
const fs = require('fs');
const config = require('../config/server.config.production');

client.addListener('transfer', (a, b, c) => {
  console.log(a, b, c);
});
const defaultOptions = {
  host: '118.24.75.69',
  username: 'ubuntu',
  privateKey: fs.readFileSync('/Users/eatong/certificate/eaTong_pem'),
  passphrase: '',
  path: '/home/ubuntu/iget-build'
};
client.scp('build/', config.ssh || defaultOptions, function (err, ...args) {
  console.log(err, ...args);
});
