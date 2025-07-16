import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'



function Header() {
  return (
    <div className='flex justify-between items-center p-5  shadow-sm mb-1'>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={150}
        height={100}
      />
      <Link href="/dashboard">
        <Button variant="custom" className="bg-[#875bf9] text-white">
          Get Started
        </Button>
      </Link>

      
    </div>
  )
}

export default Header