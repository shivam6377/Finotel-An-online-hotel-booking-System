import { useState, useEffect } from "react";
import queryString from "query-string";
import { Spin, Space } from 'antd';

import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => { 
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    setIsLoading(true)
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
      setIsLoading(false)
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="home-content">
      {isLoading &&  <Space size="middle"  className="spinner">
            <Spin size="large" />
          </Space>}
          {hotels.map((h) => (
            <SmallCard key={h._id} h={h} />
          ))}
        {
          !hotels?.length && !isLoading && <div className="alert alert-danger m-5" role="alert">No Results found!!!</div>
        }
      </div>
    </>
  );
};

export default SearchResult;
