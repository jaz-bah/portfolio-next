import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader() {
    return (
        <div className="w-full h-20 flex items-center justify-center">
            <Loader2 className='w-10 h-10 animate-spin' />
        </div>
    )
}
