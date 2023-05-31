import React from 'react'
import UserListItem from './UserListItem'
import Card from '../UI/Card'
import styles from './UsersList.module.css'



const UsersList = props => {
    const users = props.list
    return (
        <Card className={styles.users}>

            <ul >
                {users.map(user => <UserListItem key={user.id}>{`${user.userName} (${user.age}) years old`}</UserListItem>)}
            </ul>

        </Card>
    )
}

export default UsersList