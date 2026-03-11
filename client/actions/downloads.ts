const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const countProgress = async () => {
	try {
		const response = await fetch(`${apiUrl}/`, {
			method: "GET",
		});

		let data: string[] = await response.json();
		data = data.filter((item) => item.endsWith(".mp3"));

		return data.length;
	} catch (error) {
		console.log(error);
	}
};

const cleanup = async () => {
	await sleep(2000); // Hardcoded delay to ensure file is ready for download before cleanup
	await fetch(`${apiUrl}/cleanup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	}).catch(() => {});
};

const downloadFile = async (response: Response, filename: string) => {
	const blob = await response.blob();
	const downloadURL = window.URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = downloadURL;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.parentElement?.removeChild(link);

	window.URL.revokeObjectURL(downloadURL);
};

export const handleDownload = async (formData: FormData) => {
	const url = formData.get("name");

	try {
		const response = await fetch(`${apiUrl}/download`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: url }),
		});

		if (!response.ok) {
			const text = await response.text().catch(() => null);
			throw new Error(text || `HTTP ${response.status}`);
		}

		const filename = response.headers.get("X-Filename") || "audio.mp3";
		downloadFile(response, filename);
		cleanup();
	} catch (error) {
		cleanup();
		throw error;
	}
};

export const handleListDownload = async (urls: string[]) => {
	try {
		const response = await fetch(`${apiUrl}/list-download`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ urls: urls }),
		});

		if (!response.ok) {
			const text = await response.text().catch(() => null);
			throw new Error(text || `HTTP ${response.status}`);
		}

		const filename = "downloaded_playlist.zip";
		downloadFile(response, filename);
		cleanup();
	} catch (error) {
		cleanup();
		throw error;
	}
};
