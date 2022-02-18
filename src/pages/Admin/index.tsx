import {
    LogoutButton,
    AdminButton,
} from '../../components'
import './Styles/css/styles.css'

export default function AdminPage(){

    const PageTitle = () => {
        const titleText = 'Administração'

        const render = () =>(
            <h1 className="adminPageTitle">
                { titleText }
            </h1>
        )

        return { 
            render,
        }
    }

    return (
        <main className="adminPage">
            { LogoutButton().render() }
            { PageTitle().render() }
            { AdminButton().render() }
        </main>
    )
}