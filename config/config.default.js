'use strict'

/**
 * egg-dora-valine default config
 * @member Config#eggDoraValine
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.doraValine = {
    alias: 'valine', // 插件目录，必须为英文
    pkgName: 'egg-dora-valine', // 插件包名
    enName: 'doraValine', // 插件名
    name: 'valine评论', // 插件名称
    description: 'valine评论', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有
    isindex: 1, // 是否需要前台展示，1：需要，0：不需要
    version: pkgInfo.version, // 版本号
    iconName: 'icon_comments', // 主菜单图标名称
    adminUrl: '/valine/js/app.js',
    adminApi: [{
        url: 'valine/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取valine评论列表',
    }, {
        url: 'valine/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条valine评论信息',
    }, {
        url: 'valine/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新valine评论信息',
    }],
    fontApi: [{
        url: 'valine/hookRender',
        method: 'get',
        controllerName: 'hookRender',
        details: '获取渲染html数据',
    }],
    initData: '', // 初始化数据脚本
    hooks: ['messageBoard'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
    pluginsConfig: ` 
    exports.doraValine = {\n
        enable: true,\n        package: 'egg-dora-valine',\n
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    valineRouter:{\n
        match: [ctx => ctx.path.startsWith('/manage/valine'), ctx => ctx.path.startsWith('/api/valine')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}