import React from 'react'
import { Button } from '@/components/ui/button'

const App = () => {
  return (
    <div className='bg-base-white'>
      <Button>Hello</Button>

      <h1 className='bg-blue-ultra'>Blue</h1>
      <h1 className='bg-blue-light'>Blue</h1>
      <h1 className='bg-blue-dark'>Blue</h1>
      <h1 className='bg-blue-black text-white'>Blue</h1>

      <h1 className='bg-green-ultra'>Green</h1>
      <h1 className='bg-green-light'>Green</h1>
      <h1 className='bg-green-dark'>Green</h1>
      <h1 className='bg-green-black text-white'>Green</h1>

      <h1 className='bg-grey-muted'>grey</h1>

      <h1>noramal text</h1>

      <h1 class="text-8xl">Large Text</h1>
      <h1 class="text-9xl">Larger Text</h1>
      <h1 class="text-10xl">Largest Text</h1>


      <p class="font-super-thin">50 weight</p>
      <p class="font-ultra-light">150 weight</p>
      <p class="font-book">350 weight</p>
      <p class="font-semi-medium">450 weight</p>
      <p class="font-demi-bold">550 weight</p>
      <p class="font-heavy">850 weight</p>
      <p class="font-extra-black">950 weight</p>
    </div>
  )
}

export default App