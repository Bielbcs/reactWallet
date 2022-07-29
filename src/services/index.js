const fetchCurrenciesAPI = async () => {
  const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await requisition.json();
  return response;
};

export default fetchCurrenciesAPI;
