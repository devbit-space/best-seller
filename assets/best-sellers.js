/**
 * Best Sellers Section JavaScript
 * Handles:
 * - Mobile "Show More" toggle functionality
 * - Desktop horizontal scroll progress bar
 * - Custom scrollbar behavior (height increase on hover)
 */

(function() {
  'use strict';

  // =========================================
  // Utility Functions
  // =========================================
  
  /**
   * Debounce function to limit execution rate
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
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

  // =========================================
  // Mobile Show More Functionality
  // =========================================

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
      if (this.isExpanded) {
        this.collapse();
      } else {
        this.expand();
      }
    }

    expand() {
      this.isExpanded = true;
      this.button.setAttribute('aria-expanded', 'true');
      this.button.textContent = 'Show Less';
      this.button.classList.add('expanded');

      // Reveal hidden items with staggered animation
      this.hiddenItems.forEach((item, index) => {
        item.classList.remove('tw-hidden', 'best-seller-hiding');
        item.classList.add('best-seller-visible');
        
        // Add slight delay for each item
        item.style.animationDelay = `${index * 50}ms`;
      });

      // Scroll to keep button in view after animation
      setTimeout(() => {
        const buttonRect = this.button.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (buttonRect.bottom > viewportHeight) {
          this.button.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 400);
    }

    collapse() {
      this.isExpanded = false;
      this.button.setAttribute('aria-expanded', 'false');
      this.button.textContent = this.originalText;
      this.button.classList.remove('expanded');

      // Hide items with animation
      this.hiddenItems.forEach((item) => {
        item.classList.remove('best-seller-visible');
        item.classList.add('best-seller-hiding');
      });

      // Wait for animation then hide
      setTimeout(() => {
        this.hiddenItems.forEach((item) => {
          item.classList.add('tw-hidden');
          item.classList.remove('best-seller-hiding');
        });
        
        // Scroll to section top
        this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // =========================================
  // Desktop Scroll Progress Bar
  // =========================================

  class ScrollProgressBar {
    constructor(sectionId) {
      this.sectionId = sectionId;
      this.scrollContainer = document.getElementById(`desktop-scroll-${sectionId}`);
      this.progressThumb = document.getElementById(`scrollbar-thumb-${sectionId}`);
      this.track = document.getElementById(`scrollbar-track-${sectionId}`);
      this.isDragging = false;
      this.startX = 0;
      this.scrollLeft = 0;

      if (this.scrollContainer && this.progressThumb) {
        this.init();
      }
    }

    init() {
      // Update progress on scroll
      this.scrollContainer.addEventListener('scroll', debounce(() => this.updateProgress(), 10));
      
      // Initialize progress
      this.updateProgress();

      // Make progress bar draggable
      this.initDrag();

      // Handle resize
      window.addEventListener('resize', debounce(() => this.updateProgress(), 100));

      // Hover effect for custom scrollbar track
      this.initHoverEffect();
    }

    updateProgress() {
      const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll <= 0) {
        this.progressThumb.style.width = '100%';
        this.progressThumb.style.left = '0';
        return;
      }

      // Calculate thumb width based on visible ratio
      const visibleRatio = clientWidth / scrollWidth;
      const thumbWidth = Math.max(visibleRatio * 100, 10); // Minimum 10%
      
      // Calculate thumb position
      const scrollRatio = scrollLeft / maxScroll;
      const maxThumbPosition = 100 - thumbWidth;
      const thumbPosition = scrollRatio * maxThumbPosition;

      this.progressThumb.style.width = `${thumbWidth}%`;
      this.progressThumb.style.left = `${thumbPosition}%`;
    }

    initDrag() {
      const track = this.track || this.progressThumb.parentElement;

      // Mouse events
      this.progressThumb.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.drag(e));
      document.addEventListener('mouseup', () => this.stopDrag());

      // Touch events
      this.progressThumb.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
      document.addEventListener('touchmove', (e) => this.drag(e), { passive: true });
      document.addEventListener('touchend', () => this.stopDrag());

      // Click on track to jump
      if (track) {
        track.addEventListener('click', (e) => this.jumpToPosition(e));
      }
    }

    startDrag(e) {
      this.isDragging = true;
      this.progressThumb.style.cursor = 'grabbing';
      
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      this.startX = clientX;
      this.scrollLeft = this.scrollContainer.scrollLeft;
    }

    drag(e) {
      if (!this.isDragging) return;

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const track = this.track || this.progressThumb.parentElement;
      const trackRect = track.getBoundingClientRect();
      const deltaX = clientX - this.startX;
      
      // Calculate scroll amount based on track width ratio
      const trackWidth = trackRect.width;
      const scrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      const scrollAmount = (deltaX / trackWidth) * scrollWidth * 2;

      this.scrollContainer.scrollLeft = this.scrollLeft + scrollAmount;
    }

    stopDrag() {
      this.isDragging = false;
      this.progressThumb.style.cursor = 'pointer';
    }

    jumpToPosition(e) {
      if (e.target === this.progressThumb) return;

      const track = this.track || this.progressThumb.parentElement;
      const trackRect = track.getBoundingClientRect();
      const clickPosition = (e.clientX - trackRect.left) / trackRect.width;
      
      const maxScroll = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      this.scrollContainer.scrollTo({
        left: clickPosition * maxScroll,
        behavior: 'smooth'
      });
    }

    initHoverEffect() {
      const track = this.track || this.progressThumb.parentElement;
      
      if (!track) return;

      // Increase height on hover
      track.addEventListener('mouseenter', () => {
        track.style.height = '6px';
      });

      track.addEventListener('mouseleave', () => {
        if (!this.isDragging) {
          track.style.height = '2px';
        }
      });

      // Touch hover simulation
      track.addEventListener('touchstart', () => {
        track.style.height = '6px';
      }, { passive: true });

      track.addEventListener('touchend', () => {
        setTimeout(() => {
          track.style.height = '2px';
        }, 300);
      });
    }
  }

  // =========================================
  // Image Hover Swap (Touch Support)
  // =========================================

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

        // Touch events for mobile
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

  // =========================================
  // Initialization
  // =========================================

  function initBestSellersSection() {
    const sections = document.querySelectorAll('.best-sellers-section');

    sections.forEach(section => {
      const sectionId = section.dataset.sectionId;

      // Initialize mobile show more
      new ShowMoreToggle(sectionId);

      // Initialize desktop scroll progress
      new ScrollProgressBar(sectionId);

      // Initialize image hover swap for touch devices
      new ImageHoverSwap(section);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBestSellersSection);
  } else {
    initBestSellersSection();
  }

  // Re-initialize on Shopify section reload (Theme Editor)
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      if (event.target.classList.contains('section-best-sellers')) {
        initBestSellersSection();
      }
    });
  }

})();
