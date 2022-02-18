import { useEffect, useState } from 'react'
import userType from '../../@types/UserType'
import useFetch from "../../utils/useFetch"
import { LoadSpinn } from '../'
import {
    EditionIcon,
    TrashIcon,
} from '../../assets/Icons'
import './Styles/css/styles.css'
import useClickOutside from '../../utils/useClickOutside'
import { api } from '../../utils/getFeedback'

interface Props {
    setPassword: any 
    password: string
}

export default function UsersTable(this: any, props: Props) {

    const {
        data,
        error,
        isFetching
    } = useFetch<userType.user>('/ti/users')!

    const {
        setPassword,
        password,
    } = props

    const [editVisible, setEditVisible] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')
    const [users, setUsers] = useState<userType.user[] | null>(null)

    useEffect(()=>{
        if(!users && data) {
            setUsers(data)
        }
        if(users){
            console.log(users)
        }
    },[data, users])

    let editWindowRef = useClickOutside(()=>{
        setEditVisible(false)
    })

    const ErrorMessage = () => {
        const message = `Erro ao carregar os usuários.`

        const render = () => (
            <>
                <h1 key={message}>{ message }</h1>
                <p key={error?.message}>{ error?.message }</p>    
            </>
        )

        return {
            render,
        }
    }

    const EditButton = (userId: string) => {

        const handleClick = () =>{
            setEditVisible(!editVisible)
            setUserId(userId)
        }

        const render = () => (
            <button className="TableButton edit" onClick={handleClick}>
                <EditionIcon/>
            </button>
        )
        
        return {
            render,
        }
    }

    const RemoveButton = (userId: string, index: number) => {
        
        const handleClick = async() => {
            const {data: { deletedCount}} = await api.post('/ti/users/remove', { userId })

            if(deletedCount) {
                window.alert('Usuário deletado!')

                const newUsers = users
                    ?.slice(0, index)
                    .concat(
                        users?.slice(index + 1)
                    )!
                
                setUsers(newUsers)
            }

            
        }

        const render = () => (
            <button className="TableButton remove" onClick={handleClick}>
                <TrashIcon/>
            </button>
        )

        return {
            render,
        }
    }

    const Table = () => {
        
        const TableTitle = () => <h1 className='tableTitle'>Tabela de usuários</h1>

        const render = () => (
            <>
                { EditUsersWindow().render() }
                <TableTitle/>
                <table className="usersTable" key="usersTable">
                    <thead key='tableUsersHead'>
                        <tr>
                            <th style={{width:'35%'}}>Nome</th>
                            <th>Usuário</th>
                            <th>Segmento</th>
                            <th style={{width:"7%"}}></th>
                            <th style={{width:"9%"}}></th>
                        </tr>
                    </thead>
                    <tbody key='tableUsersBody'>
                        {
                            users
                            ?.sort((a,b) => a.employeeName!.toLowerCase() > b.employeeName!.toLowerCase()
                                ? 1 
                                : -1 
                            ) //sorting alphabetically
                            .map(
                                (user, index) => (
                                    <tr key={user['_id']!}>
                                        <td style={{textTransform:'capitalize'}}>{ user!.employeeName }</td>
                                        <td>{ user!.name }</td>
                                        <td>{ user!.segment} </td>
                                        <td>{ EditButton(user!['_id']!).render() }</td>
                                        <td>{ RemoveButton(user!['_id']!, index).render() }</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </>
        )
        
        return {
            render,
        }
    }

    const EditUsersWindow = () => {

        const WindowTitle = () => <h3>Altere a senha&nbsp;:</h3>

        const handleSubmit = async(e: any) =>{
            e.preventDefault()

            const isChanged = await api.post('/ti/users/passwordChange', {userId: userId, newPassword: password})

            if(isChanged) {
                window.alert('Senha alterada!')
                window.location.reload()
            }
        }

        const Form = () => (
            <div ref={editWindowRef!}>
                <form 
                    onSubmit={handleSubmit} 
                    className={`editUserForm ${editVisible ? 'visible' : ''}`}
                >
                    <WindowTitle/>
                    <PasswordInput/>
                    <SubmitButton/>
                </form>
            </div>
        )

        const PasswordInput = () => (
            <input 
                type='password'
                autoFocus
                onChange={e=>setPassword(e.target.value)}
                value={password}
                className='editUserWindowPassword'
            />
        )

        const SubmitButton = () => (
            <input type='submit' value='Alterar' className='editWindowSubmit'/>
        )

        return {
            render: () => <Form/>
        }
    }

    const render = () => isFetching
        ? <LoadSpinn/>
        : error 
            ? ErrorMessage().render()
            : Table().render()

    return {
        render,
    }
}