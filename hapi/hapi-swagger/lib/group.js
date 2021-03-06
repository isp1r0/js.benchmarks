'use strict';
const Utilities = require('../lib/utilities');
const group = module.exports = {};



/**
 * append group property with name created from url path segments
 *   - adds group property to route
 *   - returns array of group names
 *
 * @param  {Int} pathPrefixSize
 * @param  {Array} routes
 * @return {Array}
 */
group.appendGroupByPath = function (pathPrefixSize, basePath, routes) {

    let out = [];

    routes.forEach( (route) => {
        let prefix = group.getNameByPath(pathPrefixSize, basePath, route.path);
        // append tag reference to route
        route.group = [prefix];
        if (out.indexOf(prefix) === -1) {
            out.push(prefix);
        }
    });

    return out;
};


/**
 * get a group name from url path segments
 *
 * @param  {Int} pathPrefixSize
 * @param  {String} path
 * @return {Array}
 */
group.getNameByPath = function (pathPrefixSize, basePath, path) {

    let i = 0;
    let pathHead = [];
    let parts = path.split('/');

    while (parts.length > 0) {
        let item = parts.shift();
        if (item !== '') {
            pathHead.push(item);
            i++;
        }
        if (i >= pathPrefixSize) {
            break;
        }
    }
    let name = pathHead.join('/');
    if (basePath !== '/' && Utilities.startWith('/' + name, basePath)) {
        name = ('/' + name).replace(basePath, '');
        if (Utilities.startWith(name, '/')) {
            name = name.replace('/', '');
        }
    }
    return name;
};
