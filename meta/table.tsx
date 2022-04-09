export type ColumnsType = {
  title: string;
  dataIndex: string;
  filters?: FilterType;
  defaultSortOrder?: any;
  onFilter?: any;
  sorter?: any;
}[];

type FilterType = {
  text: string;
  value: string;
}[];

export const columns: ColumnsType = [
    {
      title: "City",
      dataIndex: "city",
      onFilter: (value: string, record: any) => record.city.indexOf(value) === 0,
    },
    {
      title: "State",
      dataIndex: "state",
      onFilter: (value: string, record: any) => record.state.indexOf(value) === 0,
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
          text: "Condo",
          value: "Condo",
        },
      ],
      onFilter: (value: string, record: any) => record.type.indexOf(value) === 0,
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.price - b.price,
    },
  ];