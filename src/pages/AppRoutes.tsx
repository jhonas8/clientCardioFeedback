import {
    useContext
} from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import {
    LoginPage,
    HomePage,
    AdminPage,
    RegistrationPage,
    TIPage,
    UsersPage,
    UserPage,
    SearchUsersPage,
    RankingPage,
    ChartPage,
} from './'

import {
    AuthProvider,
    AuthContext
} from '../contexts/auth/auth'
import NotFoundPage from './NotFound'

export default function AppRoutes(){

    interface Props {
        children : JSX.Element | JSX.Element[]
        segment?: string
    }

    const Private = (props: Props) => {
        const { loading, authenticated, userSegment } = useContext(AuthContext)!
        const { children, segment } = props

        const LoadingText = () => <h1>Loading...</h1>

        const isAuthorizedSegment: boolean = !segment && userSegment==='Recepção'
            ? true
            : (segment === userSegment)

        return loading
            ? LoadingText()
            : authenticated
                ? isAuthorizedSegment  
                    ? <> { children } </>
                    : <Navigate to={'/' + (userSegment!=='Recepção' ? userSegment?.toLowerCase()! : '')}/>
                : <Navigate to='/login'/>
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={
                        <Private>
                            <HomePage/>
                        </Private>
                    }/>
                    
                    <Route path='/admin'>
                        <Route index element={
                            <Private segment='admin'>
                                <AdminPage/>
                            </Private>
                        }/>

                        <Route path='charts' element={
                            <Private segment='admin'>
                                <ChartPage/>
                            </Private>
                        }/>

                        <Route path='ranking' element={
                            <Private segment='admin'>
                                <RankingPage/>
                            </Private>
                        }/>

                        <Route path='userpage'>
                            <Route path=':userId' element={
                                <Private segment='admin'>
                                    <UserPage/>
                                </Private>
                            }/>
                        </Route>

                        <Route path='search' element={
                            <Private segment='admin'>
                                <SearchUsersPage/>
                            </Private>
                        }/>
                    </Route>

                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/ti' >
                        <Route index element={
                            <Private segment='TI'>
                                <TIPage/>
                            </Private>
                        }/>
                        
                        <Route path='register' element={
                            <Private segment='TI'>     
                                <RegistrationPage/>
                            </Private>
                        }/>

                        <Route path='users' element={
                            <Private segment='TI'>
                                <UsersPage/>
                            </Private>
                        }/>
                    </Route>

                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}