'use strict';

/**
 * user-in-app service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-in-app.user-in-app');
