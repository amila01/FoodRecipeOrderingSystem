import styles from '../styles/Add.module.css';

const AddButton = ({setClose}) => {
  return (
        <div 
            className={styles.mainAddButton}
            onClick={()=>setClose(false)}
        >
            Add New Recipe
        </div>
  );
};

export default AddButton;
