import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import userType from '../../@types/UserType'
import { HomeButton, AvarageCard, LoadSpinn, HistoryCard } from '../../components'
import { api } from '../../utils/getFeedback'

import './Styles/css/styles.css'

export default function UserPage() {

    type children = JSX.Element[] | JSX.Element 

    const { userId } = useParams()
    const [user, setUser] = useState<userType.responseUser | null>(null)
    const [scoreColor, setScoreColor] = useState<string>('')

    useEffect(()=>{
        (async()=>{
            const { data } = await api.post('/admin/userpage', { userId }) as {data: userType.responseUser}

            switch(data?.score?.currentMonth.points.classification){
                case 'bad':
                    setScoreColor('#FF6464')
                break

                case 'suggested':
                    setScoreColor('#8BDB81')
                break

                case 'great':
                    setScoreColor('#219F94')
                break 

                case 'exceptional':
                    setScoreColor('#F1D00A')
                break
            }

            setUser(data)
        })()
    },[userId])


    const ProfileCard = () => {

        const Card = ({children}: {children:children}) => (
            <div className="cardUserProfile">
                { children }
            </div>
        )

        const UserNameAndSegment = () => user
            ?(
                <div className="userProfileDesc">
                    <p className='userNameProfile'>{user?.user.employeeName}</p>
                    <p className='userSegmentProfile'>{user?.user.segment}</p>
                </div>
            )
            : <LoadSpinn/>

        const UserImage = () => (
            <div className="userImage">
                <img alt='profile' src='/Images/userdefault.png'/>
            </div>
        )

        const render = () => (
            <Card>
                <UserImage/>
                <UserNameAndSegment/>
            </Card>
        )

        return { render }
    }

    const SuggestedPointsCard = () => {

        const ScoreSituation = () => {
            const Title = () => <h4>Score Sugerido</h4>

            const ScorePoints = () => user
             ?<p> { user?.score?.currentMonth.points.suggestedPoints } </p>
             :<LoadSpinn/>

            const Card = () => <div className="suggestedPointsCard">
                <Title/>
                <ScorePoints/>
            </div>

            return <Card/>
        }

        return <ScoreSituation/>
    }

    const ScorePointsCard = () => {

        const ScoreSituation = () => {
            const Title = () => <h3 style={{color:scoreColor}}>Score</h3>

            const classification = user
                ?user?.score?.currentMonth.points.classification === 'suggested'
                    ? 'good'
                    : user?.score?.currentMonth.points.classification
                :''

            const ScorePoints = () => user
            ?<p 
                id='scorePointsP'
                style={{borderColor:scoreColor, color:scoreColor}}
            > { user?.score?.currentMonth.points.actualPoints } </p>
            :<LoadSpinn/>

            const Classification = () => <div style={{borderColor:scoreColor, color:scoreColor}}> {classification}</div> 

            const Card = () => <div className="gridCard">
                <Title/>
                <ScorePoints/>
                <SuggestedPointsCard/>
                <Classification/>
            </div>

            return <Card/>
        }

        const render = () => (
            <ScoreSituation/>
        )

        return { render }
    }

    const noUserStyle: React.CSSProperties = {
        color: 'var(--primary-color)',
        width: '100vw',
        textAlign: 'center',
        marginTop: '1rem',
    }
    
    return(
        <div className='userPage'>
            { HomeButton('/admin/search').render() }
            { ProfileCard().render() }

            {
                (user)
                ? user.history.length
                    ?(
                        <div className="scoresContainer">
                            { ScorePointsCard().render() }
                            { AvarageCard({score: user?.score!}).render() }
                            { HistoryCard({history:user?.history!, name:user?.user.employeeName!}).render() }
                        </div>
                    )
                    : <h3 style={noUserStyle}>Não existem avaliações para este funcionário.</h3>

                : <LoadSpinn/>
            }

        </div>
    )


}