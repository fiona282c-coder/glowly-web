# Glowly Web Demo

Glowly 是一個 AI Beauty Stylist 網站 Demo，包含：

- 自拍上傳預覽
- 模擬 AI 膚質分析
- 妝容風格選擇
- 個人化妝容推薦
- Step-by-step 妝教
- 產品推薦
- 拍攝 / 出片指導
- 收藏與個人頁面

## 如何在電腦上打開

最簡單：直接雙擊 `index.html`。

或使用 VS Code 的 Live Server。

## 上傳 GitHub

1. 在 GitHub 建立新的 repository，例如 `glowly-web`
2. 將本資料夾的所有檔案上傳
3. 到 Repository → Settings → Pages
4. Source 選擇 `Deploy from a branch`
5. Branch 選 `main` / root
6. 儲存後，GitHub Pages 會產生公開網址

## 專案結構

```
glowly-web/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 目前 AI 是真的嗎？

目前不是。這是前端 Demo，自拍分析結果是模擬資料。

之後可再串接：
- OpenAI Vision API / 其他影像分析 API
- Supabase / Firebase 登入與資料庫
- 真實品牌商品資料
- 影片生成或剪輯 API

## 建議下一步

先把 GitHub Pages Demo 做到能順暢展示，再開始接後端與 AI。
