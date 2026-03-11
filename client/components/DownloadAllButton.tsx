import { useState } from "react";
import { handleListDownload } from "@/actions/downloads";
import DownloadIcon from "@mui/icons-material/Download";
import {
	Button,
	Snackbar,
	Alert,
	Fade,
	CircularProgress,
	Box,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, red } from "@mui/material/colors";

interface DownloadAllButtonProps {
	urls: string[];
	setIsSubmitting: (val: boolean) => void;
}

const iconStyle = {
	position: "absolute",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const DownloadAllButton = ({
	urls,
	setIsSubmitting,
}: DownloadAllButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const onDownloadAll = async () => {
		setIsLoading(true);
		setIsSubmitting(true);
		const toSend = urls.map((s) => (s || "").trim()).filter(Boolean);
		try {
			await handleListDownload(toSend);
			setIsSuccess(true);
		} catch (e) {
			if (e instanceof Error) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage("Error downloading, please try again.");
			}
			setIsError(true);
		}
		setIsLoading(false);
		setIsSubmitting(false);
	};

	return (
		<>
			<div className="mt-3">
				<Button
					variant="outlined"
					sx={
						isSuccess
							? { color: green[600], borderColor: green[600] }
							: isError
								? { color: red[500], borderColor: red[500] }
								: {}
					}
					endIcon={
						<Box
							sx={{
								width: 28,
								height: 28,
								position: "relative",
								display: "inline-block",
							}}>
							<Box sx={iconStyle}>
								<Fade in={isSuccess} timeout={200} mountOnEnter unmountOnExit>
									<CheckCircleIcon />
								</Fade>
							</Box>
							<Box sx={iconStyle}>
								<Fade in={isError} timeout={200} mountOnEnter unmountOnExit>
									<ErrorIcon />
								</Fade>
							</Box>
							<Box sx={iconStyle}>
								<Fade in={isLoading} timeout={200} mountOnEnter unmountOnExit>
									<CircularProgress size={18} />
								</Fade>
							</Box>
							<Box sx={iconStyle}>
								<Fade
									in={!isSuccess && !isError && !isLoading}
									timeout={200}
									mountOnEnter
									unmountOnExit>
									<DownloadIcon />
								</Fade>
							</Box>
						</Box>
					}
					size="large"
					onClick={onDownloadAll}
					disabled={isLoading}>
					Download all
				</Button>
			</div>
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
		</>
	);
};

export default DownloadAllButton;
