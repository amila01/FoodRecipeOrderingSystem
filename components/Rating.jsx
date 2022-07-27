import React from "react";
import { ProgressBar } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import styles from "../styles/Rating.module.css"

function Rating() {
  return (
    <div>
      <h3>Rating</h3>
      <div>
        <div >
          <label >5</label>
          <FaStar className={styles.progresStar}/>
          <ProgressBar animated variant="success" now={50} />
        </div>
        <div>
          <label htmlFor="">4</label>
          <FaStar className={styles.progresStar}/>
          <ProgressBar animated variant="success" now={0} />
        </div>
        <div>
          <label htmlFor="">3</label>
          <FaStar className={styles.progresStar}/>
          <ProgressBar animated variant="success" now={0} />
        </div>
        <div>
          <label htmlFor="">2</label>
          <FaStar className={styles.progresStar}/>
          <ProgressBar animated variant="success" now={0} />
        </div>
        <div>
          <label htmlFor="">1</label>
          <FaStar className={styles.progresStar}/>
          <ProgressBar animated variant="success" now={10} />
        </div>
      </div>
    </div>
  );
}

export default Rating;
