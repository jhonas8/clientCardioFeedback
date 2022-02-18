import Types from '../../@types/LoginCardTypes'
import './Styles/css/styles.css'

declare interface RegistrationProps extends Types.Props {
    setSegmentation: any
    segmentation: string
    employeeName: string,
    setEmployeeName: any
}

export default function RegistrationCard(this: any, props: RegistrationProps) {

    const {
        name,
        password,
        setName,
        setPassword,
        handleSubmit,
        setSegmentation,
        segmentation,
        employeeName,
        setEmployeeName
    } = props


    const RegisterCardFrame = (children: JSX.Element[]) => {

        const render = () => 
            <div className="Register" key="Register">
                {[ ...children ]}
            </div>
        return {
            render,
        }
    }

    const RegisterForm = () => {

        const render = () => (
            <form className="RegisterForm" onSubmit={handleSubmit} key="RegisterForm">
                { RegisterFormTitle().render() }
                { RegisterUserInput().render() }
                { RegisterPasswordInput().render() }
                { RegisterNameInput().render() }
                { SegmentationInput().render() }
                { RegisterSubmitButton().render() }
            </form>
        )

        const RegisterFormTitle = () =>{

            const RegisterFormTitleText = 'Sign up'

            const render = () => <h3 key="RegisterFormTitle">{ RegisterFormTitleText }</h3>
        
            return {
                render,
            }
        }

        return {
            render,
        }
    }

    const RegisterUserInput = () => {

        const Label = () => {

            const LabelText = 'Usuário'

            const render = () => <label htmlFor="username" key="RegisterUserInputLabel">{ LabelText }</label>

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
                key="RegisterUserInput"
                required
            />

            return {
                render,
            }
        }

        const render = () => 
            RegisterFormField().renderWithChildren([
                Label().render(),
                Input().render()
            ])


        return {
            render,
        }
    }
    const RegisterPasswordInput = () => {

        const Label = () => {

            const LabelText = 'Senha'

            const render = () => <label htmlFor="password" key='RegisterPasswordLabel'>{ LabelText }</label>

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
                key="RegisterPasswordInput"
                required
            />

            return {
                render,
            }
        }

        const render = () => 
            RegisterFormField().renderWithChildren([
                Label().render(),
                Input().render()
            ])


        return {
            render,
        }
    }
    const RegisterNameInput = () => {

        const Label = () => {

            const LabelText = 'Nome Completo'

            const render = () => <label key='RegisterNameLabel'>{ LabelText }</label>

            return {
                render,
            }
        }

        const Input = () => {

            const render = () =>  <input 
                type="text" 
                name="name" 
                id="password"
                onChange={e=>setEmployeeName(e.target.value)}
                value={employeeName}
                key="RegisterNamedInput"
                required
            />

            return {
                render,
            }
        }

        const render = () => 
            RegisterFormField().renderWithChildren([
                Label().render(),
                Input().render()
            ])


        return {
            render,
        }
    }

    const SegmentationInput = () => {
        
        const segmentations = [
            'TI',
            'Recepção',
        ]

        const InputList = () => {

            const Input = () =>(
                <>
                    <input 
                        list='segmentationList' 
                        onChange={e => setSegmentation(e.target.value)}
                        placeholder={segmentation}
                        autoComplete='off'
                        required
                    />
                    <datalist id='segmentationList'>
                        {
                            segmentations.map(
                                segmentation => <option value={segmentation} key={segmentation}/>
                            )
                        }
                    </datalist>
                </>
            ) 


            const render =() => <>
                { Input() }
            </>

            return {
                render,
            }
        }

        const render = () => InputList().render()

        return {
            render,
        }
    }

    const RegisterSubmitButton = () => {

        const ButtonText = 'Registrar'

        const render = () => (
            <div 
                className="actions" 
                key="RegisterSubmitButton"
            >
                <button type="submit" className='RegisterButton'>{ ButtonText }</button>
            </div>
        )


        return {
            render,
        }
    }

    const RegisterFormField = () => {
        
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
        RegisterCardFrame([
            RegisterForm().render(),
        ]).render()

    return {
        render,
    }
}