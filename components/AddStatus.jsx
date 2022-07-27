import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Row,Col } from "react-bootstrap";

const AddStatus = ({ dbUser,setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  

  const author = dbUser.name 
  const authId = dbUser._id 


  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgpv5g1ar/image/upload",
        data
      );

      // console.log(uploadRes.data);
      const { url } = uploadRes.data;
      const newStatus = {
        title,
        author, 
        authId,
        img: url,
      };

      await axios.post("http://localhost:3000/api/statuses", newStatus);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new recipe</h1>
        <Container>
            <Form>
                <Form.Group className="mb-0" controlId="image">
                    <Form.Label>Choose an image</Form.Label>
                    <Form.Control 
                        type="file"
                        size="sm"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }} />
                </Form.Group>
                <Form.Group className="mb-0" controlId="image">
                    <Form.Label>author - </Form.Label>
                    <Form.Label> {dbUser.name}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-0" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        className={styles.input}
                        size="sm"
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button className={styles.addButton} variant="outline-primary" onClick={handleCreate}>
                    Create
                </Button>

            </Form>
        </Container>
      </div>
    </div>
  );
};

export default AddStatus;
