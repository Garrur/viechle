import React, { useState } from 'react';

const DealerSelector = () => {
  const [selectedDealer, setSelectedDealer] = useState('');

  const handleDealerChange = (event) => {
    setSelectedDealer(event.target.value);
  };

  return (
    <>
    <div>
    <div className="mt-8 mr-4 shadow-xl">
      <div className="m-4 rounded-md ">
      <label className="mr-2 font-semibold" >Select Dealer</label>
      <select id="dealer-select" className="border border-orange-500 rounded border-2" value={selectedDealer} onChange={handleDealerChange}>  
        <>
        <option value="AAA MITSUBISHI DEALER" className="bg-orange-500" >AAA MITSUBISHI DEALER</option>
        {/* Add more dealer options here */}    
        </>     

      
      </select>
      </div>
    </div>
    </div>
    </>
  );
};

export default DealerSelector;
