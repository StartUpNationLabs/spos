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
import type { AnnotatedTableItem } from './annotated-table-item';

/**
 * 
 * @export
 * @interface AnnotationTableSummary
 */
export interface AnnotationTableSummary {
    /**
     * 
     * @type {Array<AnnotatedTableItem>}
     * @memberof AnnotationTableSummary
     */
    'elements': Array<AnnotatedTableItem>;
    /**
     * 
     * @type {number}
     * @memberof AnnotationTableSummary
     */
    'number': number;
}

