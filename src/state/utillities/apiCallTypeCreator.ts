export const apiCallTypeCreator = (prefix: string) => ({
	REGULAR: prefix,
	SUCCESS: `${prefix}_SUCCESS`
});
