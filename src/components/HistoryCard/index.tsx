import userType from '../../@types/UserType'
import './Styles/css/styles.css'

export default function HistoryCard({history, name}:{history:userType.history[], name: string}) {

    const Table = () => {
        
        const TableTitle = () => <h1 className='tableTitle'>Histórico</h1>

        const render = () => (
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
                            history.map(
                                avaliation => <tr>
                                    <td>{name}</td>
                                    <td>{avaliation.feedbackRate}</td>
                                    <td>{avaliation.date}</td>
                                    <td>{avaliation.hour}</td>
                                </tr>
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

    const render = () => (
        <main className="hitoryCardMain">
            { Table().render() }
        </main>
    )

    return { render }
}