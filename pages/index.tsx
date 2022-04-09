import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import styled from "styled-components";
import "antd/dist/antd.css";

import { getColumns } from "@/meta/table";
import { groupByFields } from "@/meta/select";
import { 
  formatPropertiesList,
  PropertiesDataType, 
  groupBy 
} from "@/util/format";
import Spinner from "@/components/Spinner";
import { Select } from "antd";
import { Table } from "antd";

const Home: NextPage = () => {
  const [propertiesList, setPropertiesList] = useState<PropertiesDataType>([]);
  const [groupByOption, setGroupByOption] = useState<string>("no");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { Option } = Select;

  const fetchProperties = async() => {
    try {
      setIsFetching(true);
      const { data } = await axios.get("/api/properties"); 

      const formatedData = formatPropertiesList(data.data);

      setPropertiesList(formatedData);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  const renderSelectOptions = () => {
    return groupByFields.map(field => (
      <Option key={field.value} value={field.value}>{field.label}</Option>
    ))
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if(isFetching){
    return (
      <SpinnerWrapper>
        <Spinner
          spaceSize="large"
          size="large"
        />
      </SpinnerWrapper>
    )
  }

  const groupByData = groupBy(propertiesList, groupByOption);

  return (
    <Container>
      <Head>
        <title>Onramp Lab</title>
        <meta name="description" content="Frontend home work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Select 
        defaultValue="no" 
        style={{ 
          width: 200,
          margin: "20px"
        }} 
        onChange={(value) => setGroupByOption(value)}
      >
        {renderSelectOptions()}
      </Select>
      <Table 
        columns={getColumns({
          filterList: groupByData,
          groupByTarget: groupByOption
        })} 
        dataSource={groupByData} 
      />
    </Container>
  )
}

const Container = styled.div``;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  min-height: 100vh;
`;

export default Home
