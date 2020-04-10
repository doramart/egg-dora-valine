const path = require("path");
const _ = require('lodash');
const nunjucks = require('nunjucks');
const fs = require('fs');



let ValineController = {

    async hookRender(ctx) {

        try {
            let hookname = ctx.query.hookname;

            if (!hookname) {
                throw new Error(ctx.__('validate_error_params'));
            }

            let targetPath = path.join(__dirname, "../../view");
            let targetTempPath = `${targetPath}/${'hooks_'+hookname}.html`;

            if (!fs.existsSync(targetTempPath)) {
                throw new Error(ctx.__('validate_error_params'));
            }

            let valineList = await ctx.service.valine.find({
                isPaging: 0
            });
            let tempStr = "";

            if (!_.isEmpty(valineList)) {
                let {
                    appID,
                    appKey,
                    placeholder
                } = valineList[0];
                tempStr = nunjucks.render(targetTempPath, {
                    appID,
                    appKey,
                    placeholder
                });
            }

            ctx.helper.renderSuccess(ctx, {
                data: tempStr
            });
        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    }

}

module.exports = ValineController;