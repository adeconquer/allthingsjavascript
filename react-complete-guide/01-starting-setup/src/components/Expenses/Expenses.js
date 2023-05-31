import './Expenses.css'
import Card from '../UI/Card'
import ExpensesFilter from '../ExpensesFilter/ExpensesFilter'
import { useState } from 'react'
import ExpensesList from './ExpensesList'
import ExpensesChart from './ExpensesChart'

const Expenses = (props) => {
    const expenses = props.data
    const [year, setYear] = useState('2020')
    const pickYearHandler = (selectedYear) => {
        // console.log('Expenses.js')
        // console.log(selectedYear)
        setYear(selectedYear)
    }
    const filteredExpenses = expenses.filter(exp => exp.date.getFullYear().toString() === year)
    
    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter value={year} onPickYear={pickYearHandler}/>
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList expenses={filteredExpenses}/>      
            </Card>
        </div>
    )
}

export default Expenses