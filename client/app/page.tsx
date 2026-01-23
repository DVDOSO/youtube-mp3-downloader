"use client";

import UrlField from "@/components/UrlField";
import { useState } from "react";
import { handleListDownload } from "@/actions/downloads";
import { Button, Container, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function Home() {
	const [urls, setUrls] = useState<string[]>([""]);

	const setUrlAt = (index: number, val: string) => {
		setUrls((prev) => {
			const copy = [...prev];
			while (copy.length <= index) copy.push("");
			copy[index] = val;
			return copy;
		});
	};

	const removeField = () => {
		if (urls.length == 1) return;
		setUrls((prev) => {
			const copy = [...prev];
			copy.pop();
			return copy;
		});
	};

	const onDownloadAll = async () => {
		const toSend = urls.map((s) => (s || "").trim()).filter(Boolean);
		await handleListDownload(toSend);
	};

	return (
		<section className="flex flex-col items-center bg-slate-100 w-screen h-screen">
			<Container
				maxWidth="md"
				className="flex flex-col items-center bg-white h-screen p-10 m-10 rounded-xl shadow-lg">
				<div className="flex items-center gap-2 mb-5">
					<Typography
						variant="h3"
						component="span"
						sx={{ fontWeight: "600", fontSize: "3rem", textAlign: "center" }}>
						YouTube to MP3 Converter
					</Typography>
					<YouTubeIcon
						className="text-red-500 mt-1 ml-3"
						sx={{ fontSize: 55 }}
					/>
				</div>
				{urls.map((_, index) => (
					<UrlField key={index} onValueChange={(v) => setUrlAt(index, v)} />
				))}
				<div className="flex flex-row gap-10 mt-1">
					<Button
						onClick={() => setUrls((prev) => [...prev, ""])}
						size="large"
						endIcon={<AddCircleOutlineIcon />}>
						Add URL
					</Button>
					<Button
						onClick={removeField}
						size="large"
						endIcon={<RemoveCircleOutlineIcon />}>
						Remove URL
					</Button>
				</div>
				<div className="mt-3">
					<Button
						variant="outlined"
						endIcon={<DownloadIcon />}
						size="large"
						onClick={onDownloadAll}>
						Download all
					</Button>
				</div>
			</Container>
		</section>
	);
}
