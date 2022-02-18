import './Styles/css/styles.css'
import Types from '../../@types/LoginCardTypes'

export default function LoginCard(this: any, props: Types.Props) {

    const {
        name,
        password,
        setName,
        setPassword,
        handleSubmit,
    } = props

    const LoginCardFrame = (children: JSX.Element[]) => {

        const render = () => 
            <div className="login" key="login">
                {[ ...children ]}
            </div>
        return {
            render,
        }
    }

    const LoginForm = () => {

        const render = () => (
            <form className="loginForm" onSubmit={handleSubmit} key="loginForm">
                { LoginFormTitle().render() }
                { LoginUserInput().render() }
                { LoginPasswordInput().render() }
                { LoginSubmitButton().render() }
            </form>
        )

        const LoginFormTitle = () =>{

            const LoginFormTitleText = 'Login'

            const render = () => <h3 key="loginFormTitle">{ LoginFormTitleText }</h3>
        
            return {
                render,
            }
        }

        return {
            render,
        }
    }

    const LoginUserInput = () => {

        const Label = () => {

            const LabelText = 'Usuário'

            const render = () => <label htmlFor="username" key="LoginUserInputLabel">{ LabelText }</label>

            return {
                render,
            }
        }

        const Input = () => {

            const render = () =>  <input 
                type="text" 
                name="user" 
                id="email"
                onChange={e=>setName(e.target.value)}
                value={name}
                key="LoginUserInput"
                autoFocus
            />

            return {
                render,
            }
        }

        const render = () => 
            LoginFormField().renderWithChildren([
                Label().render(),
                Input().render()
            ])


        return {
            render,
        }
    }
    const LoginPasswordInput = () => {

        const Label = () => {

            const LabelText = 'Senha'

            const render = () => <label htmlFor="password" key='LoginPasswordLabel'>{ LabelText }</label>

            return {
                render,
            }
        }

        const Input = () => {

            const render = () =>  <input 
                type="password" 
                name="password" 
                id="password"
                onChange={e=>setPassword(e.target.value)}
                value={password}
                key="LoginPasswordInput"
            />

            return {
                render,
            }
        }

        const render = () => 
            LoginFormField().renderWithChildren([
                Label().render(),
                Input().render()
            ])


        return {
            render,
        }
    }

    const LoginSubmitButton = () => {

        const ButtonText = 'Entrar'

        const render = () => (
            <div className="actions" key="LoginSubmitButton">
                <button type="submit" className='loginButton'>{ ButtonText }</button>
            </div>
        )


        return {
            render,
        }
    }

    const LoginFormField = () => {
        
        const renderWithChildren = (children: JSX.Element[]) => (
            <div className="field">
                { children }
            </div>
        )

        return {
            renderWithChildren,
        }
    } 

    const render = () =>
        LoginCardFrame([
            LoginForm().render(),
        ]).render()

    return {
        render,
    }
}