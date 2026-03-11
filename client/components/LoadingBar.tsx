import { countProgress } from "@/actions/downloads";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface LoadingBarProps {
	total: number;
}

const LoadingBar = ({ total }: LoadingBarProps) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const count = await countProgress();
				setProgress(count ?? 0);
			} catch (error) {
				console.error("Error fetching progress:", error);
			}
		};
		const interval = setInterval(fetchCount, 2000);
		return () => clearInterval(interval);
	}, [total]);

	return (
		<Box sx={{ width: "100%", mt: 5, px: 5 }}>
			<LinearProgress variant="determinate" value={(progress / total) * 100} />
			<Typography variant="body2" color="textSecondary" align="center" mt={1}>
				Downloading... ({progress} / {total})
			</Typography>
		</Box>
	);
};

export default LoadingBar;
