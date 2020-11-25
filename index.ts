import { app, BrowserWindow, screen } from "electron";

let window: BrowserWindow;

if (!app.requestSingleInstanceLock()) {
	app.quit();
} else {
	app.on("second-instance", () => {
		// Someone tried to run a second instance, we should focus our window instead.
		if (window) {
			if (window.isMinimized()) window.restore();
			window.focus();
		}
	});

	// Set up app updating.
	new (require("./src/AppUpdater.ts"))(10 * 60 * 1e3);
	// Start reloading.
	require("electron-reload")(__dirname);

	// Create window, load the rest of the app, etc...
	function createWindow() {
		const { width, height } = screen.getPrimaryDisplay().workAreaSize;

		window = new BrowserWindow({
			width: width / 1.25,
			height: height / 1.25,
			center: true,
			show: false,
		});

		window.webContents.openDevTools();

		window.once("ready-to-show", window.show);

		window.loadFile("public/index.html");
	}

	app.on("ready", () => {
		createWindow();
	});

	app.on("window-all-closed", () => app.quit());
}
