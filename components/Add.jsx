import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Row,Col } from "react-bootstrap";

const Add = ({ dbUser,setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState(null);

  const author = dbUser.name 
  const authId = dbUser._id 

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleStepInput = (e) => {
    setStep({ ...step, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const handleSteps = (e) => {
    setSteps((prev) => [...prev, step]);
  };

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
      const newProduct = {
        title,
        desc,
        extraOptions,
        steps,
        author, 
        authId,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
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
                <Form.Group className="mb-0" controlId="desc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        rows={4}
                        type="text"
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-0" controlId="extra">
                    <Form.Label>Extra</Form.Label>
                     <Row>
                        <Col>
                            <Form.Control 
                                type="text"
                                size="sm"
                                placeholder="Item"
                                name="text"
                                onChange={handleExtraInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control  
                                type="number"
                                size="sm"
                                placeholder="Price"
                                name="price"
                                onChange={handleExtraInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="number"
                                size="sm"
                                placeholder="Amount"
                                name="amount"
                                onChange={handleExtraInput}
                            />
                        </Col>
                    </Row>
                    <Button variant="outline-success" size="sm" onClick={handleExtra}>
                        Add
                    </Button>
                </Form.Group>
                <div className={styles.extraItems}>
                    {extraOptions.map((option) => (
                    <span key={option.text} className={styles.extraItem}>
                        {option.text}
                    </span>
                    ))}
                </div>
                <Form.Group className="mb-0" size="sm" controlId="extra">
                    <Form.Label >Extra</Form.Label>
                    <Form.Control 
                        type="text"
                        size="sm"
                        placeholder="Step"
                        name="text"
                        aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                        onChange={handleStepInput}
                    />
                    <Button variant="outline-success" size="sm" onClick={handleSteps}>
                        Add
                    </Button>
                </Form.Group>
                <div className={styles.extraItems}>
                    {steps.map((step) => (
                    <span key={step.text} className={styles.extraItem}>
                        {step.text}
                    </span>
                    ))}
                </div>
                <Button className={styles.addButton} variant="outline-primary" onClick={handleCreate}>
                    Create
                </Button>

            </Form>
        </Container>
      </div>
    </div>
  );
};

export default Add;
