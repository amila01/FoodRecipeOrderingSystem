import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { addProduct } from "../../redux/cartSlice";
import { FaStarHalfAlt, FaStar, FaUtensils } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Rating from "../../components/rating";
import Comment from "../../components/Comment";
import Review from "../../components/Review";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import CommentList from "../../components/CommentList";

const Product = ({ food, comments }) => {
  const [commentList, setcommentList] = useState(comments);
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const profile = useSelector((state) => state.profile);
  const { loading, error, dbUser } = profile;

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, option) => {
    const checkd = e.target.checked;

    if (checkd) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity }));
  };

  const createWishItem = async () => {
    const data = {
      title: food.title,
      author: food.author,
      authId: food.authId,
      cusId: dbUser._id,
      proId: food._id,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/wishList", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/wishList/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row md={2}>
        <Col>
          <div className={styles.imgContainer}>
            <Image src={food.img} objectFit="contain" alt="" layout="fill" />
          </div>
        </Col>
        <Col>
          <h1 className={styles.title}>{food.title}</h1>

          <p className={styles.desc}>{food.desc}</p>
          <p className={styles.desc} style={{ color: "orange" }}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </p>
          <p className={styles.desc}>{food.author}</p>
          <h3 className={styles.choose}>Ingredients</h3>
          <div className={styles.ingredients}>
            {food.extraOptions.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="double">{option.text}</label>
                <label htmlFor="double">- </label>
                <label htmlFor="double">LKR.{option.price}</label>
                <label htmlFor="double"> - {option.amount}g</label>
              </div>
            ))}
            <span className={styles.price}>LKR.{price}</span>
          </div>
          <div className={styles.add}>
            {/* <input onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} /> */}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleClick}
              className="mx-2"
            >
              Add to Cart
            </Button>
            <Button variant="outline-danger" size="sm" onClick={createWishItem}>
              Add to wishlist
            </Button>
          </div>
         
          <div>
            <h3>Steps</h3>
            {food.steps.map((step) => (
              <div className={styles.option} key={step._id}>
                <span htmlFor="double">
                  <FaUtensils className="mx-3" />
                  {step.text}
                </span>
              </div>
            ))}
          </div>
          </Col>
          <Col>
          <Rating />
          </Col>
          <Col>
          <Review food={food} dbUser={dbUser} className="mb-10"/>
          <CommentList commentList={commentList} food={food}/>
          
        </Col>
      </Row>
    </Container>
  );
};

export const getServerSideProps = async ({ params }) => {
  const ProductRes = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  const CommentRes = await axios.get(`http://localhost:3000/api/comments`);
  return {
    props: {
      food: ProductRes.data,
      comments: CommentRes.data,
    },
  };
};

export default Product;
