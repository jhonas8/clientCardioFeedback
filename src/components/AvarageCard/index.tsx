import userType from "../../@types/UserType"

import './Styles/css/styles.css'

export interface avarageCardProps {
    score: userType.responseUser['score']
}

export default function AvarageCard(props: avarageCardProps) {
    
    type keyType = 'bad' | 'regular' | 'good' | 'great'

    const {
        currentMonth,
        previousMonth,
    } = props.score!

    const Card = (title: keyType, text: number) => (
        <div className="avarageCard">
            <CardText title={title} text={text}/>
            {AbsoluteServices(title)}
        </div>
    )
    
    const CardText = ({title, text }:{title: keyType, text: number}) => (
        <div className="cardText">
            <div className="title">{title}</div>
            <div className="text">{text.toPrecision(4)}%</div>
        </div>
    )

    const AbsoluteServices = (key: keyType) => (
        <div style={{textAlign: 'center'}}>
            Atendimentos: {currentMonth.numberOfServices[key]}
        </div>
    )

    const render = () => (
        <>
            <h3 className='cardTitle'>Mês atual</h3>
            <main className="avarageCardMain">
                {
                    Object.entries(currentMonth.avarage)
                        .map(
                            ([key, value]) => Card(key as keyType,value)
                        )
                        //[[key, value],[key, value]]
                }
                
                <div className="avarageCard">
                    <div className="cardText">
                        <div className="title">Total</div>
                        <div className="text">{currentMonth.numberOfServices.total}</div>
                    </div>
                </div>
                
            </main>

            {
                previousMonth && (
                    <>
                        <h3 className='cardTitle'>Mês Passado</h3>
                        <main className="avarageCardMain">
                            {
                                Object.entries(previousMonth.avarage)
                                    .map(
                                        ([key, value]) => Card(key as keyType,value)
                                    )
                                    //[[key, value],[key, value]]
                            }
                            
                            <div className="avarageCard">
                                <div className="cardText">
                                    <div className="title">Total</div>
                                    <div className="text">{previousMonth.numberOfServices.total}</div>
                                </div>
                            </div>
                        </main>
                    </>
                )
            }
        </>
    )

    return { render }
}