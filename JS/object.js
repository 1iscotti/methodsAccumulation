/*
 * @Author: your name
 * @Date: 2020-08-17 16:24:34
 * @LastEditTime: 2020-08-17 16:24:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS方法/object.js
 */
//判断object类型
const type = (data) => Object.prototype.toString.call(data)
                     .replace(/^\[object (.+)\]$/, '$1')
                     .toLowerCase()
type({})//object