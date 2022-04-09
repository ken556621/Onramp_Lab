export type PropertiesDataType = {
    id: number;
    city: string;
    state: string;
    type?: string;
    price: number;
    avgPrice: number;
    totalPrice: number;
    houses: number;
}[];

type GroupByObjType = {
    [key: string]: PropertiesDataType
}

export const groupByStateAndCity = (list: PropertiesDataType) => {
    let result = {};

    result = list.reduce((a, b) => {
        a[b.city] = a[b.city] || [];
        a[b.city].push(b);
        return a;
    }, Object.create(null));

    return result;
};

export const formatPropertiesList = (groupByObj: GroupByObjType) => {
    const result = [];

    for (let prop in groupByObj) {
        const obj = {
            id: 0,
            city: prop,
            state: groupByObj[prop][0].state,
            houses: groupByObj[prop].length,
            price: 0,
            totalPrice: 0,
            avgPrice: 0
        };
        groupByObj[prop].forEach(cityInfo => {
            obj.id = cityInfo.id
            obj.totalPrice += cityInfo.price
            obj.price = cityInfo.price
        });

        obj.avgPrice = obj.totalPrice / groupByObj[prop].length;

        result.push(obj);
    }

    return result;
};