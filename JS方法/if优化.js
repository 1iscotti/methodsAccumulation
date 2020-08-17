/*
 * @Author: your name
 * @Date: 2020-08-17 16:26:21
 * @LastEditTime: 2020-08-17 16:27:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/JS方法/if优化.js
 */

const handleDifferentType = (type) => {
  switch (type) {
    case 'type1':
      // do something
      break;
    case 'type2':
      // do something
      break;
    default:
      // do some default
      break;
  }
  }
  
  const handleDifferentType = (type) => {
  if (type === 'type1') {
    // do something
    return
  }
  if (type === 'type2') {
    // do something
    return
  }
  if (type === 'type3') {
    // do something
    return
  }
  // do some default
  return 
  }
  const handdleNestedConditions = (id, type) => {
    if (id === 1) {
        if (type === 2) {
          // do something
        } else {
          // do something
        }
      } else if (id === 2) {
        if (type === 3) {
          // do something
        }
    } else {
        console.log('default: ');
    }
  }
  
  const handleId = {
    1: (type) => {
        if (type === 2) {
          // do something
          console.log('2');
        } else {
          // do something
          console.log('1');
        }
    },
    2: (type) => {
        if (type === 3) {
            // do something
          console.log('3');
        }  
      }
  }
  const getClientStatus = (clients) => {
    clients.forEach((client) => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
  }