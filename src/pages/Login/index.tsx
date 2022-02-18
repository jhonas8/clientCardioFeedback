import { useState, useContext, FormEvent } from "react"
import { LoginCard } from "../../components"
import { AuthContext } from "../../contexts/auth/auth"
import './styles.css'

export default function LoginPage(this: any) {

    //Hooks
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { login } = useContext(AuthContext)!

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        login!(name, password)
    }

    //Props for components
    const props = {
        for: {
            LoginPage: {
                name,
                password,
                setName,
                setPassword,
                handleSubmit,
            }
        }
    }

    return (
        <main className="LoginPage" key='LoginPage'>
            { LoginCard({...props.for.LoginPage}).render() }
        </main>
    )
}