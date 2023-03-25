import { shippingRateModel } from './shippingRate';

export interface requestModel {
    version: string,
    routeKey: string,
    rawPath: string,
    rawQueryString: string,
    body: shippingRateModel,
    headers: {
      accept: string,
      'accept-encoding': string,
      'cache-control': string,
      'content-length': string,
      'content-type': string,
      host: string,
      'postman-token': string,
      'user-agent': string,
      'x-amzn-trace-id': string,
      'x-forwarded-for': string,
      'x-forwarded-port': string,
      'x-forwarded-proto': string,
      'x-shopify-shop-domain': string,
    },
    queryStringParameters: object,
    requestContext: {
      accountId: string,
      apiId: string,
      domainName: string,
      domainPrefix: string,
      http: {
        method: string,
        path: string,
        protocol: string,
        sourceIp: string,
        userAgent: string
      },
      requestId: string,
      routeKey: string,
      stage: string,
      time: string,
      timeEpoch: number
    },
    isBase64Encoded: boolean
  }