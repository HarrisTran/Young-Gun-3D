export class NativeAPI {
	public static callByNative(isError = false) {
		console.log('--------------callByNative-------------', isError)
	}
}

window.NativeAPI = NativeAPI;
