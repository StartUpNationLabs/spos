/* tslint:disable */
/* eslint-disable */
/**
 * Payment Sharing API
 * Payment Sharing API
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
import type { PaymentResponseItemDTO } from './payment-response-item-dto';

/**
 * 
 * @export
 * @interface PaymentResponseTableDTO
 */
export interface PaymentResponseTableDTO {
    /**
     * 
     * @type {number}
     * @memberof PaymentResponseTableDTO
     */
    'number': number;
    /**
     * 
     * @type {Array<PaymentResponseItemDTO>}
     * @memberof PaymentResponseTableDTO
     */
    'elements': Array<PaymentResponseItemDTO>;
}
