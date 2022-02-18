import { LogoutButton } from "../../components"
import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function TIPage(this: any) {

    type buttonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

    interface TIPageButtonProps {
        buttonText: string
        handleClick: (e:buttonEvent) => void
    }

    const navigate = useNavigate()

    const props = {
        for: {
            showUserButton: {
                buttonText: 'Usuários',
                handleClick: (e:buttonEvent)=>{
                    e.preventDefault()
                    navigate('users')
                }
            },

            registerNewUser: {
                buttonText: 'Registrar Usuário',
                handleClick: (e:buttonEvent)=>{
                    e.preventDefault()
                    navigate('register')
                }
            }
        }
    }

    const TIPageButton = (props: TIPageButtonProps) => {

        const { buttonText, handleClick } = props

        const render = () => (
            <button className="tiButton" key={'tiButton' + buttonText} onClick={e=>handleClick(e)}>
                <div className="tiButtonText">
                    { buttonText }
                </div>
            </button>
        )
        
        return {
            render,
        }
    }

    return(
        <main className="tiPage" key='tiPage'>
            { LogoutButton().render() }
            { TIPageButton(props.for.registerNewUser).render() }
            { TIPageButton(props.for.showUserButton).render() }
        </main>
    )
}