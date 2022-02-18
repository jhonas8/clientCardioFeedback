import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth/auth'
import './Styles/css/styles.css'

const LogoutButton = () => {

    const { logout } = useContext(AuthContext)!

    const Logout = () => logout!()

    const render = () => (
        <button
            className='logoutButton'
            onClick={Logout!}
        >
            Logout
        </button>
    )

    return {
        render,
    } 
} 

export default LogoutButton