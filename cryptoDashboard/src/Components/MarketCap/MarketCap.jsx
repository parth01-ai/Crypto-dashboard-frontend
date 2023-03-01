import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import { useSelector } from 'react-redux';

const MarketCap = () => {
const [coins, setCoins] = useState([]);

const currencyValue = useSelector((state) => state.currency);

const searchValue = useSelector((state) => state.search);



  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyValue}&order=market_cap_desc&per_page=50&page=1&sparkline=true`
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((errer) => console.log(errer));
  }, [currencyValue]);

  // Filtering to check for the searched crypto
  const searchCoins = coins.filter((coin) =>
  coin.name.toLowerCase().includes(searchValue.toLowerCase())
);



  return (
    <>
      <div className="scroll overflow-scroll" style={{height:"22.5vw"}}>
        {searchCoins.map((coins) => {
          return (
            <Coin
              key={coins.id}
              name={coins.name}
              image={coins.image}
              volume={coins.market_cap}
              priceChange={coins.price_change_percentage_24h}
              currencyVal={currencyValue}
            />
          );
        })}
      </div>
    </>
  );
};
export default MarketCap;
