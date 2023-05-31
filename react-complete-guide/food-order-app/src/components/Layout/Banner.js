import mealsImage from '../../assets/meals.jpeg'
import styles from './Banner.module.css'

const Banner = props => {
    return (
        <div className={styles['main-image']}>
            <img src={mealsImage} alt='A table full of delicious food!'/>
        </div>
    )
}

export default Banner