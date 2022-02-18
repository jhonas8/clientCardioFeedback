import Types from '../../@types/ButtonTypes'
import './Styles/css/styles.css'

export default function FeedbackButton(this: any, props: Types.Props) {
  
  const { setOpenMenu,
          openMenu } = props

  const button = () => ({
    buttonText: 'Feedback',

    render: () => 
      <button 
      className="FeedbackButton"
      onClick={()=>setOpenMenu(!openMenu)}
    >
      { button().buttonText }
    </button>,

  })

  const render = () => (
    button().render() 
  )
  
  return {
        render,
  }
}
