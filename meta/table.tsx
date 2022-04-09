export type ColumnsType = {
  title: string;
  dataIndex: string;
  filters?: FilterType;
  defaultSortOrder?: any;
  onFilter?: any;
  sorter?: any;
}[];

type FilterListProps = {
  stateFilterList?: FilterType;
  cityFilterList?: FilterType;
};

type FilterType = {
  text: string;
  value: string;
}[];

export const getColumns = ({
  stateFilterList,
  cityFilterList
}: FilterListProps): ColumnsType => {
  return [
    {
      title: "State",
      dataIndex: "state",
      filters: stateFilterList,
      onFilter: (value: any, record: any) => record.state.indexOf(value) === 0,
    },
    {
      title: "City",
      dataIndex: "city",
      filters: cityFilterList,
      onFilter: (value: any, record: any) => record.city.indexOf(value) === 0,
    },
    {
      title: "Houses",
      dataIndex: "houses",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.houses - b.houses,
    },
    {
      title: "Avg. Price",
      dataIndex: "avgPrice",
      sorter: (a: any, b: any) => a.price - b.price,
    },
  ];
};