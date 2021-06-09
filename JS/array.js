/*
 * @Author: your name
 * @Date: 2020-08-17 16:24:25
 * @LastEditTime: 2020-08-17 16:24:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS方法/array.js
 */

// 生成指定长度数组
const List = (len) => [...new Array(len).keys()];
const list = List(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//数组去重
const list = [1, 1, 2, 3, 6, 45, 8, 5, 4, 6, 5];
const uniqueList = [...new Set(list)];

//遍历类数组
const obj = {a:{a:2,b:3},b:{a:3,b:5,},c:{a:5,b:8,}}; 
[].prototype.forEach.call(obj,(ele,index)=>{console.log(ele)});
