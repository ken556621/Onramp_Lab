import { PropertiesDataType } from "@/util/format";

export type ColumnsType = {
  title: string;
  dataIndex: string;
  filters?: any;
  defaultSortOrder?: any;
  onFilter?: any;
  sorter?: any;
  isShow: boolean;
}[];

type FilterListProps = {
  filterList: PropertiesDataType;
  groupByTarget: string
};

type FilterType = {
  text: string;
  value: string | number[];
}[];

const getFliterList = (list: PropertiesDataType, target: string) => {
  return list.map(property => {
    return {
      text: property[target],
      value: property[target]
    }
  })
};

const getFliterPriceRange = (list: PropertiesDataType, dividerCount: number): FilterType => {
  const priceArray = list.map(item => item.price);
  const max = Math.max(...priceArray);
  const min = Math.min(...priceArray);

  const getIntervals = (min: number, max: number, nbIntervalls: number) => {
    max -= min;  
    const size = Math.round((max-1) / nbIntervalls);
    const result = [];

    for (let i = 0; i < nbIntervalls; i++) {
        const inf = i + i * size;
        const sup = inf + size < max ? inf + size: max;

        result.push([inf + min, sup + min]);  
        if(inf >= max || sup >= max)break;
    }

    return result;
  }

  const rangeNumArray = getIntervals(min, max, dividerCount);

  return rangeNumArray.map(range => {
    return {
      text: `${String(range[0])}$ ~ ${String(range[1])}$`,
      value: range
    }
  })
};

export const getColumns = ({
  filterList,
  groupByTarget
}: FilterListProps): ColumnsType => {
  return [
    {
      title: "State",
      dataIndex: "state",
      filters: getFliterList(filterList, "state"),
      onFilter: (value: any, record: any) => record.state.indexOf(value) === 0,
      isShow: true
    },
    {
      title: "City",
      dataIndex: "city",
      filters: getFliterList(filterList, "city"),
      onFilter: (value: any, record: any) => record.city.indexOf(value) === 0,
      isShow: true
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: [
        {
          text: "Apartment",
          value: "Apartment",
        },
        {
          text: "Single-family",
          value: "Single-family",
        },
        {
          text: "Townhomes",
          value: "Townhomes",
        },
        {
          text: "Condo",
          value: "Condo",
        },
      ],
      onFilter: (value: any, record: any) => record.type.indexOf(value) === 0,
      isShow: groupByTarget === "no"
    },
    {
      title: "Total Type",
      dataIndex: "totalType",
      isShow: groupByTarget === "cityStateType" || groupByTarget === "cityStateTypePrice"
    },
    {
      title: "Price",
      dataIndex: "price",
      filters: getFliterPriceRange(filterList, 5), // Default divided by 5 chunks
      onFilter: (value: any, record: any) => record.price <= value[1] && record.price >= value[0],
      isShow: groupByTarget === "no"
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      isShow: groupByTarget === "cityStateTypePrice"
    },
    {
      title: "Houses",
      dataIndex: "houses",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.houses - b.houses,
      isShow: groupByTarget === "cityState"
    },
    {
      title: "Avg. Price",
      dataIndex: "avgPrice",
      sorter: (a: any, b: any) => a.price - b.price,
      isShow: groupByTarget === "cityState"
    },
  ].filter(item => item.isShow);
};