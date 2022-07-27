import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";
// import styles from "../styles/Searchbar.module.css";
import { useState } from "react";
import { Table} from "react-bootstrap";
import { Popover } from "react-bootstrap";
import Link from "next/link";
import { useRef } from "react";
import Featured from "../components/Featured";
import Image from "next/image";

const SearchBar = ({ foodList }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleFilter = (event) => {
    setShow(true);
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
  const clearpop = () => {
    setShow(!show);
  };

  return (
    <div >
      <Form className="me-auto d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          value={wordEntered}
          onChange={handleFilter}
          placement="bottom"
        />
        {/* <Button variant="outline-warning">Search</Button> */}
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <Button onClick={clearpop} >search</Button>
          ) : (
            <Button onClick={clearInput}>close</Button>
          )}
        </div>
      </Form> 
        
      {filteredData.length != 0 ? (
          <Table hover className="mx-5" size="sm"> 
          <tbody>
            {filteredData.map((value, key) => {
              return (
                <Link href={`/product/${value._id}`}>
                <tr>
                  <td>
                  <p>{value.title} </p>
                  </td> 
                  <td>{value.author}</td>
            </tr>
            </Link>
              );
            })}
            </tbody>
          </Table>
        ) : (
          <Featured />
        )}
    </div>
  );
};

export default SearchBar;
