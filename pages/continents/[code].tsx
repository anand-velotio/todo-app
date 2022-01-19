import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { GetStaticProps, GetStaticPaths } from "next";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

type Continent = {
  code: string;
};

type Country = {
  code: string;
  name: string;
  capital: string;
  currency: string;
};

type CountriesProps = {
  countries: [Country];
};

export default function Countries({ countries }: CountriesProps) {
  return (
    <>
      <Head>
        <title>Continent Details</title>
      </Head>
      <Flex
        height="100vh"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {countries &&
          countries.map((country: Country) => {
            return <span>{country.name}</span>;
          })}
      </Flex>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query Continents {
        continents {
          code
        }
      }
    `,
  });

  const paths = data.continents.map((continent: Continent) => {
    return { params: { code: continent.code } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const code = context.params.code;
  const query = gql`
    query Continent($code: String!) {
      continent(code: $code) {
        countries {
          code
          name
          capital
          currency
        }
      }
    }
  `;

  const { data } = await client.query({
    query,
    variables: {
      code,
    },
  });

  return {
    props: {
      countries: data.continent.countries,
    },
  };
};
