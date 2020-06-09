import { Injectable } from '@angular/core';
import en from '../assets/i18n/en'

/**
 * This class is used to convert the ts config file({$lang}.ts)
 * to hierarchy object. So the translations can be used as following format:
 * 
 * Static:
 * {{translations.KEY.SUBKEY1.SUBKEY2} | translate}
 * 
 * Dynamic:
 * {{ translations.KEY.Test {var} | translate: {var: 123} }}
 */

/**
 * Generic Class
 */
export function GenericClass<Props>(): new () => Props {
  return class {} as any;
}

/**
 * Concat path with object hierarchy
 * @param path existing path
 * @param suffix key or suffix
 */
function concatIfExistsPath(path: string, suffix: string): string {
  return path ? `${path}.${suffix}` : suffix;
}

/**
 * Transform object to path
 * @param suffix key or suffix
 * @param objectToTransformOrEndOfPath object to transform or end of path
 * @param path current path
 */
function transformObjectToPath<T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = ''
): T {
  return typeof objectToTransformOrEndOfPath === 'object'
    ? Object.entries(objectToTransformOrEndOfPath).reduce(
        (objectToTransform, [key, value]) => {
          objectToTransform[key] = transformObjectToPath(
            key,
            value,
            concatIfExistsPath(path, suffix)
          );
          return objectToTransform;
        },
        {} as T
      )
    : (concatIfExistsPath(path, suffix) as T);
}

@Injectable()
export class TranslationsOB extends GenericClass<typeof en>() {
  constructor() {
    super();
    Object.assign(this, transformObjectToPath('', en));
  }
}