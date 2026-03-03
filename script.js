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

document.querySelectorAll(".brand-mark img").forEach((image) => {
  const showLogo = () => {
    image.classList.add("is-ready");
  };

  if (image.complete && image.naturalWidth > 0) {
    showLogo();
  }

  image.addEventListener("load", showLogo, { once: true });
  image.addEventListener("error", () => {
    image.remove();
  });
});

document.querySelectorAll("video").forEach((video) => {
  const frame = video.closest(".video-frame");
  const fallback = frame?.querySelector(".video-fallback");

  const hideFallback = () => {
    if (fallback) {
      fallback.hidden = true;
    }
  };

  if (video.readyState >= 2) {
    hideFallback();
  }

  video.addEventListener("loadeddata", hideFallback, { once: true });
  video.addEventListener("error", () => {
    if (fallback) {
      fallback.hidden = false;
    }
  });
});
