export interface shippingRateModel {
    rate: {
        origin: {
            country: string,
            postal_code: string,
            province: string,
            city: string,
            name: string,
            address1: string,
            address2: string,
            address3: string,
            phone: string,
            fax: string,
            email: string,
            address_type: string,
            company_name: string
        },
        destination: {
            country: string,
            postal_code: string,
            province: string,
            city: string,
            name: string,
            address1: string,
            address2: string,
            address3: string,
            phone: string,
            fax: string,
            email: string,
            address_type: string,
            company_name: string
        },
        items:
        {
            name: string,
            sku: string,
            quantity: number,
            grams: number,
            price: number,
            vendor: string,
            requires_shipping: boolean,
            taxable: boolean,
            fulfillment_service: string,
            properties: string,
            product_id: number,
            variant_id: number
        }[],
        currency: string,
        locale: string
    }
}


export interface ratesShopifyModel {
    service_name: string,
    service_code: string,
    total_price: string,
    description: string,
    currency: string,
    min_delivery_date: string,
    max_delivery_date: string

}

export interface ratesModel {
    id: string,
    deliveryCompanyName: string,
    shippingCost: number,
    collectionCommissionWithRate: number,
    deliveryCompanyId: string,
    shippingTime: number,
    score: number,
};
