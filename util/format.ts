import { countDuplcateInArray } from "@/util/helper";

export type PropertiesDataType = {
    [key: string]: any;
}[];

type GroupByObjType = {
    [key: string]: PropertiesDataType
}

type Obj = {
    id: number,
    city: string,
    state: string,
    houses: number,
    price: number,
    totalPrice: number,
    avgPrice: number,
    type: string,
    totalType: any
}

export const formatPropertiesList = (list: PropertiesDataType) => {
    return list.map(item => {
        return {
            id: 0,
            city: item.city,
            state: item.state,
            price: item.price,
            type: item.type
        }
    })
};

export const groupBy = (list: PropertiesDataType, target: string) => {
    let result = {};
    let targetDataIndex = "";

    if(target === "no"){
        return list
    }

    switch (target) {
        case "cityState":
            targetDataIndex = "city"
            break;
        case "cityState":
            targetDataIndex = "city"
            break;
        case "cityStateType":
            targetDataIndex = "city"
            break;
        case "cityStateTypePrice":
            targetDataIndex = "city"
            break;
        default:
            break;
    }

    result = list.reduce((a, b) => {
        a[b[targetDataIndex]] = a[b[targetDataIndex]] || [];
        a[b[targetDataIndex]].push(b);
        return a;
    }, Object.create(null));

    return formatGroupByPropertiesList(result, target);
};

export const formatGroupByPropertiesList = (groupByObj: GroupByObjType, target: string) => {
    const result = [];

    for (let prop in groupByObj) {
        const totalTypeArr: string[] = [];
        const obj: Obj = {
            id: 0,
            city: "",
            state: "",
            houses: groupByObj[prop].length,
            price: 0,
            totalPrice: 0,
            avgPrice: 0,
            type: "",
            totalType: ""
        };
        groupByObj[prop].forEach(cityInfo => {
            obj.id = cityInfo.id
            obj.totalPrice += cityInfo.price
            obj.city = cityInfo.city
            obj.state = cityInfo.state
            obj.price = cityInfo.price
            obj.type = cityInfo.type
            totalTypeArr.push(cityInfo.type)
        });

        const totalType = countDuplcateInArray(totalTypeArr).map(item => (
            `${item.name}: ${item.count}`
        ));

        obj.avgPrice = obj.totalPrice / groupByObj[prop].length;
        obj.totalType = totalType;

        result.push(obj);
    }

    return result;
};