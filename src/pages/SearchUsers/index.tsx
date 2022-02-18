import { useState, useEffect } from 'react'
import userType from '../../@types/UserType'
import { HomeButton, LoadSpinn } from '../../components'
import { api } from '../../utils/getFeedback'
import { Link } from 'react-router-dom'
import './Styles/css/styles.css'

export default function SearchUsersPage() {

    const [users, setUsers] = useState<userType.user[] | null>(null)

    const PageTitle = () => {
        const titleText = 'Pesquise por um funcionário'

        const render = () => (
            <h1 className="employeeSearch" key={"employeeSearch"}>{ titleText }</h1>
        )

        return {
            render,
        }
    }

    const Searchbar = () => {

        const [username, setUsername] = useState<string>('')

        useEffect(()=>{
            (async()=>{
                const { data } = await api.post('/admin/search', { username })!
                setUsers(data)
            })()
        },[username])

        const render = () => (
            <input 
                type='text' 
                id='searchBar'
                key={'searchBar'}
                onChange={e=>setUsername(e.target.value)} 
                value={username}
            />
        )

        return { render }
    }

    const UsersGrid = () => {

        const UserCard = (props: { user: userType.user}) => (
            <Link to={`/admin/userpage/${props.user.id}`} key={props.user._id}>
                <div className="userCard">
                        <div className="userPhoto">
                            <img src='/Images/userdefault.png' alt='user'/>
                        </div>
                        <div className="userCardName">
                            { props.user.name }
                        </div>
                </div>
            </Link>
        )

        const render = () => !users
            ? <LoadSpinn/>
            : (
                <div className="usersGrid" key={"usersGrid"}>
                    { users.map( user => <UserCard user={user} key={user.id}/>) }
                </div>
            )
        
        return { render }
    }

    return (
        <div className="searchUsersPage" key={"searchUsersPage" }>
            { HomeButton('/admin').render() }
            { PageTitle().render() }
            { Searchbar().render() }
            { UsersGrid().render() }
        </div>
    )
}