import Mock from 'mockjs';

Mock.mock('/api/login', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);

    if (username === 'admin' && password === '123456') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                token: 'mock-token',
                username: 'admin'
            }
        };
    } else {
        return {
            code: 401,
            message: '账号或密码错误'
        };
    }
});
