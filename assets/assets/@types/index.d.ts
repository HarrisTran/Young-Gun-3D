export {
	window
}

declare const window: Window &
	typeof globalThis & {
		NativeAPI: any,
		Mapmenu: any,
		winPopup: any,
		RewardManager: any
	}