'use strict';

module.exports = {
  app: {
    title: 'Cobot Reservations',
    description: 'Visualize the room reservations of a Cobot instance',
    keywords: 'cobot, visualization, reservations'
  },
  port: process.env.['PORT'] || 8080,
  cobot: {
    host: process.env['COBOT_HOST'],
    client_id: process.env['COBOT_CLIENT_ID'],
    client_secret: process.env['COBOT_CLIENT_SECRET'],
    username: process.env['COBOT_USERNAME'],
    password: process.env['COBOT_PASSWORD']
  }
}
