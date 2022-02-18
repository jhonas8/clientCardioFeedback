import React, { useEffect, useRef } from 'react'

/**
 * 
 * @param handler Defines what happens when a click outside the component is detected.
 * @returns a React.RefObject that can be used as a Ref props.
 */

export default function useClickOutside(handler: any): React.RefObject<HTMLDivElement> {

    let domNode = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        const maybeHandler = (event: MouseEvent) =>{
            if(domNode.current && !domNode.current.contains(event.target as Element)) {
                handler()
            }   
        }

        document.addEventListener('mousedown', maybeHandler)
            
        return ()=>{
            document.removeEventListener('mousedown', maybeHandler)
        }
    })
    
    return domNode
}