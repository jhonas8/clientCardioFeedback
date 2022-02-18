import { Link } from 'react-router-dom'
import {
    SearchIcon,
    ChartIcon,
    RankingIcon,
} from '../../assets/Icons'
import './Styles/css/styles.css'

export default function AdminButton() {

    const ChartButton = () => (
        <Link to='charts'>
            <div className="buttonAdminContainer">
                <button className="chartButtonAdmin" id='adminButton'>
                    <ChartIcon/>
                </button>
                <p>Geral</p>
            </div>
        </Link>
    )
    
    const SearchButton = () => (
        <Link to='search'>
            <div className="buttonAdminContainer">
                <button className="searchButtonAdmin" id='adminButton'>
                    <SearchIcon/>
                </button>
                <p>Pesquisar</p>
            </div>
        </Link>
    )
    
    const RankingButton = () => (
        <Link to='ranking'>
            <div className="buttonAdminContainer">
                <button className="rankingButtonAdmin" id='adminButton'>
                    <RankingIcon/>
                </button>
                <p>Ranking</p>
            </div>
        </Link>
    )

    const CardGrid = ({children}: {children: JSX.Element[]}) => (
        <div className="cardGrid">
            { children }
        </div>
    )

    const render = () => (
        <CardGrid>
            <ChartButton/>
            <SearchButton/>
            <RankingButton/>
        </CardGrid>
    )

    return {
        render,
    }
}
