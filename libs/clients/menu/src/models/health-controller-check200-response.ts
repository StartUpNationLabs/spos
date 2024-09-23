/* tslint:disable */
/* eslint-disable */
/**
 * Micro-Service Restaurant: Menu Service
 * Menu Service Open API definition
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
import type { HealthControllerCheck200ResponseInfoValue } from './health-controller-check200-response-info-value';

/**
 * 
 * @export
 * @interface HealthControllerCheck200Response
 */
export interface HealthControllerCheck200Response {
    /**
     * 
     * @type {string}
     * @memberof HealthControllerCheck200Response
     */
    'status'?: string;
    /**
     * 
     * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
     * @memberof HealthControllerCheck200Response
     */
    'info'?: { [key: string]: HealthControllerCheck200ResponseInfoValue; } | null;
    /**
     * 
     * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
     * @memberof HealthControllerCheck200Response
     */
    'error'?: { [key: string]: HealthControllerCheck200ResponseInfoValue; } | null;
    /**
     * 
     * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
     * @memberof HealthControllerCheck200Response
     */
    'details'?: { [key: string]: HealthControllerCheck200ResponseInfoValue; };
}
