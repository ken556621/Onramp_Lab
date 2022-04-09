export type PropertiesDataType = {
    id: number;
    city: string;
    state: string;
    type: string;
    price: number;
}[];

export const formatPropertiesList = (list: PropertiesDataType) => {
    return list.map((item) => {
        return {
            id: item.id,
            city: item.city,
            state: item.state,
            type: item.type,
            price: item.price
        }
    })
};