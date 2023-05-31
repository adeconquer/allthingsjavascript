import './ExpensesList.css'
import ExpenseItem from './ExpenseItem'


const ExpensesList = props => {
    

    if(props.expenses.length === 0 ){
        return <h2 className='expenses-list__fallback'>Found no expenses.</h2>
    }

    return (
        <ul className='expenses-list'>
                {props.expenses
            .map(ei => <ExpenseItem
            key={ei.id}
            title={ei.title}
            amount={ei.amount}
            date={ei.date} />)}
        </ul>
    )
}


export default ExpensesList