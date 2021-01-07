import React, { useState } from 'react';

const CompanyDetails = ({ companyId, companyName }) => {
  const url =
    'https://nfc079xjo3.execute-api.us-east-1.amazonaws.com/Prod/companies';

  const [returnedRevenue, setReturnedRevenue] = useState([]);

  const handleClick = () => {
    fetch(`${url}/?companyId=${companyId.split('#')[1]}`)
      .then((response) => response.json())
      .then((data) => {
        setReturnedRevenue(data);
      });
  };

  return (
    <li>
      {companyName} <button onClick={handleClick}>Show revenue</button>
      <div>
        {returnedRevenue.length ? returnedRevenue[0].Details.revenue : ''}
      </div>
    </li>
  );
};

export default CompanyDetails;
