import Button from '../../UI/Button'
import Input from '../../UI/Input'
import styles from './MealItemForm.module.css'


const MealItemForm = props => {
    const inputObj = {id: 'Amount', type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}
    const btn = {}
    return <form className={styles.form}>
        <Input label="Amount" input={inputObj}/>
        <Button options={btn}>+ Add</Button>
    </form>
}

export default MealItemForm