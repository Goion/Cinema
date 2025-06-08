// js/posters.js - 海报页面功能
document.addEventListener('DOMContentLoaded', function() {
    renderPosterGrid();
});

// 渲染海报网格
function renderPosterGrid() {
    const posterGrid = document.getElementById('posterGrid');
    if (!posterGrid) return;
    posterGrid.innerHTML = '';
    
    posters.forEach(poster => {
        const posterItem = document.createElement('div');
        posterItem.className = 'poster-item';
        posterItem.dataset.genre = poster.genre;
        posterItem.innerHTML = `
            <img src="res/img/poster/${poster.title}.jpg" alt="${poster.title}">
            <div class="poster-overlay">
                <h4>${poster.title}</h4>
                <p>${poster.year}年</p>
            </div>
        `;
        posterItem.addEventListener('click', () => openModal(poster.title));
        posterGrid.appendChild(posterItem);
    });

    // 添加筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 获取筛选条件
            const filter = btn.dataset.filter;

            // 筛选海报
            document.querySelectorAll('.poster-item').forEach(item => {
                if (filter === 'all' || item.dataset.genre === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 打开海报模态框
function openModal(title) {
    const modal = document.getElementById('posterModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = `res/img/poster/${title}.jpg`;
    modalImg.alt = `${title} 海报`;
    
    // 先设置显示状态再添加动画类
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 关闭模态框
    document.getElementById('closeModal').addEventListener('click', () => {
        // 先移除动画类再隐藏
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // 匹配动画持续时间
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}
