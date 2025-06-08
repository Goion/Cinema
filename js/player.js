// js/player.js - 播放页面功能
document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayer();
    initComments();
});

// 视频播放器初始化
function initVideoPlayer() {
    const videoPlayer = document.getElementById('videoPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const playbackSelect = document.getElementById('playbackSelect');
    
    if (!videoPlayer || !playBtn || !pauseBtn || !volumeSlider || !playbackSelect) return;

    // 播放按钮
    playBtn.addEventListener('click', () => {
        videoPlayer.play();
    });

    // 暂停按钮
    pauseBtn.addEventListener('click', () => {
        videoPlayer.pause();
    });

    // 音量控制
    volumeSlider.addEventListener('input', () => {
        videoPlayer.volume = volumeSlider.value;
    });

    // 播放速度控制
    playbackSelect.addEventListener('change', () => {
        videoPlayer.playbackRate = playbackSelect.value;
    });

    // 更新按钮状态
    videoPlayer.addEventListener('play', () => {
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    });

    videoPlayer.addEventListener('pause', () => {
        playBtn.disabled = false;
        pauseBtn.disabled = true;
    });
}

// 评论功能初始化
function initComments() {
    const commentForm = document.querySelector('.comment-form');
    const commentList = document.getElementById('commentList');
    const submitBtn = document.getElementById('submitComment');
    
    if (!commentForm || !commentList || !submitBtn) return;
    
    // 加载现有评论
    loadComments();
    
    // 提交新评论
    submitBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');

        if (!nameInput.value.trim() || !commentInput.value.trim()) {
            alert('请输入姓名和评论内容');
            return;
        }

        // 创建新评论
        const newComment = {
            name: nameInput.value.trim(),
            comment: commentInput.value.trim(),
            date: new Date().toLocaleDateString()
        };

        // 添加到DOM
        addCommentToDOM(newComment);
        
        // 保存到localStorage
        saveComment(newComment);
        
        // 清空表单
        nameInput.value = '';
        commentInput.value = '';
    });
}

// 加载评论
function loadComments() {
    const commentList = document.getElementById('commentList');
    if (!commentList) return;
    const comments = JSON.parse(localStorage.getItem('movieComments')) || [];
    comments.forEach(comment => addCommentToDOM(comment));
}

// 添加评论到DOM
function addCommentToDOM(comment) {
    const commentList = document.getElementById('commentList');
    if (!commentList) return;
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">${comment.name}</div>
            <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-content">${comment.comment}</div>
    `;
    commentList.prepend(commentEl);
}

// 保存评论
function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('movieComments')) || [];
    comments.push(comment);
    localStorage.setItem('movieComments', JSON.stringify(comments));
}