import React from "react";
import { FaStarHalfAlt, FaStar, FaThumbsUp } from "react-icons/fa";
import Card from "react-bootstrap/Card";

function Comment({ comment }) {
  return (
    <>
      <Card style={{ width: "10rem" }}>
        <Card.Body>
          <Card.Title>{comment.cusName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <p style={{color:"orange"}}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </p>
          </Card.Subtitle>
          <Card.Text>
          {comment.desc}
          </Card.Text>
          <Card.Link href="#"><FaThumbsUp/> Helpful</Card.Link>
        </Card.Body>
      </Card>
      {/* <Card>
        <Card.Body>
          <Card.Title>{comment.cusName}</Card.Title>
          <Card.Text>
            <p style={{ color: "orange" }}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </p>
          </Card.Text>
          <Card.Text>{comment.desc}</Card.Text>
        </Card.Body>
      </Card> */}
    </>
  );
}

export default Comment;
