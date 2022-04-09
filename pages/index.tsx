import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Table } from "antd";
import { getColumns } from "@/meta/table";
import "antd/dist/antd.css";
import axios from "axios";
import { formatPropertiesList, PropertiesDataType, groupByStateAndCity } from "@/util/format";
import Spinner from "@/components/Spinner";
import styled from "styled-components";

const Home: NextPage = () => {
  const [propertiesList, setPropertiesList] = useState<PropertiesDataType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchProperties = async() => {
    try {
      setIsFetching(true);
      const { data } = await axios.get("/api/properties"); 

      const groupedData = groupByStateAndCity(data.data); 

      const formatedData = formatPropertiesList(groupedData);

      setPropertiesList(formatedData);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const stateFilterList = propertiesList.map(property => {
    return {
      text: property.state,
      value: property.state
    }
  });

  const cityFilterList = propertiesList.map(property => {
    return {
      text: property.city,
      value: property.city
    }
  });

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

  return (
    <Container>
      <Head>
        <title>Onramp Lab</title>
        <meta name="description" content="Frontend home work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table 
        columns={getColumns({
          stateFilterList,
          cityFilterList
        })} 
        dataSource={propertiesList} 
        onChange={onChange} 
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
