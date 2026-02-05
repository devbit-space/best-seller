const products = [
  {
    title: "Outside Vibes T-Shirt Sunshine",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 4,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
  },
  {
    title: "Hike Bottle Outside Vibes Forest Green",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: true,
    saleText: "SAVE 15%",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop"
  },
  {
    title: "Rest In Nature T-Shirt Charcoal",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"
  },
  {
    title: "Outside Vibes Cap Forest Green",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: true,
    saleText: "SAVE 15%",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
  },
  {
    title: "Rest In Nature T-Shirt Charcoal",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop"
  },
  {
    title: "Outside Vibes T-Shirt Sunshine",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"
  },
  {
    title: "Hike Bottle Outside Vibes",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: true,
    saleText: "SAVE 15%",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop"
  },
  {
    title: "Rest In Nature T-Shirt Charcoal",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"
  },
  {
    title: "Outside Vibes Cap Forest Green",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: true,
    saleText: "SAVE 15%",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop"
  },
  {
    title: "Adventure Backpack Navy",
    price: "$104.95",
    reviews: "1,234 Reviews",
    rating: 5,
    bestSeller: true,
    sale: false,
    saleText: "",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop"
  }
];

const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function generateStars(rating) {
  return Array.from({ length: 5 }, (_, i) => 
    `<svg viewBox="0 0 20 20" fill="${i < rating ? '#1f2937' : '#d1d5db'}"><path d="${starPath}"/></svg>`
  ).join('');
}

function generateProductCard(product, index, isMobile = false) {
  const hiddenClass = isMobile && index > 4 ? 'best-seller-hidden tw-hidden' : '';
  const widthClass = isMobile ? '' : 'tw-w-[220px] tw-flex-shrink-0';
  
  return `
    <li class="product-item ${hiddenClass} ${widthClass}" data-product-index="${index}">
      <article class="best-seller-card tw-group tw-relative tw-bg-white">
        <a href="#" class="product-image-container tw-block tw-relative tw-aspect-square tw-overflow-hidden tw-rounded-lg tw-bg-gray-100">
          <div class="tw-absolute tw-top-2 tw-left-2 tw-right-2 tw-flex tw-justify-between tw-items-start tw-z-10">
            ${product.bestSeller ? '<span class="best-seller-badge">BEST SELLER</span>' : '<span></span>'}
            ${product.sale ? `<span class="sale-badge">${product.saleText}</span>` : ''}
          </div>
          <img src="${product.image}" alt="${product.title}" loading="lazy" class="product-image-primary tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-opacity tw-duration-300 group-hover:tw-opacity-0">
          <img src="${product.imageHover}" alt="${product.title} - alternate view" loading="lazy" class="product-image-hover tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100">
        </a>
        <div class="tw-pt-4 tw-pb-2">
          <h3 class="product-title"><a href="#">${product.title}</a></h3>
          <div class="product-rating">
            <div class="stars">${generateStars(product.rating)}</div>
            <span class="reviews-count">${product.reviews}</span>
          </div>
          <p class="product-price">${product.price}</p>
        </div>
      </article>
    </li>
  `;
}

function renderProducts() {
  document.getElementById('desktop-list').innerHTML = products.map((p, i) => generateProductCard(p, i + 1, false)).join('');
  document.getElementById('mobile-grid').innerHTML = products.map((p, i) => generateProductCard(p, i + 1, true)).join('');
}

class ShowMoreToggle {
  constructor(sectionId) {
    this.button = document.getElementById(`show-more-${sectionId}`);
    this.section = document.querySelector(`[data-section-id="${sectionId}"]`);
    this.hiddenItems = [];
    this.isExpanded = false;
    this.originalText = 'Show More';
    if (this.button) this.button.addEventListener('click', () => this.toggle());
  }

  updateHiddenItems() {
    this.hiddenItems = Array.from(this.section.querySelectorAll('[data-product-index]'))
      .filter(item => parseInt(item.getAttribute('data-product-index')) > 4);
  }

  toggle() {
    this.updateHiddenItems();
    this.isExpanded ? this.collapse() : this.expand();
  }

  expand() {
    this.isExpanded = true;
    this.button.setAttribute('aria-expanded', 'true');
    this.button.textContent = 'Show Less';
    this.button.classList.add('expanded');
    this.hiddenItems.forEach((item, i) => {
      item.classList.remove('tw-hidden', 'best-seller-hiding', 'best-seller-hidden');
      item.classList.add('best-seller-visible');
      item.style.animationDelay = `${i * 50}ms`;
    });
  }

  collapse() {
    this.isExpanded = false;
    this.button.setAttribute('aria-expanded', 'false');
    this.button.textContent = this.originalText;
    this.button.classList.remove('expanded');
    this.hiddenItems.forEach(item => {
      item.classList.remove('best-seller-visible');
      item.classList.add('best-seller-hiding');
    });
    setTimeout(() => {
      this.hiddenItems.forEach(item => {
        item.classList.add('tw-hidden', 'best-seller-hidden');
        item.classList.remove('best-seller-hiding');
      });
      this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}

class ScrollProgressBar {
  constructor(sectionId) {
    this.scrollContainer = document.getElementById(`desktop-scroll-${sectionId}`);
    this.progressThumb = document.getElementById(`scrollbar-thumb-${sectionId}`);
    this.track = document.getElementById(`scrollbar-track-${sectionId}`);
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    if (this.scrollContainer && this.progressThumb) this.init();
  }

  init() {
    this.scrollContainer.addEventListener('scroll', () => this.updateProgress());
    this.initDrag();
    window.addEventListener('resize', () => this.updateProgress());
    this.initHoverEffect();
    
    this.updateProgress();
    setTimeout(() => this.updateProgress(), 100);
    window.addEventListener('load', () => this.updateProgress());
  }

  updateProgress() {
    const container = this.scrollContainer;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    if (maxScroll <= 0 || scrollWidth === 0) {
      this.progressThumb.style.width = '100%';
      this.progressThumb.style.left = '0';
      return;
    }
    
    const thumbWidthPercent = (clientWidth / scrollWidth) * 100;
    const thumbWidth = Math.max(thumbWidthPercent, 5);
    const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const thumbPosition = scrollPercent * (100 - thumbWidth);
    
    this.progressThumb.style.width = `${thumbWidth}%`;
    this.progressThumb.style.left = `${thumbPosition}%`;
  }

  initDrag() {
    this.progressThumb.addEventListener('mousedown', e => this.startDrag(e));
    document.addEventListener('mousemove', e => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
    this.progressThumb.addEventListener('touchstart', e => this.startDrag(e), { passive: true });
    document.addEventListener('touchmove', e => this.drag(e), { passive: true });
    document.addEventListener('touchend', () => this.stopDrag());
    if (this.track) this.track.addEventListener('click', e => this.jumpToPosition(e));
  }

  startDrag(e) {
    this.isDragging = true;
    this.progressThumb.style.cursor = 'grabbing';
    this.startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    this.scrollLeft = this.scrollContainer.scrollLeft;
  }

  drag(e) {
    if (!this.isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const trackRect = this.track.getBoundingClientRect();
    const deltaX = clientX - this.startX;
    const scrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    this.scrollContainer.scrollLeft = this.scrollLeft + (deltaX / trackRect.width) * scrollWidth * 2;
  }

  stopDrag() {
    this.isDragging = false;
    this.progressThumb.style.cursor = 'pointer';
  }

  jumpToPosition(e) {
    if (e.target === this.progressThumb) return;
    const trackRect = this.track.getBoundingClientRect();
    const clickPosition = (e.clientX - trackRect.left) / trackRect.width;
    const maxScroll = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    this.scrollContainer.scrollTo({ left: clickPosition * maxScroll, behavior: 'smooth' });
  }

  initHoverEffect() {
    if (!this.track) return;
    this.track.addEventListener('mouseenter', () => this.track.style.height = '6px');
    this.track.addEventListener('mouseleave', () => { if (!this.isDragging) this.track.style.height = '2px'; });
    this.track.addEventListener('touchstart', () => this.track.style.height = '6px', { passive: true });
    this.track.addEventListener('touchend', () => setTimeout(() => this.track.style.height = '2px', 300));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  new ShowMoreToggle('demo');
  new ScrollProgressBar('demo');
});
