/**
 * 试用码配置
 * 短密码方案：用户只需输入 1 个简单短码即可解锁（默认 YYG123）
 * 如需新增备用码或切换为完全开放，直接修改此文件即可
 */
export const TRIAL_CODES: string[] = [
  'YYG123',
];

export const TRIAL_STORAGE_KEY = 'rbv_trial_ok';
