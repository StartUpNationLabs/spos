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



/**
 * 
 * @export
 * @interface MenuItem
 */
export interface MenuItem {
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    '_id': string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    'fullName': string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    'shortName': string;
    /**
     * 
     * @type {number}
     * @memberof MenuItem
     */
    'price': number;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    'category': MenuItemCategoryEnum;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    'image': string;
}

export const MenuItemCategoryEnum = {
    Starter: 'STARTER',
    Main: 'MAIN',
    Dessert: 'DESSERT',
    Beverage: 'BEVERAGE'
} as const;

export type MenuItemCategoryEnum = typeof MenuItemCategoryEnum[keyof typeof MenuItemCategoryEnum];

