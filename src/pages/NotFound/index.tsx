import { Link } from 'react-router-dom'
import './styles.css'

export default function NotFoundPage() {

    return (
        <>
            <h1 className="notFoundTitle">Error 404!</h1>
            <p className="notFoundMessage">Page not found! <Link to='/'> &nbsp; Go to Home.</Link></p>
        </>
    )
}