import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Table } from "antd";
import { columns } from "@/meta/table";
import "antd/dist/antd.css";
import axios from "axios";
import { formatPropertiesList, PropertiesDataType } from "@/util/format";
import Spinner from "@/components/Spinner";
import styled from "styled-components";

const Home: NextPage = () => {
  const [propertiesList, setPropertiesList] = useState<PropertiesDataType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchProperties = async() => {
    try {
      setIsFetching(true);
      const { data } = await axios.get("/api/properties"); 

      const formatedData: PropertiesDataType = formatPropertiesList(data.data);

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
        columns={columns} 
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
