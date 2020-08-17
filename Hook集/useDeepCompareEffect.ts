/*
 * @Author: your name
 * @Date: 2020-08-17 17:32:56
 * @LastEditTime: 2020-08-17 17:33:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /methodsAccumulation/Hook集/useDeepCompareEffect.ts
 */
import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

const deepCompareEquals = (a: any, b: any) => {
  return isEqual(a, b);
}

const useDeepCompareMemoize = (value: any) => {
  const ref = useRef();
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
/**
 * effect依赖深拷贝对比
 * @param effect
 * @param deps
 * @author chenlin
 */
const useDeepCompareEffect: typeof useEffect = (callback: any, dependencies: any) => {
  useEffect(callback, useDeepCompareMemoize(dependencies))
}
export default useDeepCompareEffect;
