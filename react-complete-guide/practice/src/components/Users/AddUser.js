import {useState} from 'react'
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AddUser.module.css"

const AddUser = props => {
    const[userName, setUserName] = useState('')
    const[age, setAge] = useState('')


    const userNameChangeHandler = event => {
        setUserName(event.target.value)
    }

    const ageChangeHandler = event => {
        setAge(event.target.value)
    }

    const addUserHandler = event => {
        event.preventDefault()
        if (userName.trim().length === 0 || age.trim().length === 0) {
            props.onUserNameAgeMissing({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values)'
            })
            return
        }
        if (+age < 1) {
            props.onAgeInvalid({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0)'
            })
            return
        }
        props.onAddUser(userName,age)
        setUserName('')
        setAge('')
    }

    return (
        <Card className={styles.input}>
            
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id='username' type='text' value={userName} onChange={userNameChangeHandler}/>
                <label htmlFor="age">Age(Years)</label>
                <input id='age' type='number' value={age} onChange={ageChangeHandler}/>
                <Button type='submit'>Add User</Button>
            </form>

        </Card>
    )
};

export default AddUser