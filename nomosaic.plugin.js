/**
 * @name NoMosaic
 * @author Tanza & KingGamingYT
 * @description No more mosaic!
 * @version 0.1.9
 * @source https://github.com/KingGamingYT/discord-no-mosaic
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
        .oneByTwoLayoutThreeGrid__45717, .oneByTwoGrid__6987d, .threeByThreeGrid__75d7e, .twoByTwoGrid__0e231, .twoByOneGrid_fec677  {
            /* some layouts use grid instead of flex, so set this just in case */
            display: flex !important;
            /* there's a minimum height set, so we have to force it to be super high so it doesn't crop the images */
            max-height: 99999px;
            /* always go down */
            flex-direction: column !important;
            border-radius: 0px !important;
            }
            .oneByTwoLayoutThreeGrid__45717, .oneByTwoGrid__6987d, .threeByThreeGrid__75d7e, .twoByTwoGrid__0e231, .twoByOneGrid_fec677  {
                /* some layouts use grid instead of flex, so set this just in case */
                display: flex !important;
                /* there's a minimum height set, so we have to force it to be super high so it doesn't crop the images */
                max-height: 99999px;
                /* always go down */
                flex-direction: column !important; 
                border-radius: 0px !important;
            }
            .oneByTwoGrid__6987d .lazyImg_b510a9, .oneByTwoGrid__6987d .lazyImgContainer_b0a5df, .threeByThreeGrid__75d7e .lazyImg_b510a9, .threeByThreeGrid__75d7e .lazyImgContainer_b0a5df, .twoByTwoGrid__0e231 .lazyImg_b510a9, .twoByTwoGrid__0e231 .lazyImgContainer_b0a5df, .oneByOneGridMosaic__91851 .lazyImg_b510a9, .oneByOneGridMosaic__91851 .lazyImgContainer_b0a5df, .twoByOneGrid_fec677 {
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
            .clickableWrapper__2d2ea img {
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
            .video__83189[style*="max-width"], .wrapper_f09ac7:not(.wrapperAudio__178e9) {
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
            .mediaAttachmentsContainer__242e2 {
                /* stop centering the items */
                width: auto;
                border-radius: 0px !important;
            }
            
            .mediaAttachmentsContainer__242e2 {
                /* make images slightly smaller, i think this is okay */
                max-width: 400px;
                border-radius: 0px !important;
            }
            .messageAttachmentMediaMosaic__67262 {
                border-radius: 0px !important;
                height: auto !important;
            }nt; 
            border-radius: 0px !important;
        }
        .oneByTwoGrid__6987d .lazyImg_b510a9, .oneByTwoGrid__6987d .lazyImgContainer_b0a5df, .threeByThreeGrid__75d7e .lazyImg_b510a9, .threeByThreeGrid__75d7e .lazyImgContainer_b0a5df, .twoByTwoGrid__0e231 .lazyImg_b510a9, .twoByTwoGrid__0e231 .lazyImgContainer_b0a5df, .oneByOneGridMosaic__91851 .lazyImg_b510a9, .oneByOneGridMosaic__91851 .lazyImgContainer_b0a5df, .twoByOneGrid_fec677 {
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
        .clickableWrapper__2d2ea img {
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
        .video__83189[style*="max-width"], .wrapper_f09ac7:not(.wrapperAudio__178e9) {
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
        .mediaAttachmentsContainer__242e2 {
            /* stop centering the items */
            width: auto;
            border-radius: 0px !important;
        }
        
        .mediaAttachmentsContainer__242e2 {
            /* make images slightly smaller, i think this is okay */
            max-width: 400px;
            border-radius: 0px !important;
        }
        .messageAttachmentMediaMosaic__67262 {
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
            var ellist = document.querySelectorAll(".lazyImg_b510a9, .video__83189");
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
                    var ellist2 = document.querySelectorAll(".loadingOverlay__35a04");
                    for (var element of ellist2) {
                        if (!element.hasAttribute("unratioed")) {
                            element.setAttribute("style", "");
                            element.setAttribute("unratioed", true);
                        }
                    }
                    // This code is meant to be used with the UncompressedImages plugin, however, that plugin needs patches by its dev in order for this to work correctly. Until that happens, this'll stay commented
                    /* var ellist3 = document.querySelectorAll(".lazyImg_b510a9");
                            for (var element of ellist3) {
                                let srcWidthHeightRegex = /&width=\d+&height=\d+$/;
                
                                if (element.src && element.src.match(srcWidthHeightRegex)) {
                                    let newSrc = element.src.replace(srcWidthHeightRegex, "");
                                    element.src = newSrc;
                                }
                    } */
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
