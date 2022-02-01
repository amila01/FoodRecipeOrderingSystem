import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { FaStarHalfAlt,FaStar } from "react-icons/fa";

const Product = ({food}) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(food.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // const food = {
  //   id: 1,
  //   img: "/img/dhal_curry.png",
  //   name: "dhal_curry",
  //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus aut, odit veritatis ipsa iste necessitatibus",
  // };
  

  const changePrice = (number)=>{
    setPrice(number)
  }

  const handleSize = (sizeIndex)=>{
    const difference = food.prices[sizeIndex]- food.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }

  const handleChange = (e, option)=>{
    const checkd = e.target.checked;

    if(checkd){
      changePrice(option.price);
      setExtras(prev=>[...prev,option])
    }else{
      changePrice(0+option.price);
      setExtras(extras.filter((extra)=>extra._id !== option._id));
    }
  }

  const handleClick =()=>{
      dispatch(addProduct({...food, extras, price, quantity}))
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={food.img} objectFit="contain" alt="" layout="fill" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{food.title}</h1>
        
        <p className={styles.desc}>{food.desc}</p>
        <p className={styles.desc}><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/></p>
        <p className={styles.desc}>by Author</p>
        {/* <h3 className={styles.choose}>Choose your size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image
              src="/img/size.png"
              objectFit="contain"
              alt=""
              layout="fill"
            />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image
              src="/img/size.png"
              objectFit="contain"
              alt=""
              layout="fill"
            />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image
              src="/img/size.png"
              objectFit="contain"
              alt=""
              layout="fill"
            />
            <span className={styles.number}>Large</span>
          </div>
        </div> */}
        <h3 className={styles.choose}>Ingredients</h3>
        <div className={styles.ingredients}>
          {food.extraOptions.map((option)=>(
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e)=>handleChange(e,option)}
                />
                <label htmlFor="double">{option.text}</label>
                <label htmlFor="double">-  </label>
                <label htmlFor="double">{option.amount}</label>
              </div>
          ))}
        <span className={styles.price}>LKR.{price}</span>
        </div>
        <div className={styles.add}>
          {/* <input onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} /> */}
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
          <button className={styles.button} >Add to wishlist</button>
        </div>
      <div>
        <h3>Steps</h3>
        <h5>Step 1</h5>
        <p>Lorem ipsum dolor sit.</p>
        <h5>Step 2</h5>
        <p>Lorem ipsum dolor sit.</p>
        <h5>Step 3</h5>
        <p>Lorem ipsum dolor sit.</p>
        <h5>Step 4</h5>
        <p>Lorem ipsum dolor sit.</p>
      </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params})=>{
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return{
      props:{
          food:res.data,
      },
  }
}

export default Product;
