const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const checkProgress = async (currentData: string[]) => {
	const response = await fetch(`${apiUrl}/`, {
		method: "GET",
	});

	const data = await response.json();
};

const cleanup = async () => {
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
