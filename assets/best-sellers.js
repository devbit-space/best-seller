(function() {
  'use strict';

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  class ShowMoreToggle {
    constructor(sectionId) {
      this.sectionId = sectionId;
      this.button = document.getElementById(`show-more-${sectionId}`);
      this.section = document.querySelector(`[data-section-id="${sectionId}"]`);
      this.hiddenItems = this.section ? this.section.querySelectorAll('.best-seller-hidden') : [];
      this.isExpanded = false;
      this.originalText = '';

      if (this.button && this.hiddenItems.length > 0) {
        this.init();
      }
    }

    init() {
      this.originalText = this.button.textContent;
      this.button.addEventListener('click', () => this.toggle());
    }

    toggle() {
      this.isExpanded ? this.collapse() : this.expand();
    }

    expand() {
      this.isExpanded = true;
      this.button.setAttribute('aria-expanded', 'true');
      this.button.textContent = 'Show Less';
      this.button.classList.add('expanded');

      this.hiddenItems.forEach((item, index) => {
        item.classList.remove('tw-hidden', 'best-seller-hiding');
        item.classList.add('best-seller-visible');
        item.style.animationDelay = `${index * 50}ms`;
      });

      setTimeout(() => {
        const buttonRect = this.button.getBoundingClientRect();
        if (buttonRect.bottom > window.innerHeight) {
          this.button.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 400);
    }

    collapse() {
      this.isExpanded = false;
      this.button.setAttribute('aria-expanded', 'false');
      this.button.textContent = this.originalText;
      this.button.classList.remove('expanded');

      this.hiddenItems.forEach((item) => {
        item.classList.remove('best-seller-visible');
        item.classList.add('best-seller-hiding');
      });

      setTimeout(() => {
        this.hiddenItems.forEach((item) => {
          item.classList.add('tw-hidden');
          item.classList.remove('best-seller-hiding');
        });
        this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  class ScrollProgressBar {
    constructor(sectionId) {
      this.sectionId = sectionId;
      this.scrollContainer = document.getElementById(`desktop-scroll-${sectionId}`);
      this.thumb = document.getElementById(`scrollbar-thumb-${sectionId}`);
      this.track = document.getElementById(`scrollbar-track-${sectionId}`);
      this.isDragging = false;
      this.startX = 0;
      this.scrollLeft = 0;

      if (this.scrollContainer && this.thumb && this.track) {
        this.applyStyles();
        this.init();
      }
    }

    applyStyles() {
      // Apply all styles via JavaScript to avoid CSS conflicts
      this.track.style.cssText = `
        display: block;
        width: 100%;
        height: 2px;
        background-color: #e5e7eb;
        position: relative;
        border-radius: 10px;
        cursor: pointer;
        overflow: visible;
        transition: height 0.2s ease;
      `;

      this.thumb.style.cssText = `
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        min-width: 50px;
        background-color: #1f2937;
        border-radius: 10px;
        cursor: pointer;
        transition: height 0.2s ease;
      `;
    }

    init() {
      this.scrollContainer.addEventListener('scroll', debounce(() => this.updateProgress(), 10));
      this.initDrag();
      this.initHoverEffect();
      window.addEventListener('resize', debounce(() => this.updateProgress(), 100));
      
      this.updateProgress();
      setTimeout(() => this.updateProgress(), 100);
      setTimeout(() => this.updateProgress(), 500);
      window.addEventListener('load', () => this.updateProgress());
    }

    updateProgress() {
      const scrollLeft = this.scrollContainer.scrollLeft;
      const scrollWidth = this.scrollContainer.scrollWidth;
      const clientWidth = this.scrollContainer.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll <= 0 || scrollWidth === 0) {
        this.thumb.style.width = '100%';
        this.thumb.style.left = '0';
        return;
      }

      const thumbWidthPercent = (clientWidth / scrollWidth) * 100;
      const thumbWidth = Math.max(thumbWidthPercent, 10);
      const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const thumbPosition = scrollPercent * (100 - thumbWidth);

      this.thumb.style.width = `${thumbWidth}%`;
      this.thumb.style.left = `${thumbPosition}%`;
    }

    initDrag() {
      this.thumb.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.drag(e));
      document.addEventListener('mouseup', () => this.stopDrag());

      this.thumb.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
      document.addEventListener('touchmove', (e) => this.drag(e), { passive: true });
      document.addEventListener('touchend', () => this.stopDrag());

      this.track.addEventListener('click', (e) => this.jumpToPosition(e));
    }

    startDrag(e) {
      this.isDragging = true;
      this.thumb.style.cursor = 'grabbing';
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      this.startX = clientX;
      this.scrollLeft = this.scrollContainer.scrollLeft;
    }

    drag(e) {
      if (!this.isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const trackRect = this.track.getBoundingClientRect();
      const deltaX = clientX - this.startX;
      const trackWidth = trackRect.width;
      const scrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      const scrollAmount = (deltaX / trackWidth) * scrollWidth * 2;
      this.scrollContainer.scrollLeft = this.scrollLeft + scrollAmount;
    }

    stopDrag() {
      this.isDragging = false;
      this.thumb.style.cursor = 'pointer';
    }

    jumpToPosition(e) {
      if (e.target === this.thumb) return;
      const trackRect = this.track.getBoundingClientRect();
      const clickPosition = (e.clientX - trackRect.left) / trackRect.width;
      const maxScroll = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      this.scrollContainer.scrollTo({
        left: clickPosition * maxScroll,
        behavior: 'smooth'
      });
    }

    setHeight(h) {
      this.track.style.height = h;
      this.thumb.style.height = h;
    }

    initHoverEffect() {
      this.track.addEventListener('mouseenter', () => this.setHeight('6px'));
      this.track.addEventListener('mouseleave', () => {
        if (!this.isDragging) this.setHeight('2px');
      });
      this.track.addEventListener('touchstart', () => this.setHeight('6px'), { passive: true });
      this.track.addEventListener('touchend', () => {
        setTimeout(() => {
          if (!this.isDragging) this.setHeight('2px');
        }, 300);
      });
    }
  }

  class ImageHoverSwap {
    constructor(section) {
      this.section = section;
      this.cards = section.querySelectorAll('.best-seller-card');
      this.init();
    }

    init() {
      this.cards.forEach(card => {
        const primaryImage = card.querySelector('.product-image-primary');
        const hoverImage = card.querySelector('.product-image-hover');
        if (!hoverImage) return;

        let touchTimeout;
        card.addEventListener('touchstart', () => {
          touchTimeout = setTimeout(() => {
            primaryImage.style.opacity = '0';
            hoverImage.style.opacity = '1';
          }, 150);
        }, { passive: true });

        card.addEventListener('touchend', () => {
          clearTimeout(touchTimeout);
          primaryImage.style.opacity = '1';
          hoverImage.style.opacity = '0';
        });

        card.addEventListener('touchcancel', () => {
          clearTimeout(touchTimeout);
          primaryImage.style.opacity = '1';
          hoverImage.style.opacity = '0';
        });
      });
    }
  }

  function initBestSellersSection() {
    const sections = document.querySelectorAll('.best-sellers-section');
    sections.forEach(section => {
      const sectionId = section.dataset.sectionId;
      if (!sectionId) return;
      if (section.dataset.initialized === 'true') return;
      section.dataset.initialized = 'true';

      new ShowMoreToggle(sectionId);
      new ScrollProgressBar(sectionId);
      new ImageHoverSwap(section);
    });
  }

  function safeInit() {
    initBestSellersSection();
    setTimeout(initBestSellersSection, 100);
    setTimeout(initBestSellersSection, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
  } else {
    safeInit();
  }

  window.addEventListener('load', initBestSellersSection);

  if (typeof Shopify !== 'undefined') {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.best-sellers-section');
      if (section) {
        section.dataset.initialized = 'false';
        setTimeout(initBestSellersSection, 100);
      }
    });
  }

  window.BestSellers = {
    ShowMoreToggle,
    ScrollProgressBar,
    ImageHoverSwap,
    init: initBestSellersSection
  };
})();
