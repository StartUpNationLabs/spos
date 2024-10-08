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
import type { AnnotatedOffer } from '../models';
/**
 * RemoteOfferApi - axios parameter creator
 * @export
 */
export const RemoteOfferApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteOfferControllerGetOffers: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/remoteOffer`;
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
    }
};

/**
 * RemoteOfferApi - functional programming interface
 * @export
 */
export const RemoteOfferApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RemoteOfferApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remoteOfferControllerGetOffers(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AnnotatedOffer>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remoteOfferControllerGetOffers(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RemoteOfferApi.remoteOfferControllerGetOffers']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RemoteOfferApi - factory interface
 * @export
 */
export const RemoteOfferApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RemoteOfferApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remoteOfferControllerGetOffers(options?: RawAxiosRequestConfig): AxiosPromise<Array<AnnotatedOffer>> {
            return localVarFp.remoteOfferControllerGetOffers(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RemoteOfferApi - object-oriented interface
 * @export
 * @class RemoteOfferApi
 * @extends {BaseAPI}
 */
export class RemoteOfferApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RemoteOfferApi
     */
    public remoteOfferControllerGetOffers(options?: RawAxiosRequestConfig) {
        return RemoteOfferApiFp(this.configuration).remoteOfferControllerGetOffers(options).then((request) => request(this.axios, this.basePath));
    }
}

