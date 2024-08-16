import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // 设置3秒后跳转到首页
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // 清除计时器
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 Not Found</h1>
      <p>将在3秒后跳转至<a href='localhost:9000/home'>home</a>页面，你也可以点击跳转</p>
    </div>
  );
}
