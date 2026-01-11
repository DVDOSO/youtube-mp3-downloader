import { handleDownload } from "@/actions/download"

const UrlField = () => {
    return (
        <form action={handleDownload}>
            <input
            className="box-border w-150 h-8 p-1 ml-10 border-2"
            type="text"
            name={"name"}
            />
            <button
            className="inline box-border p-1 m-2 border-2 rounded-lg bg-sky-300 hover:bg-sky-400"
            type="submit">
                Download
            </button>
        </form>
    )
}

export default UrlField