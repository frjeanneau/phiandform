const revealItems = document.querySelectorAll(".reveal");

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

document.querySelectorAll("video").forEach((video) => {
  const frame = video.closest(".video-frame, .stage-media, .gallery-panel");
  const fallback = frame?.querySelector(".video-fallback");

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
});
