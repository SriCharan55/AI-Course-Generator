import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className = 'flex items-center justify-between p-5 shadow-sm'>
        <Image src = {'/favicon.svg'} alt = 'logo' width = {40} height = {40} />
        <UserButton />
    </div>
  )
}

export default Header