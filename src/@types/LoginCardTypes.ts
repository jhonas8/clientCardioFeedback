import { FormEvent } from "react"

declare namespace LoginCardProps {
    export interface Props {
        setName: any
        setPassword: any
        name: string
        password: string
        handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    }
}

export default LoginCardProps