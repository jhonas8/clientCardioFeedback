import { Link } from 'react-router-dom'
import { HomeIcon } from '../../assets/Icons'
import './styles.css'

const HomeButton = (to: string) => {

    const render = () => (
        <Link to={to}>
            <button className="homeButtonTI" key='homeButtonTI'>
                <HomeIcon/>
            </button>
        </Link>
    )

    return {
        render,
    }
}

export default HomeButton