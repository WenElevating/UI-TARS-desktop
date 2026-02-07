## 目标
- 在 Windows 环境下完成依赖体检（Node/pnpm/系统构建依赖/浏览器等）
- 从源码把桌面 Agent（Electron）以开发模式跑起来，并确认窗口正常启动

## 我已确认的仓库信息（无需改代码）
- Monorepo：pnpm workspace + turbo（根目录 `packageManager: pnpm@9.10.0`，Node `>=20.x`）见 [package.json](file:///d:/AiProject/UI-TARS-desktop-0.3.0/package.json#L1-L57)
- 启动脚本：`pnpm run dev:ui-tars`（实际是 `turbo run ui-tars-desktop#dev`）见 [CONTRIBUTING.md](file:///d:/AiProject/UI-TARS-desktop-0.3.0/CONTRIBUTING.md#L99-L123)
- 桌面端为 Electron Forge + electron-vite，依赖包含 native 模块（如 `sharp`、`@computer-use/nut-js`）见 [apps/ui-tars/package.json](file:///d:/AiProject/UI-TARS-desktop-0.3.0/apps/ui-tars/package.json#L59-L133)

## 依赖检查（我会实际执行并汇总结果）
1. 检查 Node 与 pnpm 版本
   - 运行：`node -v`、`corepack -v`、`pnpm -v`
   - 若 Node < 20：安装/切换到 Node 20+（优先用 nvm-windows 或官方安装包）
   - 若 pnpm 未安装：`corepack enable` 后 `corepack prepare pnpm@9.10.0 --activate`
2. 检查 Windows native 构建链（用于 sharp/nut.js 等）
   - 运行：`python --version`、`where python`、`vswhere`/检查 “Desktop development with C++”
   - 若缺失：安装 Python 3.x + Visual Studio Build Tools（C++ 工作负载）
3. 检查运行期外部依赖
   - Browser Operator：确认已安装 Chrome/Edge/Firefox（见 [docs/quick-start.md](file:///d:/AiProject/UI-TARS-desktop-0.3.0/docs/quick-start.md#L9-L13)）

## 安装依赖（我会实际执行并处理常见报错）
1. 在仓库根目录执行 `pnpm install`
2. 若遇到 native 模块编译/下载问题（常见于 sharp/electron 下载）
   - 收集错误日志关键行
   - 给出针对性修复：清理 store、重新安装、必要时设置镜像/代理、或补齐构建链

## 运行与验证（我会实际启动并确认能看到窗口）
1. 启动开发模式：`pnpm run dev:ui-tars`
   - 备选：`pnpm --filter ui-tars-desktop dev`（定位到单 app）
2. 观察 Electron 主进程/渲染进程日志，确认无崩溃
3. 若需要主进程热重载：`pnpm --filter ui-tars-desktop dev:w`（或根目录对应脚本）

## 输出交付
- 一份“依赖体检结果”（版本/缺失项/修复动作）
- 可复现的启动命令与注意事项（含 Windows 常见坑位）
- 若启动失败：提供最小修复改动（仅在确有必要时）并再次验证可启动
