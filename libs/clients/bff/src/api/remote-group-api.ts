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
import type { AnnotatedGroup } from '../models';
// @ts-ignore
import type { AnnotatedGroupCreateDto } from '../models';
// @ts-ignore
import type { Status } from '../models';
/**
 * RemoteGroupApi - axios parameter creator
 * @export
 */
export const RemoteGroupApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {AnnotatedGroupCreateDto} annotatedGroupCreateDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerAddGroup: async (annotatedGroupCreateDto: AnnotatedGroupCreateDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'annotatedGroupCreateDto' is not null or undefined
            assertParamExists('remoteGroupControllerAddGroup', 'annotatedGroupCreateDto', annotatedGroupCreateDto)
            const localVarPath = `/api/remoteGroup`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(annotatedGroupCreateDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroup: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('remoteGroupControllerGetGroup', 'id', id)
            const localVarPath = `/api/remoteGroup/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @param {string} tableNumber 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroupFromTableNumber: async (tableNumber: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tableNumber' is not null or undefined
            assertParamExists('remoteGroupControllerGetGroupFromTableNumber', 'tableNumber', tableNumber)
            const localVarPath = `/api/remoteGroup/groupFromTableNumber/{tableNumber}`
                .replace(`{${"tableNumber"}}`, encodeURIComponent(String(tableNumber)));
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
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroups: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/remoteGroup`;
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
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerRemoveAllGroups: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/remoteGroup`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerRemoveGroup: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('remoteGroupControllerRemoveGroup', 'id', id)
            const localVarPath = `/api/remoteGroup/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
    }
};

/**
 * RemoteGroupApi - functional programming interface
 * @export
 */
export const RemoteGroupApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RemoteGroupApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {AnnotatedGroupCreateDto} annotatedGroupCreateDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerAddGroup(annotatedGroupCreateDto: AnnotatedGroupCreateDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnotatedGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerAddGroup(annotatedGroupCreateDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerAddGroup']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerGetGroup(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnotatedGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerGetGroup(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerGetGroup']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} tableNumber 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerGetGroupFromTableNumber(tableNumber: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnotatedGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerGetGroupFromTableNumber(tableNumber, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerGetGroupFromTableNumber']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerGetGroups(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AnnotatedGroup>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerGetGroups(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerGetGroups']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerRemoveAllGroups(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Status>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerRemoveAllGroups(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerRemoveAllGroups']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteGroupControllerRemoveGroup(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Status>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteGroupControllerRemoveGroup(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteGroupApi.remoteGroupControllerRemoveGroup']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RemoteGroupApi - factory interface
 * @export
 */
export const RemoteGroupApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RemoteGroupApiFp(configuration)
    return {
        /**
         * 
         * @param {RemoteGroupApiRemoteGroupControllerAddGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerAddGroup(requestParameters: RemoteGroupApiRemoteGroupControllerAddGroupRequest, options?: RawAxiosRequestConfig): AxiosPromise<AnnotatedGroup> {
            return localVarFp.remoteGroupControllerAddGroup(requestParameters.annotatedGroupCreateDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteGroupApiRemoteGroupControllerGetGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroup(requestParameters: RemoteGroupApiRemoteGroupControllerGetGroupRequest, options?: RawAxiosRequestConfig): AxiosPromise<AnnotatedGroup> {
            return localVarFp.remoteGroupControllerGetGroup(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroupFromTableNumber(requestParameters: RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest, options?: RawAxiosRequestConfig): AxiosPromise<AnnotatedGroup> {
            return localVarFp.remoteGroupControllerGetGroupFromTableNumber(requestParameters.tableNumber, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerGetGroups(options?: RawAxiosRequestConfig): AxiosPromise<Array<AnnotatedGroup>> {
            return localVarFp.remoteGroupControllerGetGroups(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerRemoveAllGroups(options?: RawAxiosRequestConfig): AxiosPromise<Status> {
            return localVarFp.remoteGroupControllerRemoveAllGroups(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RemoteGroupApiRemoteGroupControllerRemoveGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteGroupControllerRemoveGroup(requestParameters: RemoteGroupApiRemoteGroupControllerRemoveGroupRequest, options?: RawAxiosRequestConfig): AxiosPromise<Status> {
            return localVarFp.remoteGroupControllerRemoveGroup(requestParameters.id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for remoteGroupControllerAddGroup operation in RemoteGroupApi.
 * @export
 * @interface RemoteGroupApiRemoteGroupControllerAddGroupRequest
 */
export interface RemoteGroupApiRemoteGroupControllerAddGroupRequest {
    /**
     * 
     * @type {AnnotatedGroupCreateDto}
     * @memberof RemoteGroupApiRemoteGroupControllerAddGroup
     */
    readonly annotatedGroupCreateDto: AnnotatedGroupCreateDto
}

/**
 * Request parameters for remoteGroupControllerGetGroup operation in RemoteGroupApi.
 * @export
 * @interface RemoteGroupApiRemoteGroupControllerGetGroupRequest
 */
export interface RemoteGroupApiRemoteGroupControllerGetGroupRequest {
    /**
     * 
     * @type {string}
     * @memberof RemoteGroupApiRemoteGroupControllerGetGroup
     */
    readonly id: string
}

/**
 * Request parameters for remoteGroupControllerGetGroupFromTableNumber operation in RemoteGroupApi.
 * @export
 * @interface RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest
 */
export interface RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest {
    /**
     * 
     * @type {string}
     * @memberof RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumber
     */
    readonly tableNumber: string
}

/**
 * Request parameters for remoteGroupControllerRemoveGroup operation in RemoteGroupApi.
 * @export
 * @interface RemoteGroupApiRemoteGroupControllerRemoveGroupRequest
 */
export interface RemoteGroupApiRemoteGroupControllerRemoveGroupRequest {
    /**
     * 
     * @type {string}
     * @memberof RemoteGroupApiRemoteGroupControllerRemoveGroup
     */
    readonly id: string
}

/**
 * RemoteGroupApi - object-oriented interface
 * @export
 * @class RemoteGroupApi
 * @extends {BaseAPI}
 */
export class RemoteGroupApi extends BaseAPI {
    /**
     * 
     * @param {RemoteGroupApiRemoteGroupControllerAddGroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerAddGroup(requestParameters: RemoteGroupApiRemoteGroupControllerAddGroupRequest, options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerAddGroup(requestParameters.annotatedGroupCreateDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteGroupApiRemoteGroupControllerGetGroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerGetGroup(requestParameters: RemoteGroupApiRemoteGroupControllerGetGroupRequest, options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerGetGroup(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerGetGroupFromTableNumber(requestParameters: RemoteGroupApiRemoteGroupControllerGetGroupFromTableNumberRequest, options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerGetGroupFromTableNumber(requestParameters.tableNumber, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerGetGroups(options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerGetGroups(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerRemoveAllGroups(options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerRemoveAllGroups(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RemoteGroupApiRemoteGroupControllerRemoveGroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteGroupApi
     */
    public remoteGroupControllerRemoveGroup(requestParameters: RemoteGroupApiRemoteGroupControllerRemoveGroupRequest, options?: RawAxiosRequestConfig) {
        return RemoteGroupApiFp(this.configuration).remoteGroupControllerRemoveGroup(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}

