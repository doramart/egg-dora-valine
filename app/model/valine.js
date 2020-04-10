module.exports = app => {
    const mongoose = app.mongoose
    var shortid = require('shortid');
    var path = require('path');
    var Schema = mongoose.Schema;
    var moment = require('moment')

    var ValineSchema = new Schema({
        _id: {
            type: String,
            'default': shortid.generate
        },
        createTime: {
            type: Date,
        },
        updateTime: {
            type: Date,
        },
        appID: String, // AppID 
        appKey: String, // AppKey 
        masterKey: String, // MasterKey 
        placeholder: String, // placeholder 

    });

    ValineSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    ValineSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    ValineSchema.path('createTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });
    ValineSchema.path('updateTime').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });

    return mongoose.model("Valine", ValineSchema, 'valines');

}