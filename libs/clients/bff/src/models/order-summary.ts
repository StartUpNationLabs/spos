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
import type { PreparationStatus } from './preparation-status';

/**
 * 
 * @export
 * @interface OrderSummary
 */
export interface OrderSummary {
    /**
     * 
     * @type {{ [key: string]: { [key: string]: Array<PreparationStatus>; }; }}
     * @memberof OrderSummary
     */
    'summary': { [key: string]: { [key: string]: Array<PreparationStatus>; }; };
}

