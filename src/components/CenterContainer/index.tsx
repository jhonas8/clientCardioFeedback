import { 
  Logo,
  FeedbackButton,
} from '../../components'
import './Styles/css/style.css'
import Types from '../../@types/CenterContainerTypes'

export default function CenterContainer(this: any, props:Types.Props) {

  const { 
    setOpenMenu,
    openMenu,
  } = props

  const render = () => (
    <div className='CenterContainer'>
      { Logo().render() }
      { FeedbackButton({setOpenMenu, openMenu}).render() }
    </div>
  )

  return {
    render,
  }
}
