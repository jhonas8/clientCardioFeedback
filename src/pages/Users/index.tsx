import { useState } from 'react'
import { HomeButton, UsersTable } from "../../components"

export default function UsersPage(this: any) {

    const [password, setPassword] = useState<string>('')

    const props = {
        for: {
            HomeButton: '/ti',
            
            UsersTable: {
                password,
                setPassword
            }
        }
    }

    return(
        <main className="usersPage" key='usersPage'>
            { HomeButton(props.for.HomeButton).render() }
            { UsersTable(props.for.UsersTable).render() }
        </main>
    )
}