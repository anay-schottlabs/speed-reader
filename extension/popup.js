const getDataButton = document.querySelector("#getData");
const injectDataButton = document.querySelector("#injectData");

getDataButton.addEventListener("click", getPageData);
injectDataButton.addEventListener("click", injectDataToFastLit);

async function getPageData() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.documentElement.outerHTML
    });

    const html = results[0].result;

    console.log("Grabbed HTML from page:");
    console.log(html);

    await chrome.storage.local.set({
        grabbedHtml: html
    });

    console.log("Saved grabbed HTML to local storage.")
}

async function injectDataToFastLit() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const { grabbedHtml } = await chrome.storage.local.get("grabbedHtml");

    if (grabbedHtml) {
        console.log("Successfully loaded grabbed HTML, injecting data.");
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            func: (html) => {
                if (window.loadFromGrabber) {
                    window.loadFromGrabber(html);
                }
            },
            args: [grabbedHtml]
        });
    }
    else {
        console.log("Could not load grabbed HTML, cannot inject data.");
    }

}
