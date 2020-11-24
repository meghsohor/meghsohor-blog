import React, {useState, useEffect} from 'react'


export default function ChildLoader({children}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        console.log(document.readyState)
        if (document.readyState === "complete")
            setMounted(true)
    }, [])
    return mounted ? children : null
}