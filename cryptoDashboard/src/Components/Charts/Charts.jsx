import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Multiselect from "multiselect-react-dropdown";
import "./Charts.css";

const chartColor = {
  0: "#35a2eb",
  1: "#ff0000",
  2: "#006400",
  3: "#D2691E",
  4: "#7FFF00",
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart",
    },
    Tooltip: {
      y: {
        formatter: (value) => {
          return value.toFixed(2);
        },
      },
    },
  },
};

const Charts = () => {
  const [ids, setIds] = useState();
  const [days, setDays] = useState(1);
  const [cour, setCour] = useState([]);
  const [historicData, setHistoricData] = useState();
  const [chartData, setChartData] = useState([]);
  const [defaultValue, setDefaultValue] = useState();

  const oneDay = () => setDays(1);
  const oneWeek = () => setDays(7);
  const oneMonth = () => setDays(30);
  const sixMonth = () => setDays(180);
  const oneYear = () => setDays(365);

  const selectChart = (eve) => {
    setIds([]);
    const tempArr = [];
    eve.map((item) => {
      tempArr.push(item);
    });
    setIds(tempArr);
  };

  const getCoins = async () => {
    const getcory = [];
    await axios
      .get(`https://api.coingecko.com/api/v3/coins/`)
      .then((res) => {
        console.log(res.data);
        res.data.slice(0, 10).map((item) => {
          getcory.push(item.id);
        });
        setCour(getcory);
        setIds([getcory[0]]);
        setDefaultValue([getcory[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoinData = (ids, days) => {
    const resArr = [];
    if (ids) {
      ids.map(async (id) => {
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
          )
          .then(async (res) => {
            setHistoricData(res.data.prices);
            chartData.splice(0, chartData.length);
            const tempObj = {
              data: res?.data?.prices?.map((coin) => coin[1]),
              label: `${id}`,
              borderColor: `${chartColor[ids.indexOf(id)]}`,
              backgroundColor: `${chartColor[ids.indexOf(id)]}`,
            };
            resArr.push(tempObj);
            return setChartData(chartData.concat(resArr));
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    getCoinData(ids, days);
  }, [ids, days]);

  return (
    <div className="Charts_div shadow-2xl mb-2 -mt-4">
      <div className="dis">
        <div className="btnBox d-flex -ml-[30rem]">
          {/* Buttons */}
          <button className="Button" onClick={oneDay}>
            1D
          </button>
          <button className="Button" onClick={oneWeek}>
            1W
          </button>
          <button className="Button" onClick={oneMonth}>
            1M
          </button>
          <button className="Button" onClick={sixMonth}>
            6M
          </button>
          <button className="Button" onClick={oneYear}>
            1Y
          </button>
        </div>
        
          <div className="d-flex absolute ml-[32rem]">
            <form>
              
                <div>
                  {/* Line chart selecter */}
                   <Multiselect
                    isObject={false}
                    options={cour}
                    showCheckbox
                    onSelect={(ev) => selectChart(ev)}
                    onRemove={(ev) => selectChart(ev)}
                    selectedValues={defaultValue}
                    showArrow={true}
                    selectionLimit={2}
                    avoidHighlightFirstOption={true}
                    onSearch={false}
                    className="shadow-lg bg-slate-100 rounded-lg z-20"
                    style={{
                      chips:{
                        background:"info",
                        borderRadius:"5px",
                      }
                      }}
                  />
                </div>
              
            </form>
          </div>
        
      </div>
      {/* Line Chart */}
      <div className="Line_Chart_div">
        <div style={{width:"70vw" ,marginLeft:"50px"}}>
        {chartData.length ? (
          <Line
          
            
            className="Line_Chart"
            data={{
              labels: historicData?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM `;

                    

                return days === 1 ? time : date.toLocaleDateString();
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              datasets: chartData,
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false
                  }
                },
              

              }   
            }}
            
          />
        ) : (
          <h1>Data not Found!</h1>
        )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
