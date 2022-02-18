import { useState } from 'react'
import { CenterContainer,
         AvaliationFrame } from '../../components'
import { LogoutButton } from '../../components'

export default function Home() {

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const props = {
    for: {
      Button: { openMenu, setOpenMenu },
      AvaliationFrame: { openMenu, setOpenMenu },
    }
  }

  return (
    <main className='App'
      key={0}
    >
      { CenterContainer({...props.for.Button}).render() }   
      { AvaliationFrame({...props.for.AvaliationFrame}).render() }
      { LogoutButton().render() }
    </main>
  )
}
