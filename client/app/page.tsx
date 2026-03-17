"use client";

import UrlField from "@/components/UrlField";
import { useState } from "react";
import { Button, Container, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DownloadAllButton from "@/components/DownloadAllButton";
import LoadingBar from "@/components/LoadingBar";

export default function Home() {
	const [urls, setUrls] = useState<{ id: number; value: string }[]>(() => [
		{ id: Date.now(), value: "" },
	]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const setUrlAt = (index: number, val: string) => {
		setUrls((prev) => {
			const copy = [...prev];
			while (copy.length <= index) copy.push({ id: Date.now(), value: "" });
			copy[index] = { ...copy[index], value: val };
			return copy;
		});
	};

	// removed bulk remove button usage; keep function available if needed in future
	const removeField = () => {
		if (urls.length == 1) return;
		setUrls((prev) => prev.slice(0, prev.length - 1));
	};

	const removeAt = (index: number) => {
		if (urls.length == 1) return;
		setUrls((prev) => prev.filter((_, i) => i !== index));
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
				{urls.map((u, index) => (
					<div
						key={u.id}
						className="flex items-center justify-center w-full gap-1">
						<UrlField
							value={u.value}
							onValueChange={(v) => setUrlAt(index, v)}
						/>
						<IconButton
							onClick={() => removeAt(index)}
							aria-label="delete"
							sx={{ color: grey[700] }}>
							<DeleteIcon />
						</IconButton>
					</div>
				))}
				<div className="flex flex-row gap-10 mt-1">
					<Button
						onClick={() =>
							setUrls((prev) =>
								prev.length >= 10
									? prev
									: [
											...prev,
											{
												id: Date.now() + Math.floor(Math.random() * 1000),
												value: "",
											},
										],
							)
						}
						size="large"
						endIcon={<AddCircleOutlineIcon />}
						disabled={urls.length >= 10}>
						Add URL
					</Button>
					<Button
						onClick={removeField}
						size="large"
						endIcon={<RemoveCircleOutlineIcon />}>
						Remove URL
					</Button>
				</div>
				<DownloadAllButton
					urls={urls.map((u) => u.value)}
					setIsSubmitting={setIsSubmitting}
				/>
				{isSubmitting && <LoadingBar total={urls.length} />}
			</Container>
		</section>
	);
}
