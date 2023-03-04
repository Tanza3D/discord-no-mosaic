/**
 * @name NoMosaic
 * @author Tanza
 * @description No more mosaic!
 * @version 0.0.1
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
        .oneByTwoLayoutThreeGrid-3f_bkk, .oneByTwoGrid-25mx0i, .threeByThreeGrid-2CT4mS, .twoByTwoGrid-35pISX  {
            /* some layouts use grid instead of flex, so set this just in case */
            display: flex;
            /* there's a minimum height set, so we have to force it to be super high so it doesn't crop the images */
            max-height: 99999px;
            /* always go down */
            flex-direction: column;
        }
        .oneByTwoGrid-25mx0i .lazyImg-ewiNCh, .oneByTwoGrid-25mx0i .lazyImgContainer-3k3gRy, .threeByThreeGrid-2CT4mS .lazyImg-ewiNCh, .threeByThreeGrid-2CT4mS .lazyImgContainer-3k3gRy, .twoByTwoGrid-35pISX .lazyImg-ewiNCh, .twoByTwoGrid-35pISX .lazyImgContainer-3k3gRy, .oneByOneGridMosaic-2fYTx0 .lazyImg-ewiNCh, .oneByOneGridMosaic-2fYTx0 .lazyImgContainer-3k3gRy {
            /* stop forcing into an aspect ratio (this does the cropping) */
            aspect-ratio: auto;
            /* don't force to a width, fixes tall images... */
            width: auto !important;
            /* don't auto-center, keeps to left */
            margin: 0px !important;
            /* margin on top to simulate old discord */
            margin-top: 3px !important;
        }
        .clickableWrapper-2WTAkL img {
            /* makes sure images don't take up the entire screen */
            max-height: 400px !important;
            /* add some padding to emulate the old spacing */
            margin-bottom: 4px;
            /* NEVER crop */
            object-fit: contain !important;
        }
        .mediaAttachmentsContainer-1WGRWy {
            /* stop centering the items */
            width: auto;
        }
        
        .mediaAttachmentsContainer-1WGRWy {
            /* make images slightly smaller, i think this is okay */
            max-width: 500px;
        }
        `;
        document.body.appendChild(this.css);

        // Select the node that will be observed for mutations
        const targetNode = document.getElementsByClassName("chat-2ZfjoI")[0];

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            var ellist = document.querySelectorAll(".lazyImg-ewiNCh, .video-2HW4jD");
            for (var element of ellist) {
                if (!element.hasAttribute("uncropped")) {
                    if (element.src != undefined) {
                        //if (element.src.contains("width=")) {
                            // ? only need to change if it it's forced width, else we just do a reload for no reason
                            element.src = element.src.split("?")[0];
                        //}
                    }
                    if (element.hasAttribute("poster")) {
                        element.setAttribute("poster", element.getAttribute("poster").split("?")[0] + "?format=jpeg")
                    }
                    element.setAttribute("uncropped", true);
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
