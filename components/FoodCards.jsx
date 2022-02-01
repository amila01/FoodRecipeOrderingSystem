import Image from "next/image";
import styles from "../styles/FoodCards.module.css"
import Link from "next/link";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { FaStarHalfAlt,FaStar } from "react-icons/fa";

const FoodCards = ({food}) => {
    return (
        <div className={styles.container}>
            {/* <Link href={`/product/${food._id}`} passHref>
                <Image src={food.img} alt="" width="500" height="500" />
            </Link>
            <h1 className={styles.title}>{food.title}</h1>
            <span className={styles.price}>
                ${food.prices[0]}
            </span>
            <p className={styles.desc}>
                {food.desc}
            </p> */}



            <Card style={{ width: '16rem' }}>
                <Link href={`/product/${food._id}`} passHref>
                    <Card.Img variant="top" src={food.img} />
                </Link>
            <Card.Body>
                <Card.Title>{food.title}</Card.Title>
                <Card.Text>
                {food.desc.slice(0,50)}...
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </ListGroupItem>
            </ListGroup>
            <Card.Footer>
                by-
                <Card.Link href="#">Author</Card.Link>
            </Card.Footer>
            </Card>

        </div>
    )
}

export default FoodCards
