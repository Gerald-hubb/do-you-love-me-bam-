
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const message = document.getElementById("message");
    const finalScreen = document.getElementById("finalScreen");
    const finalTitle = document.getElementById("finalTitle");
    const page = document.querySelector(".page");

    if (!yesBtn || !noBtn || !message || !finalScreen || !page) {
        console.error("A required HTML element is missing.");
        return;
    }

    const noMessages = [
        "Are you sure? 🥺",
        "Really? 💗",
        "Think again...",
        "Please? 🥹",
        "You might regret this!",
        "Last chance! 💕",
        "There's only one choice now! 💗"
    ];

    const MAX_NO_CLICKS = 7;
    let noClicks = 0;
    let finished = false;

    function moveNoButton() {
        const margin = 16;
        const rect = noBtn.getBoundingClientRect();

        // Keep the NO button inside the visible screen.
        const maxX = Math.max(
            margin + rect.width / 2,
            window.innerWidth - margin - rect.width / 2
        );

        const minX = Math.min(
            margin + rect.width / 2,
            maxX
        );

        const maxY = Math.max(
            margin + rect.height / 2,
            window.innerHeight - margin - rect.height / 2
        );

        const minY = Math.min(
            margin + rect.height / 2,
            maxY
        );

        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);

        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    function handleNoClick() {
        if (finished || noClicks >= MAX_NO_CLICKS) {
            return;
        }

        noClicks++;

        message.textContent =
            noMessages[Math.min(noClicks - 1, noMessages.length - 1)];

        // Move the NO button around the screen.
        if (!noBtn.classList.contains("moving")) {
            noBtn.classList.add("moving");
        }

        moveNoButton();

        if (noClicks >= MAX_NO_CLICKS) {
            // Stop further NO clicks and fill the screen with YES.
            noBtn.disabled = true;
            noBtn.style.opacity = "0";
            noBtn.style.pointerEvents = "none";

            yesBtn.classList.add("growing");
            yesBtn.style.transform = "";
            return;
        }

        // Gradually increase the YES button size.
        const scale = Math.min(1 + noClicks * 0.42, 3.5);
        yesBtn.style.transform = `scale(${scale})`;
    }

    function showFinalScreen() {
        if (finished) {
            return;
        }

        finished = true;

        // Prevent further interactions on the question screen.
        yesBtn.disabled = true;
        noBtn.disabled = true;
        page.inert = true;

        finalScreen.inert = false;
        finalScreen.setAttribute("aria-hidden", "false");
        finalScreen.classList.add("show");

        if (finalTitle) {
            finalTitle.setAttribute("tabindex", "-1");
            finalTitle.focus({ preventScroll: true });
        }
    }

    noBtn.addEventListener("click", handleNoClick);
    yesBtn.addEventListener("click", showFinalScreen);
});
