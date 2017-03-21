/* Memcached */
let memjs = require('memjs');
let mc = memjs.Client.create('pub-memcache-16411.eu-central-1-1.1.ec2.redislabs.com:16411', {
  username: 'root',
  password: 'toor'
}); 

module.exports = mc