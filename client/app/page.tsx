"use client";

import UrlField from "@/components/UrlField";
import { useState } from "react";
import { handleListDownload } from "@/actions/downloads";

export default function Home() {
  const [urls, setUrls] = useState<string[]>([''])

  const setUrlAt = (index: number, val: string) => {
    setUrls(prev => {
      const copy = [...prev]
      while (copy.length <= index) copy.push('')
      copy[index] = val
      return copy
    })
  }

  const removeField = () => {
    if(urls.length == 1) return
    setUrls(prev => {
      const copy = [...prev]
      copy.pop()
      return copy
    })
  }

  const onDownloadAll = async () => {
    const toSend = urls.map(s => (s || '').trim()).filter(Boolean)
    await handleListDownload(toSend)
  }

  console.log(urls)
  
  return (
    <>
      <h1 className="text-4xl m-10 mb-5">Youtube to Mp3 Converter</h1>
      {urls.map((_, index) =>
        <li key={index}>
          <UrlField onValueChange={(v) => setUrlAt(index, v)}/>
        </li>
      )}
      <div className="inline">
        <button
          className="text-xl box-border border-2 p-2 ml-10 mt-2 rounded-lg hover:bg-gray-300"
          onClick={() => setUrls(prev => [...prev, ''])}>
          Add URL +
        </button>
        <button
          className="text-xl box-border border-2 p-2 ml-5 mt-2 rounded-lg hover:bg-gray-300"
          onClick={removeField}>
          Remove URL -
        </button>
      </div>
      <div className="block">
        <button
          className="text-xl box-border border-2 p-2 ml-10 mt-4 rounded-lg hover:bg-gray-300"
          onClick={onDownloadAll}>
          Download all
        </button>
      </div>
    </>
  );
}
