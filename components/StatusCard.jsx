import React from "react";
import { Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import styles from "../styles/Status.module.css";

const StatusCard = ({status}) => {
  return (
    <Card text={"light"} style={{ width: "5rem" }} className="mb-2 mx-2">
      <Card.Img
        src={status.img}
        alt="Card image"
        width={"20px"}
      />
      <Card.ImgOverlay className={styles.overlay}>
        <Card.Title>{status.title}</Card.Title>
        <Card.Text>{status.author}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default StatusCard;
