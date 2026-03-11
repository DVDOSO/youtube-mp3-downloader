"use client";

import { useState } from "react";
import { handleDownload } from "@/actions/downloads";
import {
	Box,
	Fade,
	TextField,
	CircularProgress,
	Alert,
	IconButton,
	Snackbar,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";

type UrlFieldProps = {
	value?: string;
	onValueChange?: (v: string) => void;
};

const UrlField = ({ onValueChange }: UrlFieldProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const submit = async (formData: FormData) => {
		setIsLoading(true);
		setIsError(false);
		setIsSuccess(false);
		try {
			await handleDownload(formData);
			setIsSuccess(true);
		} catch (e) {
			if (e instanceof Error) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage("Error downloading, please try again.");
			}
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fd = new FormData();
		fd.append("name", value);
		await submit(fd);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			className="flex items-center ml-2 mt-1 mb-1">
			<TextField
				name="name"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					setIsError(false);
					setIsSuccess(false);
					onValueChange?.(e.target.value);
				}}
				variant="outlined"
				size="small"
				label="Enter YouTube URL"
				sx={{ mr: 1, maxWidth: 550, width: "40vw" }}
			/>
			<IconButton
				type="submit"
				color="primary"
				disabled={isLoading || !value}
				sx={{ mr: 2, width: 40, height: 40, position: "relative" }}>
				<Fade in={isLoading} timeout={250} unmountOnExit>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<CircularProgress color="inherit" size={20} />
					</Box>
				</Fade>

				<Fade in={isError && !isLoading} timeout={250} unmountOnExit>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<ErrorIcon className="text-red-500" fontSize="medium" />
					</Box>
				</Fade>

				<Fade
					in={isSuccess && !isLoading && !isError}
					timeout={250}
					unmountOnExit>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<CheckCircleIcon className="text-green-600" fontSize="medium" />
					</Box>
				</Fade>

				<Fade
					in={!isLoading && !isError && !isSuccess}
					timeout={250}
					unmountOnExit>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<DownloadIcon fontSize="medium" />
					</Box>
				</Fade>
			</IconButton>

			<Snackbar
				open={isError}
				autoHideDuration={5000}
				onClose={(_, reason) => {
					if (reason == "clickaway") {
						return;
					}
					setIsError(false);
					setErrorMessage("");
				}}>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>

			<Snackbar
				open={isSuccess}
				autoHideDuration={5000}
				onClose={(_, reason) => {
					if (reason == "clickaway") {
						return;
					}
					setIsSuccess(false);
				}}>
				<Alert severity="success">Success!</Alert>
			</Snackbar>
		</Box>
	);
};

export default UrlField;
