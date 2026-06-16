(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const revealSelector = [
    ".section-head",
    ".metrics-showcase",
    ".metrics-grid article",
    ".materials-advantage",
    ".product-tile",
    ".service-card",
    ".calculator-card",
    ".process-grid article",
    ".showcase-card",
    ".contact-copy",
    ".contact-form",
    ".fences-hero-copy",
    ".fences-hero-panel",
    ".fences-type-card",
    ".fences-material-list article",
    ".fences-project-grid article",
    ".fences-contact-copy",
    ".fences-form",
    ".canopies-material-copy",
    ".canopies-material-board",
    ".canopies-use-card",
    ".canopies-contact-copy",
    ".canopies-form",
    ".gates-stitch-hero-copy",
    ".gates-stitch-hero-media-wrap",
    ".gates-stitch-card",
    ".gates-stitch-projects article",
    ".gates-stitch-contact-copy",
    ".gates-stitch-form"
  ].join(",");

  const revealItems = Array.from(document.querySelectorAll(revealSelector));
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-target");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach(item => observer.observe(item));
})();
