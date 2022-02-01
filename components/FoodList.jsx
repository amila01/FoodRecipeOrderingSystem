import Image from "next/image";
import styles from "../styles/FoodList.module.css"
import FoodCards from "./FoodCards";

const FoodList = ({foodList}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Top Recipes</h1>
            {/* <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil accusamus dolore deleniti distinctio 
                ucimus veritatis totam laboriosam maxime sequi aliquam earum, reiciendis atque magnam tenetur quo error 
                voluptate. Commodi libero omnis ea accusamus ratione nisi tenetur, 
            </p> */}
            <div className={styles.wrapper}>
                {foodList.map((food)=>(
                    <FoodCards key={food._id} food={food}/>
                ))}
            </div>
        </div>
    )
}

export default FoodList
