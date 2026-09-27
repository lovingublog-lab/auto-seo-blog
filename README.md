# LovingU Journal

Astro 기반의 전문형 정적 블로그입니다.

## 주요 기능
- 반응형 전문 매거진 디자인
- Markdown 기반 글 관리
- canonical, Open Graph, robots meta
- Article / WebSite 구조화 데이터
- sitemap 자동 생성
- robots.txt
- GitHub Pages 자동 배포
- 공개 전 draft 제어

## 글 작성
새 글은 `src/content/blog/` 아래 Markdown 파일로 추가합니다. `draft: true`면 공개 빌드에서 제외됩니다.

## 배포
main 브랜치에 변경 사항이 올라오면 GitHub Actions가 사이트를 빌드하고 GitHub Pages로 배포합니다.
