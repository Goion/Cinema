// 新增搜索功能
document.addEventListener('DOMContentLoaded', function() {
    const searchIcons = document.querySelectorAll('.search-icon');
    const searchInputs = document.querySelectorAll('.search-input');
    const suggestionsContainers = document.querySelectorAll('.search-suggestions');

    // 点击图标显示搜索框
    searchIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            searchInputs[index].classList.toggle('active');
            if (searchInputs[index].classList.contains('active')) {
                searchInputs[index].focus();
            }
        });
    });

    // 输入搜索内容
    searchInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const results = searchData(query);
            showSuggestions(results, suggestionsContainers[index]);
        });

        // 失去焦点隐藏建议
        input.addEventListener('blur', () => {
            setTimeout(() => {
                suggestionsContainers[index].style.display = 'none';
            }, 200);
        });
    });

    // 搜索数据逻辑
    function searchData(query) {
        return [...movies, ...posters].filter(item => 
            item.title.toLowerCase().includes(query) || 
            (item.description && item.description.toLowerCase().includes(query))
        );
    }

    // 显示建议列表
    function showSuggestions(results, container) {
        container.innerHTML = '';
        if (results.length > 0) {
            results.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-suggestion-item';
                div.innerHTML = `
                    <strong>${item.title}</strong>
                    <span>(${item.year})</span>
                    <p>${item.description?.substring(0, 50) || ''}...</p>
                `;
                div.addEventListener('click', () => {
                    handleSearchResult(item);
                });
                container.appendChild(div);
            });
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    // 处理点击结果
    function handleSearchResult(item) {
        window.location.href = item.genre === 'poster' ? 
            `posters.html#${item.id}` : 
            `player.html?movie=${item.id}`;
    }
});

// 新增用户状态管理
function updateUserStatus() {
    const userAvatar = document.getElementById('userAvatar');
    const currentUser = localStorage.getItem('currentUser');
    
    if (userAvatar) {
        if (currentUser) {
            userAvatar.textContent = currentUser.slice(0, 2);
            userAvatar.style.backgroundColor = '#e50914';
            // 新增点击事件处理：退出登录
            userAvatar.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });

        } else {
            userAvatar.textContent = '登陆';
            userAvatar.style.backgroundColor = '';
            // 移除点击事件恢复默认登录跳转
            userAvatar.removeEventListener('click', arguments.callee);
        }
    }
}

// 在DOM加载时更新状态
document.addEventListener('DOMContentLoaded', function() {
    updateUserStatus();
});
