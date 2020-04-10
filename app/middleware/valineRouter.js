const _ = require('lodash');
const valineAdminController = require('../controller/manage/valine')
const valineApiController = require('../controller/api/valine')

module.exports = (options, app) => {

    return async function valineRouter(ctx, next) {

        let pluginConfig = app.config.doraValine;
        await app.initPluginRouter(ctx, pluginConfig, valineAdminController, valineApiController);
        await next();

    }

}