import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { GetStaticProps } from "next";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

type Continent = {
  code: string;
  name: string;
};

type ContinentsProps = {
  continents: [Continent];
};

export default function Continents({ continents }: ContinentsProps) {
  return (
    <>
      <Head>
        <title>Continents</title>
      </Head>
      <Flex
        height="100vh"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {continents &&
          continents.map((continent: Continent) => {
            return (
              <Link key={continent.code} href={`/continents/${continent.code}`}>
                <a>{continent.name}</a>
              </Link>
            );
          })}
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Continents {
        continents {
          code
          name
        }
      }
    `,
  });

  return {
    props: {
      continents: data.continents,
    },
  };
};
