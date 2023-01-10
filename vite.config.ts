import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: resolve(__dirname, 'src/components/AToRouterLink.vue'),
      name: 'v3AToRouterLink',
      // 適切な拡張子が追加されます
      fileName: 'v3-a-to-router-link',
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // ライブラリにバンドルされるべきではない依存関係を
      // 外部化するようにします
      external: ['vue', 'vue-router'],
      output: {
        // 外部化された依存関係のために UMD のビルドで使用する
        // グローバル変数を提供します
        globals: {
          vue: 'Vue',
          'vue-router': 'vue-router'
        },
      },
    },
  },
})
