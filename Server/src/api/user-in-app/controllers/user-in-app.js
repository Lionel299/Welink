'use strict';

/**
 * user-in-app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-in-app.user-in-app');
