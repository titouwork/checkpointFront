import { Country } from "@/type";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Col, Card } from "react-bootstrap";

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);

  const { loading, error } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      setCountries(data.countries);
    },
  });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error...</span>;

  return (
    <>
      {countries.map((country) => (
        <Col key={country.id}>
        <Card as="a" href={`/country/${country.code}`}>
          <Card.Body>
            <Card.Title>{country.name}</Card.Title>
            <Card.Text>{country.emoji}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      ))}
    </>
  );
}
