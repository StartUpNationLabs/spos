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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { AnnotatedMonsieurAxelMenvoie2 } from '../models';
// @ts-ignore
import type { AnnotationTableSummary } from '../models';
/**
 * RemoteBillingApi - axios parameter creator
 * @export
 */
export const RemoteBillingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteBillingControllerGetBillingSummary: async (groupId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'groupId' is not null or undefined
            assertParamExists('remoteBillingControllerGetBillingSummary', 'groupId', groupId)
            const localVarPath = `/api/remoteBilling/{groupId}`
                .replace(`{${"groupId"}}`, encodeURIComponent(String(groupId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {AnnotatedMonsieurAxelMenvoie2} annotatedMonsieurAxelMenvoie2 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteBillingControllerPartialPayment: async (annotatedMonsieurAxelMenvoie2: AnnotatedMonsieurAxelMenvoie2, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'annotatedMonsieurAxelMenvoie2' is not null or undefined
            assertParamExists('remoteBillingControllerPartialPayment', 'annotatedMonsieurAxelMenvoie2', annotatedMonsieurAxelMenvoie2)
            const localVarPath = `/api/remoteBilling`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(annotatedMonsieurAxelMenvoie2, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RemoteBillingApi - functional programming interface
 * @export
 */
export const RemoteBillingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RemoteBillingApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteBillingControllerGetBillingSummary(groupId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AnnotationTableSummary>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteBillingControllerGetBillingSummary(groupId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteBillingApi.remoteBillingControllerGetBillingSummary']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {AnnotatedMonsieurAxelMenvoie2} annotatedMonsieurAxelMenvoie2 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteBillingControllerPartialPayment(annotatedMonsieurAxelMenvoie2: AnnotatedMonsieurAxelMenvoie2, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteBillingControllerPartialPayment(annotatedMonsieurAxelMenvoie2, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteBillingApi.remoteBillingControllerPartialPayment']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RemoteBillingApi - factory interface
 * @export
 */
export const RemoteBillingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RemoteBillingApiFp(configuration)
    return {
        /**
         * 
         * @param {RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteBillingControllerGetBillingSummary(requestParameters: RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest, options?: RawAxiosRequestConfig): AxiosPromise<Array<AnnotationTableSummary>> {
            return localVarFp.remoteBillingControllerGetBillingSummary(requestParameters.groupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteBillingApiRemoteBillingControllerPartialPaymentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteBillingControllerPartialPayment(requestParameters: RemoteBillingApiRemoteBillingControllerPartialPaymentRequest, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
            return localVarFp.remoteBillingControllerPartialPayment(requestParameters.annotatedMonsieurAxelMenvoie2, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for remoteBillingControllerGetBillingSummary operation in RemoteBillingApi.
 * @export
 * @interface RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest
 */
export interface RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest {
    /**
     * 
     * @type {string}
     * @memberof RemoteBillingApiRemoteBillingControllerGetBillingSummary
     */
    readonly groupId: string
}

/**
 * Request parameters for remoteBillingControllerPartialPayment operation in RemoteBillingApi.
 * @export
 * @interface RemoteBillingApiRemoteBillingControllerPartialPaymentRequest
 */
export interface RemoteBillingApiRemoteBillingControllerPartialPaymentRequest {
    /**
     * 
     * @type {AnnotatedMonsieurAxelMenvoie2}
     * @memberof RemoteBillingApiRemoteBillingControllerPartialPayment
     */
    readonly annotatedMonsieurAxelMenvoie2: AnnotatedMonsieurAxelMenvoie2
}

/**
 * RemoteBillingApi - object-oriented interface
 * @export
 * @class RemoteBillingApi
 * @extends {BaseAPI}
 */
export class RemoteBillingApi extends BaseAPI {
    /**
     * 
     * @param {RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteBillingApi
     */
    public remoteBillingControllerGetBillingSummary(requestParameters: RemoteBillingApiRemoteBillingControllerGetBillingSummaryRequest, options?: RawAxiosRequestConfig) {
        return RemoteBillingApiFp(this.configuration).remoteBillingControllerGetBillingSummary(requestParameters.groupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteBillingApiRemoteBillingControllerPartialPaymentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteBillingApi
     */
    public remoteBillingControllerPartialPayment(requestParameters: RemoteBillingApiRemoteBillingControllerPartialPaymentRequest, options?: RawAxiosRequestConfig) {
        return RemoteBillingApiFp(this.configuration).remoteBillingControllerPartialPayment(requestParameters.annotatedMonsieurAxelMenvoie2, options).then((request) => request(this.axios, this.basePath));
    }
}

