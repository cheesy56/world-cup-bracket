# 部署说明

## 运行环境

- Node.js 18 或更高版本

## 本地启动

```bash
node server.js
```

默认地址：

```text
http://127.0.0.1:3000
```

自定义端口：

```bash
PORT=8080 node server.js
```

Windows PowerShell:

```powershell
$env:PORT=8080
node server.js
```

## Supabase 配置文件

项目现在使用本地配置文件管理 Supabase 连接信息：

```text
supabase.config.js
```

当前配置项：

- `url`
- `key`
- `schema`
- `table`

示例：

```js
module.exports = {
  url: "https://your-project.supabase.co",
  key: "your-secret-key",
  schema: "public",
  table: "scenarios"
};
```

## 数据存储

这个项目支持两种存储方式：

1. 如果 `supabase.config.js` 里配置了有效的 `url` 和 `key`，后端会直接使用 Supabase。
2. 如果没有配置有效信息，会退回到本地文件：

```text
data/scenarios.json
```

## 当前表结构

当前使用的表：

```text
public.scenarios
```

当前字段：

- `id`
- `name`
- `created_at`
- `state`

说明：

- `state` 用来保存整个竞猜结果，类型建议是 `jsonb`
- `id` 当前是 `int8` 也可以，后端已经做了兼容处理

## 共享数据效果

配置好 Supabase 后：

- 用户 A 保存的数据会进入同一张 Supabase 表
- 用户 B 打开网站后会读取同一张表里的数据
- 用户 B 点击“载入”即可查看用户 A 保存的竞猜结果

## 部署到服务器

最简单的方法：

1. 把整个项目上传到 GitHub
2. 在 Render 创建新的 Web Service
3. 连接仓库
4. 启动命令填写：

```text
node server.js
```

5. 确保仓库中包含 `supabase.config.js`
6. 重新部署

## 安全提醒

`supabase.config.js` 里现在是明文密钥。

这意味着：

- 不要把这个仓库设为公开仓库
- 如果你后面把仓库公开，建议立刻轮换 Supabase key
