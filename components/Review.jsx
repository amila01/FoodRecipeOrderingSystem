import React from "react";
import Form from "react-bootstrap/Form";
import { Button,Collapse } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Review = ({food, dbUser}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const [value, setValue] = useState(5);

  const handleSelect =(e)=>{
    setValue(e.target.value);
  }

  const handleSubmit = async () => {
    const data = new FormData();
    try {
      
      const newComment = {
        desc: comment,
        author: food.author,
        authId: food.authId,
        cusId: dbUser._id,
        cusName: dbUser.name,
        proId: food._id,
        star:value,
      };

      await axios.post("http://localhost:3000/api/comments", newComment);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Review
      </Button>
      <Collapse in={open}>
        <Form style={{ width: "20rem" }}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="TextInput">Comment</Form.Label>
              <Form.Control 
                id="TextInput" 
                placeholder="Comment Here" 
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Select">Rate</Form.Label>
              <Form.Select 
                id="Select" 
                style={{ width: "5rem" }}
                value={value} 
                onChange={handleSelect}
              >
                <option value='1' >1</option>
                <option value='2' >2</option>
                <option value='3' >3</option>
                <option value='4' >4</option>
                <option value='5' >5</option>
              </Form.Select>
            </Form.Group>
            <Button onClick={handleSubmit} >Submit</Button>
          </fieldset>
        </Form>
      </Collapse>
    </div>
  );
};

export default Review;
