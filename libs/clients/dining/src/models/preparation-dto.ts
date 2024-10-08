/* tslint:disable */
/* eslint-disable */
/**
 * Micro-Service Restaurant: Dining Service
 * Dining Service Open API definition
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { PreparedItemDto } from './prepared-item-dto';

/**
 * 
 * @export
 * @interface PreparationDto
 */
export interface PreparationDto {
    /**
     * 
     * @type {string}
     * @memberof PreparationDto
     */
    '_id': string;
    /**
     * 
     * @type {string}
     * @memberof PreparationDto
     */
    'shouldBeReadyAt': string;
    /**
     * 
     * @type {Array<PreparedItemDto>}
     * @memberof PreparationDto
     */
    'preparedItems': Array<PreparedItemDto>;
}

