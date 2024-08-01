import React, { useState, useEffect } from "react";
import axios from "axios";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get(
          "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
        );
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    dataFetch();
  }, []);
  const saveListHandler = () => {
    setList([...list, quotes]);
  };

  return (
    <>
      <button
        onClick={() => setShowList(!showList)}
        className="bg-blue-500  ml-[40%] mt-10 mb-5 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showList ? "Hide List" : "Show List"}
      </button>
      <div className="flex flex-wrap justify-center">
        {quotes.map((quote, i) => (
          <div
            key={i}
            className="bg-green-100 rounded-lg shadow-md m-4 p-6 w-80"
          >
            <p className="text-lg text-gray-800">{quote}</p>
            <button
              onClick={saveListHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 "
            >
              Save To List
            </button>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-bold underline ml-[34%] mt-2">List of Quotes</h1>
        {showList && (
          <div className="flex flex-wrap justify-center">
            {list.map((quote, i) => (
              <div
                key={i}
                className="bg-green-100 rounded-lg shadow-md m-4 p-6 w-80"
              >
                <p className="text-lg text-gray-800">{quote}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Quotes;
