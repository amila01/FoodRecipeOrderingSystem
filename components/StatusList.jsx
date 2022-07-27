import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Pagination from "react-bootstrap/Pagination";
import CardGroup from "react-bootstrap/CardGroup";
import { Container, Row } from "react-bootstrap";
import styles from "../styles/Status.module.css";
import StatusCard from "./StatusCard";

const StatusList = ({statusList}) => {
  const varis = [
    // 'Primary',
    // 'Secondary',
    // "Success",
    // 'Danger',
    // 'Warning',
    // 'Info',
    // "Light",
    // "Dark",
  ];
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Carousel className="mx-5 mt-5">
      <Carousel.Item>
        <CardGroup>
          {statusList.map((status)=>(
                    <StatusCard key={status._id} status={status}/>
                ))}
        </CardGroup>
      </Carousel.Item>
    </Carousel>
  );
};

export default StatusList;
