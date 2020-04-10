const xss = require("xss");
const _ = require('lodash');

const valineRule = (ctx) => {
    return {

        appID: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("AppID")])
        },


        appKey: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("AppKey")])
        },


        placeholder: {
            type: "string",
            required: true,
            message: ctx.__("validate_error_field", [ctx.__("placeholder")])
        },


    }
}



let ValineController = {

    async list(ctx) {

        try {

            let queryObj = {};

            let valineList = await ctx.service.valine.find({
                isPaging: 0
            }, {
                query: queryObj,
            });

            if (_.isEmpty(valineList)) {
                valineList = [];
                let configInfo = await ctx.service.valine.create({
                    placeholder: '请输入评论',
                    createTime: new Date()
                });
                valineList.push(configInfo);
            }

            ctx.helper.renderSuccess(ctx, {
                data: valineList[0]
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    },


    async getOne(ctx) {

        try {
            let _id = ctx.query.id;

            let targetItem = await ctx.service.valine.item(ctx, {
                query: {
                    _id: _id
                }
            });

            ctx.helper.renderSuccess(ctx, {
                data: targetItem
            });

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }

    },


    async update(ctx) {


        try {

            let fields = ctx.request.body || {};
            const formObj = {


                appID: fields.appID,




                appKey: fields.appKey,




                masterKey: fields.masterKey,
                placeholder: fields.placeholder,



                updateTime: new Date()
            }


            ctx.validate(valineRule(ctx), formObj);



            await ctx.service.valine.update(ctx, fields._id, formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },




}

module.exports = ValineController;