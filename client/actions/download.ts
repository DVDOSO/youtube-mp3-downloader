export const handleDownload = async (formData: FormData) => {
    const url = formData.get('name')

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try{
    const response = await fetch(`${apiUrl}/download`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
    })

    const filename = response.headers.get('X-Filename') || 'audio.mp3'

    const blob = await response.blob()
    const downloadURL = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = downloadURL
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.parentElement?.removeChild(link)
    
    window.URL.revokeObjectURL(downloadURL)

    await fetch(`${apiUrl}/cleanup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    }
    catch (error){
    console.log(error)
    }
}
