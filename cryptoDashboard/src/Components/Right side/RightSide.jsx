import React , {useEffect , useState} from "react";
import MarketCap from "../MarketCap/MarketCap";
import { PieChart } from "./PieChart";
import "./RightSide.css";
import {useSelector} from "react-redux"
import axios from "axios";

const RightSide = () => {

  const [cData, setCData] = useState([]);

  const currencyValue = useSelector((state) => state.currency);

  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyValue}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;


  let currencyType;
  if (currencyValue === "usd") {
    currencyType = "$";
  } else if (currencyValue === "inr") {
    currencyType = "₹";
  } else if (currencyValue === "eur") {
    currencyType = "\u20AC";
  }

  const topCoins = () => {
    axios
      .get(URL)
      .then((response) => {
        setCData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    topCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyValue]);

  
  const maxPrice = cData
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 3)
    .map((coin) => coin.market_cap);

  // top coins in marcket
  let total = 0;
  maxPrice.map((value) => {
    total += value;
  });


  return (
    <div className="">
      {/* Portfolio div */}
      <div className="px-4 bg-white mt-2 shadow-2xl rounded-xl mr-44">
      
      <div className="dark:bg-gray-700 d-flex pt-3 rounded-md bg-white h-48 md:w-screen lg:h-48 lg:w-full xl:h-full">
      
        <h1 className="font-serif font-bold text-3xl">
          Portfolio
        </h1>
        <h1>
      
          <span className="text-sm font-medium mx-1">
            Total value :
          </span>
    
          <span className="font-medium dark:text-gray-100">
            {currencyType} {Math.round(total / 100000000)}
            
          </span>
        </h1>
      </div>
      <div>
      <div className="d-flex" 
        >
          <PieChart />
        </div>
      </div>
      </div>


      {/* Marketcap div */}
      <div className="bg-white shadow-2xl mr-44 md rounded-xl mt-1 mb-1">
        <p
          style={{
            display: "flex",
            justifyContent: "center", 
            marginTop:"10px",
          }}
        >
          <h1 className="font-serif font-bold text-3xl"> Marcket Cap</h1>
        </p>

        <MarketCap />
      </div>
    </div>
  );
};

export default RightSide;
