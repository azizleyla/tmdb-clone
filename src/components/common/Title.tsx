import React from 'react'
import { ITitle } from '../../types/types'

const Title = ({text}:ITitle) => {
  return (
    <h1 className='text-white text-2xl mb-5 font-normal'>{text}</h1>
  )
}

export default Title