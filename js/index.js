// js/index.js - 首页功能
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    renderMovieGrid();
});

// 轮播图初始化
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators');
    
    // 清空原有轮播项
    carousel.innerHTML = '';
    indicators.innerHTML = '';

    // 创建新轮播项
    const banners = movies.slice(0, 3); // 取前3部电影作为轮播内容

    banners.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="res/img/banner/${index + 1}.jpg" alt="${movie.title}">
            <div class="carousel-content">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
            </div>
        `;
        carousel.appendChild(item);
    });

    // 修正：在创建新元素后获取items
    const items = document.querySelectorAll('.carousel-item');
    if (!carousel || !prevBtn || !nextBtn || items.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = items.length; // 现在能正确获取数量3

    // 创建指示器
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.dataset.index = i;
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }

    // 更新轮播图位置
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        // 更新指示器状态
        document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        updateCarousel();
    }

    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);

    // 鼠标悬停暂停
    carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    carousel.parentElement.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// 渲染电影网格
function renderMovieGrid() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;
    movieGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="res/img/poster/${movie.title}.jpg" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title} (${movie.year})</h3>
                <div class="rating">${'★'.repeat(Math.floor(movie.rating))}${movie.rating % 1 > 0 ? '½' : ''} ${movie.rating}/5</div>
                <p>${movie.description}</p>
                <button class="hero-btn play-btn" onclick="window.location.href='player.html'">观看</button>
            </div>
        `;
        movieGrid.appendChild(movieCard);
    });
}