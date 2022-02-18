import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { HomeButton, LoadSpinn } from "../../components"
import { AuthContext } from '../../contexts/auth/auth'
import { api } from '../../utils/getFeedback'

import './Styles/css/styles.css'

export default function RankingPage(){

    type usersType = {points: number, name: string, userId: string}[]

    const [users, setUsers] = useState<usersType | null>(null)
    const { user } = useContext(AuthContext)!

    useEffect(()=>{

        user!.id && (async()=>{
            const { data } = await api.post('/admin/ranking', {userId: user?.id}) as {data: usersType | null}

            if(data !== users) setUsers(data!)
        })()
    },[user, users])

    
    const PageTitle = () => {
        const render = () =>(
            <div className="rankingPageTitle">
                <img src="/Images/crown.png" alt="crown"/>
                <h2>Ranking</h2>
            </div>
        )
        
        return { render }
    }
    
    const RankingTable = () => {

        const TableCard = ({index, name, score}:{index: number, name: string, score: number}) => (
            <div className="rankingTableCard" key={index}>
                <div style={{borderRight: '1px solid rgba(0,0,0,0.4)'}}>{index + 1}</div>
                <div>{name}</div>
                <div>{score}</div>
            </div>
        )
        
        const Table = ({children}: {children:JSX.Element[]}) => (
            <div className="rankingTable">
                {children}
            </div>
        )

        const render = () => users
            ?(
                <Table>
                    {
                        users!.map(
                            (user, index) => <Link to={`/admin/userpage/${user.userId}`} key={index}>
                                <TableCard index={index} name={user.name!} score={user.points}/>
                            </Link>
                        )
                    }
                </Table>
            )
            : <LoadSpinn/>

        return { render }
    }

    return (
        <main className="rankingPageMain">
            { HomeButton('/admin').render() }
            { PageTitle().render() }
            { RankingTable().render() }
        </main>
    )
}