/**
 * @name NoMosaic
 * @author Tanza & KingGamingYT
 * @description No more mosaic!
 * @version 0.1.7
 */

module.exports = class MyPlugin {
    observer = null;
    css = null;
    constructor(meta) {

    }
    start() {
        var xhr = new XMLHttpRequest();
        this.css = document.createElement("style");
        this.css.innerHTML = `
        .oneByTwoLayoutThreeGrid__5ec2c, .oneByTwoGrid__44b90, .threeByThreeGrid_d2750c, .twoByTwoGrid__47ed7, .twoByOneGrid_b5fca2  {
            /* some layouts use grid instead of flex, so set this just in case */
            display: flex !important;
            /* there's a minimum height set, so we have to force it to be super high so it doesn't crop the images */
            max-height: 99999px;
            /* always go down */
            flex-direction: column !important; 
            border-radius: 0px !important;
        }
        .oneByTwoGrid__44b90 .lazyImg_dafbb7, .oneByTwoGrid__44b90 .lazyImgContainer__68fa8, .threeByThreeGrid_d2750c .lazyImg_dafbb7, .threeByThreeGrid_d2750c .lazyImgContainer__68fa8, .twoByTwoGrid__47ed7 .lazyImg_dafbb7, .twoByTwoGrid__47ed7 .lazyImgContainer__68fa8, .oneByOneGridMosaic_afe3ca .lazyImg_dafbb7, .oneByOneGridMosaic_afe3ca .lazyImgContainer__68fa8, .twoByOneGrid_b5fca2 {
            /* stop forcing into an aspect ratio (this does the cropping) */
            aspect-ratio: auto;
            /* don't force to a width OR to a height, fixes tall images... */
            width: auto !important;
            height: min-content !important;
            /* don't auto-center, keeps to left */
            margin: 0px !important;
            /* margin on top to simulate old discord */
            margin-top: 3px !important;
            border-radius: 4px !important;
        }
        .clickableWrapper__64072 img, loadingOverlay__4d818 img  {
            /* makes sure images don't take up the entire screen */
            max-height: 350px !important;
            /* add some padding to emulate the old spacing */
            margin-bottom: 4px;
            /* NEVER crop */
            object-fit: contain !important;
            min-width: unset !important;
            min-height: unset !important;
            border-radius: 5px !important;
            
        }
        .video__4c052[style*="max-width"], .wrapper__3a7a0 {
            /* apply everything to videos but separate their elements for potential future changes */
            max-height: 350px !important;
            max-width: fit-content !important;
            overflow: hidden !important;
            /* add some padding to emulate the old spacing */
            margin-bottom: 4px;
            /* NEVER crop */
            object-fit: contain !important;
            min-width: unset !important;
            min-height: unset !important;
            border-radius: 5px !important;
        }
        .mediaAttachmentsContainer_edba75 {
            /* stop centering the items */
            width: auto;
            border-radius: 0px !important;
        }
        
        .mediaAttachmentsContainer_edba75 {
            /* make images slightly smaller, i think this is okay */
            max-width: 400px;
            border-radius: 0px !important;
        }
        .messageAttachmentMediaMosaic__65bfc {
            border-radius: 0px !important;
            height: auto !important;
        }
        `;
        document.body.appendChild(this.css);

        // Select the node that will be observed for mutations
        const targetNode = document.body;

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            var ellist = document.querySelectorAll(".lazyImg_dafbb7, .video__4c052");
            for (var element of ellist) {
                if (!element.hasAttribute("uncropped")) {
                    if (element.src != undefined) {
                        if (element.src.includes("width=") && element.src.includes("/attachments/")) {
                            // ? only need to change if it it's forced width, else we just do a reload for no reason
                            element.src = element.src.split("&width")[0];
                        }
                    }
                    if (element.hasAttribute("poster")) {
                        element.setAttribute("poster", element.getAttribute("poster").split("&format")[0] + "&format=jpeg")
                    }
                    if (element.hasAttribute("playsinline")) {
                        element.setAttribute("playsinline", element.getAttribute("playsinline") + "true")
                    }
                    element.setAttribute("uncropped", true);
                    var ellist2 = document.querySelectorAll(".loadingOverlay__4d818");
                    for (var element of ellist2) {
                        if (!element.hasAttribute("unratioed")) {
                            element.setAttribute("style", "");
                            element.setAttribute("unratioed", true);
                        }
                    }
                }
            }
        };

        // Create an observer instance linked to the callback function
        this.observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        this.observer.observe(targetNode, config);
    }

    stop() {
        this.css.remove();
        this.observer.disconnect();
    }
};
