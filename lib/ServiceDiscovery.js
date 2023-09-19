const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const system = require('../utils/system');
require('dotenv').config();

class ServiceDiscovery {
  constructor(port) {
    this.app = express();
    this.port = process.env.PORT || port;
    this.loggerType = process.env.NODE_ENV === "development"? 'dev' : 'tiny';
    this.registry = {
      instances: {},
    };
    this.app.use(logger(this.loggerType));
    this.app.use(bodyParser.json());
    this.app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', extname: '.handlebars' }));
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'handlebars');
    this.app.post('/service-discovery/apps/:appName', this.registerInstance.bind(this));
    this.app.get('/service-discovery/apps/:appName', this.getInstances.bind(this));
    this.app.get('/service-discovery/apps', this.getAllInstances.bind(this));
    this.app.get('/', this.getSystemInformation.bind(this));
  }

  registerInstance(req, res) {
    const { appName } = req.params;
    const instance = req.body;

    const existingInstances = this.registry.instances[appName] || [];
    const duplicateIndex = existingInstances.findIndex(
        (existingInstance) => existingInstance.instanceId === instance.instanceId
    );

    if (duplicateIndex !== -1) {
        console.log(`Duplicate registration for ${appName} instance: ${instance.instanceId}`);
        return res.status(204).json({ message: 'Duplicate registration.' });
    }

    this.registry.instances[appName] = existingInstances.concat(instance);
    console.log(`Registered ${appName} instance: ${instance.instanceId}`);
    console.log(this.registry.instances[appName]);
    res.sendStatus(204);
  }

  getInstances(req, res) {
    const { appName } = req.params;
    const instances = this.registry.instances[appName] || [];
    return res.status(200).json({ instances });
  }
  
  getAllInstances(req,res){
    const instances = this.registry.instances || [];
    return res.status(200).json(instances)
  }

  getHealthChecks(req,res){

  }

  getSystemInformation(req,res){
    const instances = this.registry.instances || [];
    return res.render('index', {data:system.getSystemInfo(),instances:instances});
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Service discovery server is running on port ${this.port}`);
    });
  }
}

module.exports = ServiceDiscovery;
