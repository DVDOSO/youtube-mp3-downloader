export const validateYouTubeUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	const regExp =
		/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	const match = url.match(regExp);

	if (match && match[1].length === 11) {
		return true;
	} else {
		return false;
	}
};
