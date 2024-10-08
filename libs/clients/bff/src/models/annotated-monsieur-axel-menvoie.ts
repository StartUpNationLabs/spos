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
import type { AnnotatedCartItem } from './annotated-cart-item';

/**
 * 
 * @export
 * @interface AnnotatedMonsieurAxelMenvoie
 */
export interface AnnotatedMonsieurAxelMenvoie {
    /**
     * 
     * @type {Array<AnnotatedCartItem>}
     * @memberof AnnotatedMonsieurAxelMenvoie
     */
    'cart': Array<AnnotatedCartItem>;
    /**
     * 
     * @type {string}
     * @memberof AnnotatedMonsieurAxelMenvoie
     */
    'groupId': string;
    /**
     * 
     * @type {number}
     * @memberof AnnotatedMonsieurAxelMenvoie
     */
    'tableNumber': number;
}

