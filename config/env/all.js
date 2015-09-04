'use strict';

module.exports = {
  app: {
    title: 'Unconfigured Cobot Reservations',
    description: 'Visualize the room reservations of a Cobot instance',
    keywords: 'cobot, visualization, reservations'
  },
  port: 3000,
  cobot: {
    host: ('COBOT_HOST' in process.env?process.env['COBOT_HOST']:''),
    client_id: ('COBOT_CLIENT_ID' in process.env?process.env['COBOT_CLIENT_ID']:''),
    client_secret: ('COBOT_CLIENT_SECRET' in process.env?process.env['COBOT_CLIENT_SECRET']:''),
    username: ('COBOT_USERNAME' in process.env?process.env['COBOT_USERNAME']:''),
    password: ('COBOT_PASSWORD' in process.env?process.env['COBOT_PASSWORD']:'')
  }
}
