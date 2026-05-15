/* ============================================
   GALLERY.JS - Gallery & filter functionality
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // GALLERY LIGHTBOX
  // ============================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightboxOverlay) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption') || '';
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxOverlay.classList.add('open');
        document.body.classList.add('no-scroll');
      });
    });

    const closeLightbox = () => {
      lightboxOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // ============================================
  // GENERIC FILTER SYSTEM
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const filterTargets = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        filterTargets.forEach(target => {
          if (filter === 'all' || target.getAttribute('data-category') === filter) {
            target.style.display = '';
            requestAnimationFrame(() => {
              target.style.opacity = '1';
              target.style.transform = 'scale(1)';
            });
          } else {
            target.style.opacity = '0';
            target.style.transform = 'scale(0.95)';
            setTimeout(() => {
              target.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ============================================
  // PROJECT MODAL
  // ============================================
  const projectCards = document.querySelectorAll('[data-project-trigger]');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');

  if (projectCards.length > 0 && projectModal) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-trigger');
        const projectData = window.projectsData && window.projectsData[id];
        if (projectData) {
          populateProjectModal(projectData);
        }
        projectModal.classList.add('open');
        document.body.classList.add('no-scroll');
      });
    });

    const closeModal = () => {
      projectModal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    };

    if (projectModalClose) projectModalClose.addEventListener('click', closeModal);

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function populateProjectModal(data) {
    const title = projectModal.querySelector('#modalTitle');
    const desc = projectModal.querySelector('#modalDesc');
    const tools = projectModal.querySelector('#modalTools');
    const timeline = projectModal.querySelector('#modalTimeline');
    const features = projectModal.querySelector('#modalFeatures');

    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.description;
    if (timeline) timeline.textContent = data.timeline;
    if (tools) {
      tools.innerHTML = data.tools.map(t =>
        `<span class="badge">${t}</span>`
      ).join('');
    }
    if (features) {
      features.innerHTML = data.features.map(f =>
        `<li>${f}</li>`
      ).join('');
    }
  }

  // ============================================
  // BLOG SEARCH
  // ============================================
  const blogSearch = document.getElementById('blogSearch');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogSearch && blogCards.length > 0) {
    blogSearch.addEventListener('input', () => {
      const query = blogSearch.value.toLowerCase().trim();

      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // ============================================
  // TOC (Table of Contents - Blog Detail)
  // ============================================
  const tocLinks = document.querySelectorAll('.toc-link');
  const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');

  if (tocLinks.length > 0 && articleHeadings.length > 0) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    articleHeadings.forEach(h => headingObserver.observe(h));
  }
});
