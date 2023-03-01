import React  from "react";
import SearchIcon from "@mui/icons-material/Search";
import Charts from "../Charts/Charts";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from "../../state/index";


const LeftSide = () => {

  const dispatch = useDispatch();
  const {updateCurrency} = bindActionCreators(actionCreators , dispatch);
  const { filterSearch } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
    {/* Left side */}

<div className="flex shadow-2xl items-center mt-2 ml-3 px-8 space-x-5 bg-white rounded-xl">
  <div className="mr-1 cursor-pointer rounded-xl outline-none">
  <select className='w-full h-full text-base px-2 mr-1 cursor-pointer rounded-md font-bold focus:text-gray-500 focus:outline-none' onChange={updateCurrency}>
    <option value="usd" className='text-black'>USD</option>
        <option value="eur" className='text-black'>EUR</option>
        <option value="inr" className='text-black'>INR</option>
    </select>
  </div>
      {/* Search Bar icon  */}
      <div>
              <SearchIcon color="action" 
              className="icon" 
              />
      </div> 
      {/* Search Bar to filter out cryptocurrency */}
      <form>
        <input
          type="text"
          onChange={filterSearch}
          placeholder="Search by coin"
          className="dark:bg-gray-700 dark:text-gray-50 w-full h-10 outline-none font-medium text-sm xs2:text-lg rounded-md"
        />
      </form>

    
    </div>

    {/* Chart selection */}
         <div className="Charts ml-3 mt-5">
           <Charts />
         </div>
       

    </>
  );
};

export default LeftSide;
