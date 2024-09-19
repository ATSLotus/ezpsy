function getOperatingSystem() {
    let userAgent = window.navigator.userAgent;
    // let platform = window.navigator.platform;
    let os = null;
    
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        os = 'iOS';
    } else if(/Android/i.test(userAgent)) {
        os = "Android"
    } else {
        os = 'Unknown';
    }

    return os;
}

function getBrowserInfo() {
    let userAgent = navigator.userAgent;
    let browserName = "Unknown";

    if (userAgent.indexOf("FxiOS") > -1) {
        browserName = "Firefox";
    } else if ((userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("EdgA") == -1) || userAgent.indexOf("CriOS") > -1) {
        browserName = "Chrome";
    } else if ((userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("EdgA") > -1) || userAgent.indexOf("EdgiOS") > -1) {
        browserName = "Edge";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    } 

    return browserName
}
