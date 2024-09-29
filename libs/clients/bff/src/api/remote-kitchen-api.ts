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
import type { AnnotatedMonsieurAxelMenvoie } from '../models';
// @ts-ignore
import type { OrderSummary } from '../models';
/**
 * RemoteKitchenApi - axios parameter creator
 * @export
 */
export const RemoteKitchenApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerGetOrdersByGroupId: async (groupId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'groupId' is not null or undefined
            assertParamExists('remoteKitchenControllerGetOrdersByGroupId', 'groupId', groupId)
            const localVarPath = `/api/remoteKitchen`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (groupId !== undefined) {
                localVarQueryParameter['groupId'] = groupId;
            }


    
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
         * @param {AnnotatedMonsieurAxelMenvoie} annotatedMonsieurAxelMenvoie 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerRemoveFromKitchen: async (annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'annotatedMonsieurAxelMenvoie' is not null or undefined
            assertParamExists('remoteKitchenControllerRemoveFromKitchen', 'annotatedMonsieurAxelMenvoie', annotatedMonsieurAxelMenvoie)
            const localVarPath = `/api/remoteKitchen`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(annotatedMonsieurAxelMenvoie, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {AnnotatedMonsieurAxelMenvoie} annotatedMonsieurAxelMenvoie 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerSendToKitchen: async (annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'annotatedMonsieurAxelMenvoie' is not null or undefined
            assertParamExists('remoteKitchenControllerSendToKitchen', 'annotatedMonsieurAxelMenvoie', annotatedMonsieurAxelMenvoie)
            const localVarPath = `/api/remoteKitchen`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(annotatedMonsieurAxelMenvoie, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RemoteKitchenApi - functional programming interface
 * @export
 */
export const RemoteKitchenApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RemoteKitchenApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteKitchenControllerGetOrdersByGroupId(groupId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OrderSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteKitchenControllerGetOrdersByGroupId(groupId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteKitchenApi.remoteKitchenControllerGetOrdersByGroupId']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {AnnotatedMonsieurAxelMenvoie} annotatedMonsieurAxelMenvoie 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteKitchenControllerRemoveFromKitchen(annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteKitchenControllerRemoveFromKitchen(annotatedMonsieurAxelMenvoie, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteKitchenApi.remoteKitchenControllerRemoveFromKitchen']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {AnnotatedMonsieurAxelMenvoie} annotatedMonsieurAxelMenvoie 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteKitchenControllerSendToKitchen(annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteKitchenControllerSendToKitchen(annotatedMonsieurAxelMenvoie, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteKitchenApi.remoteKitchenControllerSendToKitchen']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RemoteKitchenApi - factory interface
 * @export
 */
export const RemoteKitchenApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RemoteKitchenApiFp(configuration)
    return {
        /**
         * 
         * @param {RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerGetOrdersByGroupId(requestParameters: RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest, options?: RawAxiosRequestConfig): AxiosPromise<OrderSummary> {
            return localVarFp.remoteKitchenControllerGetOrdersByGroupId(requestParameters.groupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerRemoveFromKitchen(requestParameters: RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
            return localVarFp.remoteKitchenControllerRemoveFromKitchen(requestParameters.annotatedMonsieurAxelMenvoie, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteKitchenControllerSendToKitchen(requestParameters: RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.remoteKitchenControllerSendToKitchen(requestParameters.annotatedMonsieurAxelMenvoie, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for remoteKitchenControllerGetOrdersByGroupId operation in RemoteKitchenApi.
 * @export
 * @interface RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest
 */
export interface RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest {
    /**
     * 
     * @type {string}
     * @memberof RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupId
     */
    readonly groupId: string
}

/**
 * Request parameters for remoteKitchenControllerRemoveFromKitchen operation in RemoteKitchenApi.
 * @export
 * @interface RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest
 */
export interface RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest {
    /**
     * 
     * @type {AnnotatedMonsieurAxelMenvoie}
     * @memberof RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchen
     */
    readonly annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie
}

/**
 * Request parameters for remoteKitchenControllerSendToKitchen operation in RemoteKitchenApi.
 * @export
 * @interface RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest
 */
export interface RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest {
    /**
     * 
     * @type {AnnotatedMonsieurAxelMenvoie}
     * @memberof RemoteKitchenApiRemoteKitchenControllerSendToKitchen
     */
    readonly annotatedMonsieurAxelMenvoie: AnnotatedMonsieurAxelMenvoie
}

/**
 * RemoteKitchenApi - object-oriented interface
 * @export
 * @class RemoteKitchenApi
 * @extends {BaseAPI}
 */
export class RemoteKitchenApi extends BaseAPI {
    /**
     * 
     * @param {RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteKitchenApi
     */
    public remoteKitchenControllerGetOrdersByGroupId(requestParameters: RemoteKitchenApiRemoteKitchenControllerGetOrdersByGroupIdRequest, options?: RawAxiosRequestConfig) {
        return RemoteKitchenApiFp(this.configuration).remoteKitchenControllerGetOrdersByGroupId(requestParameters.groupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteKitchenApi
     */
    public remoteKitchenControllerRemoveFromKitchen(requestParameters: RemoteKitchenApiRemoteKitchenControllerRemoveFromKitchenRequest, options?: RawAxiosRequestConfig) {
        return RemoteKitchenApiFp(this.configuration).remoteKitchenControllerRemoveFromKitchen(requestParameters.annotatedMonsieurAxelMenvoie, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteKitchenApi
     */
    public remoteKitchenControllerSendToKitchen(requestParameters: RemoteKitchenApiRemoteKitchenControllerSendToKitchenRequest, options?: RawAxiosRequestConfig) {
        return RemoteKitchenApiFp(this.configuration).remoteKitchenControllerSendToKitchen(requestParameters.annotatedMonsieurAxelMenvoie, options).then((request) => request(this.axios, this.basePath));
    }
}

