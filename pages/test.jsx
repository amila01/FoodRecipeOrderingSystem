import React, { useState } from "react";
import FoodCards from "../components/FoodCards";
import axios from "axios";
import Featured from "../components/Featured";
import { Form, Button, FormControl } from "react-bootstrap";

export default function test({ foodList, admin }) {
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchInput, setSearchInput] = useState({});
  // const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = foodList.filter((food) => {
      return food.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>

      <div className="search">
        <Form className="me-auto d-flex">
          <FormControl
            type="text"
            placeholder="search"
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <Button>search</Button>
            ) : (
              <Button onClick={clearInput}>close</Button>
            )}
          </div>
        </Form>
        {filteredData.length != 0 ? (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a className="dataItem" href={value.link} target="_blank">
                  <p>{value.title} </p>
                </a>
              );
            })}
          </div>
        ) : (
          <Featured />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const productRes = await axios.get("http://localhost:3000/api/products");
  const statusRes = await axios.get("http://localhost:3000/api/statuses");
  return {
    props: {
      foodList: productRes.data,
      statusList: statusRes.data,
      admin,
    },
  };
};

// {filteredData.length != 0 && (
//   <div className="dataResult">
//     {filteredData.slice(0, 15).map((value, key) => {
//       return (
//         <a className="dataItem" href={value.link} target="_blank">
//           <p>{value.title} </p>
//         </a>
//       );
//     })}
//   </div>
// )}
