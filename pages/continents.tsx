import { gql } from "@apollo/client";
import client from "../apollo-client";
import { GetServerSideProps } from "next";
import { Flex } from "@chakra-ui/react";

type Continent = {
  code: string;
  name: string;
};

type ContinentsProps = {
  continents: [Continent];
};

export default function Continents({ continents }: ContinentsProps) {
  return (
    <Flex
      height="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      {continents &&
        continents.map((continent: Continent) => {
          return <h1 key={continent.code}>{continent.name}</h1>;
        })}
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
