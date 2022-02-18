import { useState, useContext, FormEvent } from 'react'
import { RegistrationCard, HomeButton } from "../../components"
import { AuthContext } from '../../contexts/auth/auth'
import './styles.css'

export default function RegistrationPage(this: any) {

    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [segmentation, setSegmentation] = useState<string>('Recepção')
    const [employeeName, setEmployeeName] = useState<string>('')

    const { register } = useContext(AuthContext)!

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    
        console.log('Registration')

        return register!(
            name,
            password,
            segmentation,
            employeeName,
        )
    }
    
    const props = {
        for: {
            RegistrationCard: {
                password,
                setPassword,
                name,
                setName,
                handleSubmit,
                setSegmentation,
                segmentation,
                employeeName,
                setEmployeeName
            },

            HomeButton: '/ti'
        }
    }

    
    

    return(
        <main className='registrationPage'>
            { RegistrationCard(props.for.RegistrationCard).render() }
            { HomeButton(props.for.HomeButton).render() }
        </main>
    )
}