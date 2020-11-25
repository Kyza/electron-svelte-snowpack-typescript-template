import { autoUpdater } from "electron-updater";

autoUpdater.on("update-downloaded", () => {
	autoUpdater.quitAndInstall(true, true);
});

class AppUpdater {
	updateInterval: NodeJS.Timeout;
	
	constructor(intervalTime:number) {
		autoUpdater.checkForUpdatesAndNotify();
		this.updateInterval = setInterval(() => {
			autoUpdater.checkForUpdatesAndNotify();
		}, intervalTime);
	}
}

module.exports = AppUpdater;
