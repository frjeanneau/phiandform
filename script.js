const revealItems = document.querySelectorAll(".reveal");

document.querySelectorAll('a[href="#page-top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

document.querySelectorAll(".media-slot img").forEach((image) => {
  const fallback = image.parentElement?.querySelector(".media-placeholder");

  const hideFallback = () => {
    if (fallback) {
      fallback.hidden = true;
    }
  };

  if (image.complete && image.naturalWidth > 0) {
    hideFallback();
  }

  image.addEventListener("load", hideFallback, { once: true });
  image.addEventListener("error", () => {
    if (fallback) {
      fallback.hidden = false;
    }
  });
});

document.querySelectorAll(".brand-logo img").forEach((image) => {
  const brand = image.closest(".brand");

  const showLogo = () => {
    image.classList.add("is-ready");
    brand?.classList.add("has-logo");
  };

  if (image.complete && image.naturalWidth > 0) {
    showLogo();
  }

  image.addEventListener("load", showLogo, { once: true });
  image.addEventListener("error", () => {
    image.closest(".brand-logo")?.remove();
  });
});

document.querySelectorAll(".app-store-badge img").forEach((image) => {
  const badge = image.closest(".app-store-badge");

  const showBadge = () => {
    badge?.classList.add("has-badge");
  };

  if (image.complete && image.naturalWidth > 0) {
    showBadge();
  }

  image.addEventListener("load", showBadge, { once: true });
  image.addEventListener("error", () => {
    badge?.classList.remove("has-badge");
  });
});

document.querySelectorAll("video").forEach((video) => {
  const frame = video.closest(".video-frame, .stage-media, .gallery-panel");
  const fallback = frame?.querySelector(".video-fallback");

  const enableManualPlayback = () => {
    video.controls = true;
  };

  const hideFallback = () => {
    if (fallback) {
      fallback.hidden = true;
    }
  };

  if (video.readyState >= 1 || video.currentSrc) {
    hideFallback();
  }

  video.addEventListener("loadedmetadata", hideFallback, { once: true });
  video.addEventListener("loadeddata", hideFallback, { once: true });
  video.addEventListener("canplay", hideFallback, { once: true });
  video.addEventListener("playing", hideFallback, { once: true });
  video.addEventListener("error", () => {
    if (fallback) {
      fallback.hidden = false;
    }
  });

  if (video.autoplay) {
    const attemptPlayback = () => {
      const playback = video.play();

      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          enableManualPlayback();
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlayback();
    } else {
      video.addEventListener("loadeddata", attemptPlayback, { once: true });
    }
  }
});
