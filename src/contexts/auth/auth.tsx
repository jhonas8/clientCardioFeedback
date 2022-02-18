import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userType from '../../@types/UserType'
import { api } from '../../utils/getFeedback'

interface AuthContextInterface {
    user?: userType.user | null
    authenticated?: boolean
    login?: (user: string, password: string) => void
    register?: (username: string, password: string, segmentation: string, employeeName: string) => void
    logout?: () => void
    loading?: boolean
    userSegment?: string
}

export const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
    const [ user, setUser ] = useState<userType.user | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ userSegment, setUserSegment ] = useState<string>('')
    const navigate = useNavigate()

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user')

        if(recoveredUser && !user) {
            const recoveredUserAsObject = JSON.parse(recoveredUser)

            setUser(recoveredUserAsObject)
            setUserSegment(recoveredUserAsObject.segment)
        }

        loading && setLoading(false)
        
    },[user,loading,setUser,setLoading])

    const login = async(username: string, password: string) => {

        const { data } = await api.post('/login', {username, password})

        if(data){            
            const loggedUser = {
                id: data['_id'] as string, 
                name: data.name as string,
                segment: data.segment as string
            }

            console.log(loggedUser)

            localStorage.setItem('user', JSON.stringify(loggedUser))

            setUser(loggedUser)
            setUserSegment(data.segment as string)

            const targetLocation = data.segment !== 'Recepção'
                ? data.segment?.toLowerCase()!
                : ''

            navigate(targetLocation)
        }else {
            window.alert('Usuário não encontrado.')
            window.location.reload()
        }
    }

    const logout = () => {
        console.log('Logout')

        localStorage.removeItem('user')
        setUser(null)
        
        navigate('/login')
    }

    const register = async(username: string, password: string, segmentation: string, employeeName: string) => {
        const user = { name: username, password, segment: segmentation, employeeName }
        
        console.log('Registered ', user)

        const { data } = await api.post('/ti/register', user)

        if(data){
            window.alert(data)
            window.location.reload()
        }
    }

    return(
        <AuthContext.Provider
            value ={{authenticated: !!user, user: user, loading, login, logout, register, userSegment}}
        >
            {children}
        </AuthContext.Provider>
    )

}