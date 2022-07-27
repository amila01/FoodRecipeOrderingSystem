import styles from '../styles/Add.module.css';

const AddButton = ({name,setClose}) => {
  return (
        <div 
            className={styles.mainAddButton}
            onClick={()=>setClose(false)}
        >
            {name}
        </div>
  );
};

export default AddButton;
