'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 上报异常（站点未接 Sentry，目前只 console）
    // eslint-disable-next-line no-console
    console.error('[YYGsee] client-side exception:', error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          margin: 0,
          minHeight: '100vh',
          background: '#0a0f1a',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 520, width: '100%' }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 12,
              color: '#fff',
            }}
          >
            页面加载时出错了
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: '#94a3b8',
              marginBottom: 24,
            }}
          >
            站点已部署成功，但浏览器端的 React 在渲染时遇到了异常。
            99% 是浏览器缓存了过期的 JS chunk —— 请按 <strong style={{ color: '#67e8f9' }}>Ctrl+Shift+R</strong>（Mac: <strong style={{ color: '#67e8f9' }}>Cmd+Shift+R</strong>）强刷一次。
          </p>

          <details
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '12px 16px',
              marginBottom: 24,
              fontSize: 13,
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                color: '#cbd5e1',
                fontWeight: 500,
              }}
            >
              错误详情（点击展开）
            </summary>
            <pre
              style={{
                marginTop: 12,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: '#fca5a5',
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {error.message}
              {error.digest ? `\n\ndigest: ${error.digest}` : ''}
            </pre>
          </details>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              重试
            </button>
            <a
              href="/YYGsee/"
              style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.06)',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              返回首页
            </a>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {}
                location.reload();
              }}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                color: '#fbbf24',
                border: '1px solid rgba(251,191,36,0.3)',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              清缓存并重载
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
