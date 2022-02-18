import './Styles/css/style.css'

export default function Logo() {

  const LogoText = {
    firstHalf: 'Cardio',
    secondHalf: 'Imagem',
  }

  const render = (): JSX.Element => 
    <div className='Logo'>
      <div className='Cardio'>{LogoText.firstHalf}</div>
      <div className='gap'/>
      <div className='Imagem'>{LogoText.secondHalf}</div>
    </div>

  return {
    render
  }
}
