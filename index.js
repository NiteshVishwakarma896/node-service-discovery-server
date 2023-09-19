'use strict';
const ServiceDiscovery = require('./lib/ServiceDiscovery');

const app = new ServiceDiscovery(8671);
app.start();

module.exports = require('./lib/ServiceDiscovery')