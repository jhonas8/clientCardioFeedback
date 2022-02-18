import './style.css'

export default function LoadSpinn(this: any) {

    const CenterContainer = (child: JSX.Element) => {

        const render = () => (
            <div className="spinnCenterContainer">
                { child }
            </div>
        )

        return {
            render,
        }
    }

    const Spinn = () => {

        const render = () => (
            <div className='loadSpinn'/>
        )
        
        return {
            render,
        }
    }

    

    return (
        CenterContainer(
            Spinn().render()
        ).render()
    )
}