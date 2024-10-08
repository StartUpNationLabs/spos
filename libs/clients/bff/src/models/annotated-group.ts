/* tslint:disable */
/* eslint-disable */
/**
 * BFF API
 * Backend For Frontend API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { TableDto } from './table-dto';

/**
 * 
 * @export
 * @interface AnnotatedGroup
 */
export interface AnnotatedGroup {
    /**
     * 
     * @type {string}
     * @memberof AnnotatedGroup
     */
    'id': string;
    /**
     * 
     * @type {Array<TableDto>}
     * @memberof AnnotatedGroup
     */
    'tables': Array<TableDto>;
    /**
     * 
     * @type {string}
     * @memberof AnnotatedGroup
     */
    'offer': string;
}

