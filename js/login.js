document.addEventListener('DOMContentLoaded', function() {
    // 初始化默认账号
    const defaultUser = {
        email: '123@exm.com',
        password: '123456'
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(u => u.email === defaultUser.email)) {
        users.push(defaultUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // 绑定所有事件监听器
    document.querySelector('.signup-link a').addEventListener('click', handleFormToggle);
    
    // 登录表单处理
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]');
        const password = this.querySelector('input[type="password"]');

        // 清除旧错误提示
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;
        if (!validateEmail(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        }
        if (password.value.length < 6) {
            showError(password, '密码至少需要6位');
            isValid = false;
        }

        if (isValid) {
            // 验证用户信息
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => 
                u.email === email.value && 
                u.password === password.value
            );

            if (user) {
                localStorage.setItem('currentUser', user.email);
                // 移除setTimeout直接跳转
                alert('登录成功！即将跳转首页...');
                window.location.href = 'index.html'; // 移除延迟确保立即跳转
            } else {
                showError(email, '邮箱或密码错误');
            }
        }
    });

    // 注册表单处理
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input');
        const [email, pwd, confirmPwd] = inputs;

        // 清除旧错误提示
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;
        if (!validateEmail(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        }
        if (pwd.value.length < 6) {
            showError(pwd, '密码至少需要6位');
            isValid = false;
        }
        if (pwd.value !== confirmPwd.value) {
            showError(confirmPwd, '两次输入的密码不一致');
            isValid = false;
        }

        if (isValid) {
            // 保存用户信息
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(u => u.email === email.value)) {
                showError(email, '该邮箱已被注册');
                return;
            }
            
            users.push({
                email: email.value,
                password: pwd.value
            });
            localStorage.setItem('users', JSON.stringify(users));
            
            // 模拟注册成功
            setTimeout(() => {
                alert('注册成功！即将自动登录...');
                handleFormToggle();
                document.getElementById('loginForm').querySelector('input[type="email"]').value = email.value;
            }, 500);
        }
    });
});

// 优化后的切换逻辑
function handleFormToggle() {
    const authForms = document.querySelectorAll('.auth-form');
    const linkText = document.querySelector('.signup-link a');
    
    authForms.forEach(form => {
        // 移除直接操作display属性，完全依赖CSS控制显示
        form.classList.toggle('active');
    });
    
    linkText.textContent = authForms[1].classList.contains('active') 
        ? '返回登录' 
        : '立即注册';
}

// 通用验证方法
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const showError = (input, message) => {
    const errorEl = input.nextElementSibling || document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    input.parentNode.insertBefore(errorEl, input.nextSibling);
};

