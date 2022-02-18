import { useState, useEffect } from 'react'
import userType from '../../@types/UserType'
import { HomeButton, LoadSpinn } from '../../components'
import { api } from '../../utils/getFeedback'

import './Styles/css/styles.css'

export default function ChartPage() {
    type avaragesType = {
        currentAvarages: {name: string, value: number}[],
        previousAvarages: {name: string, value: number}[],
        companyScore: number,
        suggestedScore: number,
        userAndHistory: Array<{history: userType.history[], name: string}>
    }

    const [avarages, setAvarages] = useState<avaragesType | null>(null)

    useEffect(()=>{
        (async()=>{
            const { data } = await api.get('/admin/charts') as {data: avaragesType}

            setAvarages(data)
    
        })()
    })

    const PageTitle = () => {
        return {
            render: () => <h1 className='chartPageTitle'> Geral </h1>
        }
    } 

    const SuggestedPointsCard = () => {

        const ScoreSituation = () => {
            const Title = () => <h4>Score Sugerido</h4>

            const ScorePoints = () => avarages
             ?<p> { avarages.suggestedScore } </p>
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
            const Title = () => <h3>Score da Empresa</h3>

            const ScorePoints = () => avarages
            ?<p 
                id='scorePointsP'
            > { avarages.companyScore } </p>
            :<LoadSpinn/>

            const Card = () => <div className="gridCard">
                <Title/>
                <ScorePoints/>
                <SuggestedPointsCard/>
            </div>

            return <Card/>
        }

        const render = () => (
            <ScoreSituation/>
        )

        return { render }
    }

    const Card = (title: string, text: number) => (
        <div className="avarageCard">
            <CardText title={title} text={text}/>
        </div>
    )
    
    const CardText = ({title, text }:{title: string, text: number}) => (
        <div className="cardText">
            <div className="title">{title}</div>
            <div className="text">{text.toPrecision(4)}%</div>
        </div>
    )

    const Table = () => {
        
        const TableTitle = () => <h1 className='tableTitle'>Histórico</h1>

        const render = () => avarages
         ?(
            <>
                <TableTitle/>
                <table className="historyTable" key="historyTable">
                    <thead key='tableHistoryHead'>
                        <tr>
                            <th style={{width:'35%'}}>Funcionário</th>
                            <th>Avaliação</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody key='tableHistoryBody'>
                        {
                            avarages!.userAndHistory.map(
                                ({history, name}) => (
                                    history.map(
                                        avaliation => <tr>
                                            <td>{name}</td>
                                            <td>{avaliation.feedbackRate}</td>
                                            <td>{avaliation.date}</td>
                                            <td>{avaliation.hour}</td>
                                        </tr> 
                                    )
                                )
                            )
                        }
                    </tbody>
                </table>
            </>
        )
        :<LoadSpinn/>
        
        return {
            render,
        }
    }

    return avarages 
        ?(
            <main className="chartPageMain">
                { HomeButton('/admin').render() }
                { PageTitle().render() }
                { ScorePointsCard().render() }
                <h3 className='cardTitle'>Mês atual</h3>
                <main className="avarageCardMain">
                    {
                        avarages.currentAvarages.map(
                            avarage => Card(avarage.name, avarage.value)
                        )
                    } 
                    <div className="avarageCard">
                        <div className="cardText">
                            <div className="title">Total</div>
                            <div className="text">{avarages.userAndHistory.reduce(
                                (acc, value) => acc + value.history.length
                            ,0)}</div>
                        </div>
                    </div>
                    
                </main>
                
                {
                    avarages.previousAvarages.length && (
                        <>
                            <h3 className='cardTitle'>Mês Passado</h3>
                            <main className="avarageCardMain">
                                {
                                    avarages!.previousAvarages.map(
                                        avarage => Card(avarage.name, avarage.value)
                                    )
                                }
                            </main>
                        </>
                    )
                }

                { Table().render() }

            </main>
        )
        : <LoadSpinn/>
}