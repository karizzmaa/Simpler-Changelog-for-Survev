// ==UserScript==
// @name         Survev.io Changelog Modifier
// @namespace    https://github.com/karizzmaa/Simpler-Changelog-for-Survev
// @version      1.0
// @description  Removes the confusing changelog buttons in survev and replaces it with one simple button.
// @author       karizma
// @match        https://survev.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let versionElement = document.querySelector('a[href="changelogRec.html"].footer-after');
    if (versionElement) {
        let rect = versionElement.getBoundingClientRect();
        versionElement.remove();

        let privacyPolicy = document.querySelector('a[href="privacy.html"][id="TOS"]');
        if (privacyPolicy) {
            privacyPolicy.style.position = "absolute";
            privacyPolicy.style.left = `${rect.left}px`;
            privacyPolicy.style.top = `${rect.top}px`;
        }
    }

    let changelogLink = document.querySelector('a[href="changelog.html"][data-l10n="index-proxy-sites"]');
    if (changelogLink) {
        changelogLink.textContent = "Changelog";
        changelogLink.removeAttribute("href");
        changelogLink.style.cursor = "pointer";
        changelogLink.style.position = "relative";

        let dropdown = document.createElement("div");
        dropdown.style.position = "absolute";
        dropdown.style.background = "#fff";
        dropdown.style.border = "1px solid #ccc";
        dropdown.style.padding = "5px";
        dropdown.style.display = "none";
        dropdown.style.zIndex = "1000";
        dropdown.style.bottom = "100%";
        dropdown.style.left = "0";

        let oldChangelog = document.createElement("button");
        oldChangelog.textContent = "Old Changelog";
        oldChangelog.onclick = () => window.open("https://survev.io/changelog", "_blank");
        dropdown.appendChild(oldChangelog);

        let newChangelog = document.createElement("button");
        newChangelog.textContent = "New Changelog";
        newChangelog.onclick = () => window.open("https://survev.io/changelogRec", "_blank");
        dropdown.appendChild(newChangelog);

        changelogLink.appendChild(dropdown);

        changelogLink.addEventListener("click", () => {
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });

        document.addEventListener("click", (event) => {
            if (!changelogLink.contains(event.target)) {
                dropdown.style.display = "none";
            }
        });
    }
})();
