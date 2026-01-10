'use client'

export default function Home() {
  const handleDownload = async (formData: FormData) => {
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

  return (
    <>
      <h1 className="text-4xl m-10 mb-0">Youtube to Mp3 Converter</h1>
      <form action={handleDownload}>
        <input
          className="box-border w-150 h-8 p-1 m-10 mr-2 border-2"
          type="text"
          name="name"
        />
        <button
          className="inline box-border p-1 m-2 border-2 rounded-lg bg-sky-300 hover:bg-sky-400"
          type="submit">
            Download
        </button>
      </form>
    </>
  );
}
