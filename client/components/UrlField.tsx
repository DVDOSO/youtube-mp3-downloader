'use client'

import { handleDownload } from "@/actions/downloads"
import { useState } from "react"

type UrlFieldProps = {
    value?: string
    onValueChange?: (v: string) => void
}

const UrlField = ({ onValueChange }: UrlFieldProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const submit = async (formData: FormData) => {
        setIsLoading(true)
        setIsError(false)
        setIsSuccess(false)
        try {
            await handleDownload(formData)
            setIsSuccess(true)
        }
        catch (e) {
            console.error(e)
            setIsError(true)
        }
        finally {
            setIsLoading(false)
        }
    }

    const buttonText = isLoading? "Loading..." : isError? "Error, please try again" : isSuccess? "Success" : "Download"

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget as HTMLFormElement)
            await submit(fd)
        }}>
            <input
            className="box-border w-150 h-8 p-1 ml-10 border-2"
            type="text"
            name={"name"}
            onChange={(e) => {
                setIsError(false)
                setIsSuccess(false)
                onValueChange?.((e.target as HTMLInputElement).value)
            }}
            />
            <button
            className="inline box-border p-1 m-2 border-2 rounded-lg bg-sky-300 hover:bg-sky-400"
            type="submit">
                {buttonText}
            </button>
        </form>
    )
}

export default UrlField