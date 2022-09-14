export const getRandomColor = () => {
	const rangeSize = 100; // adapt as needed
	const parts = [
		Math.floor(Math.random() * 256),
		Math.floor(Math.random() * rangeSize),
		Math.floor(Math.random() * rangeSize) + 256 - rangeSize
	].sort((a, b) => Math.random() < 0.5);

	return '#' + parts.map(p => ('0' + p.toString(16)).substr(-2)).join('');
};
