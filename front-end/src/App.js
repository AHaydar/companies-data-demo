import React, { useEffect, useState } from 'react';
import CompanyDetails from './CompanyDetails';

const App = () => {
  const url =
    'https://nfc079xjo3.execute-api.us-east-1.amazonaws.com/Prod/companies';
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

  const companiesList = companies.map((company) => (
    <CompanyDetails
      key={company.CompanyId}
      companyId={company.CompanyId}
      companyName={company.Details.name}
    />
  ));

  return (
    <>
      Publicly listed companies:
      <ul>{companiesList}</ul>
    </>
  );
};

export default App;
