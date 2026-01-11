'use client'

import UrlField from "@/components/UrlField";
import { useState } from "react";

export default function Home() {
  const [fields, setFields] = useState(0) // not including first one

  return (
    <>
      <h1 className="text-4xl m-10 mb-5">Youtube to Mp3 Converter</h1>
      <UrlField />
      {Array.from({ length: fields }).map((_, index) => (
        <li key={index}>
          <UrlField />
        </li>
      ))}
      <div className="inline">
        <button
            className="text-xl box-border border-2 p-2 ml-10 mt-2 rounded-lg hover:bg-gray-300"
            onClick={() => setFields(fields + 1)}>
          Add URL +
        </button>
        <button
            className="text-xl box-border border-2 p-2 ml-5 mt-2 rounded-lg hover:bg-gray-300"
            onClick={() => setFields(fields - 1)}>
          Remove URL -
        </button>
      </div>
      <div className="block">
        <button className="text-xl box-border border-2 p-2 ml-10 mt-4 rounded-lg hover:bg-gray-300">Download all</button>
      </div>
    </>
  );
}
