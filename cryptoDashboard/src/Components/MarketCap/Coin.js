import React from "react";
import "./Coin.css";

export const Coin = ({ image, name,  volume, priceChange,currency , search  }) => {
  return (
    <>
      <div className="full">
        <div className="vew">
          <div className="maindiv">
            <div className="fixfrem">
              <div className="imgName">
                <div className="inImg">
                  <img src={image} alt="crypto" />
                </div>
                <div className="h3Img">
                  <h2>{name}</h2>
                </div>
              </div>
              <div className="spnes">
                <p>
                  {" "}
                  Mkt.Cap $ <span>{volume.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div>
              {priceChange < 0 ? (
                <p className="coin-percent-red"> {priceChange.toFixed(2)}%</p>
              ) : (
                <p className="coin-percent-green">{priceChange.toFixed(2)}%</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
