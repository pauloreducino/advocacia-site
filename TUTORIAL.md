# 📘 TUTORIAL — Deploy Completo

## Índice
1. [Rodar localmente](#1-rodar-localmente)
2. [Configurar WordPress + ACF](#2-configurar-wordpress--acf)
3. [Hospedar WordPress no Pantheon](#3-hospedar-wordpress-no-pantheon)
4. [Deploy Next.js na Vercel](#4-deploy-nextjs-na-vercel)
5. [Configurar webhook de revalidação](#5-configurar-webhook-de-revalidação)
6. [Publicar artigos no dia a dia](#6-publicar-artigos-no-dia-a-dia)
7. [Substituir a foto do advogado](#7-substituir-a-foto-do-advogado)
8. [Customizar paleta de cores](#8-customizar-paleta-de-cores)

---

## 1. Rodar localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

```bash
# Clone ou extraia o projeto
cd advocacia-site

# Instale as dependências
npm install

# Copie o arquivo de ambiente
cp .env.local.example .env.local

# Edite .env.local com seus dados
# (sem WordPress local, o site usa os artigos fallback automaticamente)

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**

> O site funciona 100% sem WordPress local — usa os artigos de `src/data/articles.ts` como fallback.

---

## 2. Configurar WordPress + ACF

### Instalar WordPress localmente (opcional para testes)
Use o **Local by Flywheel** (gratuito): https://localwp.com

1. Crie um novo site: `advocacia-local`
2. Anote a URL (ex: `http://advocacia-local.local`)

### Instalar plugins necessários
No painel WordPress (`/wp-admin`):

1. **Advanced Custom Fields (ACF)** — Plugins > Adicionar novo > ACF
2. **WP CORS** — para permitir requisições do Next.js

### Configurar ACF

Vá em **Custom Fields > Adicionar novo grupo**:

- **Nome do grupo:** Campos do Artigo
- **Localização:** Post Type = Post

Adicione os seguintes campos:

| Nome do campo    | Tipo      | Nome da variável  |
|------------------|-----------|-------------------|
| Tempo de leitura | Número    | `read_time`       |
| Categoria        | Texto     | `category_label`  |
| Slug categoria   | Texto     | `category_slug`   |
| Resumo/Excerpt   | Área texto| `excerpt`         |
| Tags             | Texto     | `tags`            |
| Destaque         | Verdadeiro/Falso | `featured` |

> **IMPORTANTE:** Em cada campo, vá em "Configurações do campo" e ative **"Show in REST API"**.

### Configurar CORS

No plugin WP CORS, adicione a origem do seu Next.js:
```
http://localhost:3000
https://seusite.adv.br
```

### Atualizar .env.local

```env
WORDPRESS_API_URL=http://advocacia-local.local/wp-json/wp/v2
```

---

## 3. Hospedar WordPress no Pantheon

O **Pantheon.io** oferece hospedagem WordPress gratuita com API REST disponível (sem bloqueio SSL).

### Criar conta
1. Acesse https://pantheon.io e crie conta gratuita
2. Crie um novo site: **WordPress**
3. Aguarde o provisionamento (~5 minutos)

### Configurar o site
1. Acesse o painel do Pantheon
2. Clique em **Visit Admin Dashboard**
3. Complete a instalação do WordPress
4. Instale os plugins ACF e WP CORS conforme seção anterior

### Obter a URL da API

A URL seguirá o padrão:
```
https://dev-NOME-DO-SITE.pantheonsite.io/wp-json/wp/v2
```

### Atualizar next.config.mjs

Adicione o domínio Pantheon às imagens permitidas:

```js
// next.config.mjs
remotePatterns: [
  {
    protocol: 'https',
    hostname: '**.pantheonsite.io',
  },
  // ... outros
]
```

### Atualizar .env.local (e Vercel)

```env
WORDPRESS_API_URL=https://dev-NOME-DO-SITE.pantheonsite.io/wp-json/wp/v2
```

---

## 4. Deploy Next.js na Vercel

### Criar conta
1. Acesse https://vercel.com e crie conta com GitHub/GitLab
2. Faça push do projeto para um repositório Git

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/advocacia-site.git
git push -u origin main
```

### Importar na Vercel
1. No painel Vercel: **New Project > Import Git Repository**
2. Selecione seu repositório
3. **Framework:** Next.js (detectado automaticamente)
4. Configure as **variáveis de ambiente**:

| Variável | Valor |
|---|---|
| `WORDPRESS_API_URL` | URL da API WordPress |
| `REVALIDATE_SECRET` | Chave aleatória segura |
| `NEXT_PUBLIC_SITE_URL` | https://seusite.adv.br |
| `NEXT_PUBLIC_WA_NUMBER` | 5511999999999 |
| `NEXT_PUBLIC_WA_MESSAGE` | Olá, gostaria de agendar uma consulta. |

5. Clique em **Deploy**

### Domínio personalizado
No painel Vercel: **Project > Settings > Domains**
Adicione seu domínio e siga as instruções DNS.

---

## 5. Configurar webhook de revalidação

O webhook garante que o site Next.js atualize automaticamente quando você publicar um artigo no WordPress.

### URL do webhook
```
https://seusite.adv.br/api/revalidate?secret=SUA_CHAVE_SECRETA
```

### Configurar no WordPress

**Opção 1 — Plugin WP Webhooks (recomendado):**
1. Instale o plugin **WP Webhooks**
2. Vá em WP Webhooks > Enviar Dados
3. Adicione um novo webhook:
   - **URL:** `https://seusite.adv.br/api/revalidate?secret=SUA_CHAVE`
   - **Gatilho:** Post publicado, Post atualizado

**Opção 2 — Código no functions.php:**
```php
function trigger_revalidation($post_id) {
    if (get_post_type($post_id) !== 'post') return;
    wp_remote_post('https://seusite.adv.br/api/revalidate?secret=SUA_CHAVE');
}
add_action('publish_post', 'trigger_revalidation');
add_action('post_updated', 'trigger_revalidation');
```

### Testar o webhook
Acesse no navegador (GET):
```
https://seusite.adv.br/api/revalidate?secret=SUA_CHAVE
```

Deve retornar: `{"revalidated":true,...}`

---

## 6. Publicar artigos no dia a dia

### Criar novo artigo
1. WordPress Admin > Posts > Adicionar novo
2. Escreva o conteúdo no editor Gutenberg
3. Adicione IDs nos headings H2/H3 para o sumário funcionar:
   - Clique no bloco H2
   - No painel direito: **Avançado > Âncora HTML**
   - Digite o ID (ex: `como-funciona`)
4. Preencha os campos ACF no painel direito:
   - `read_time`: tempo estimado de leitura (número)
   - `category_label`: nome da categoria (ex: "Direito Criminal")
   - `category_slug`: slug sem acento (ex: "direito-criminal")
   - `excerpt`: resumo de 1-2 frases
   - `tags`: palavras-chave separadas por vírgula
   - `featured`: marque se deve aparecer nos destaques do blog
5. Adicione imagem destacada
6. Publique — o webhook revalidará o site automaticamente

### Categorias disponíveis
- `direito-criminal` / Direito Criminal
- `direito-empresarial` / Direito Empresarial
- `direito-tributario` / Direito Tributário
- `direito-trabalhista` / Direito Trabalhista
- `direito-de-familia` / Direito de Família
- `direito-imobiliario` / Direito Imobiliário
- `noticias-juridicas` / Notícias Jurídicas

---

## 7. Substituir a foto do advogado

### Preparar a foto
- **Formato:** JPEG ou WebP
- **Proporção:** 3:4 (retrato) — ex: 600×800px
- **Fundo:** neutro escuro ou desfocado (escritório, estante de livros)
- **Qualidade:** alta resolução (mín. 600px de largura)

### Adicionar ao projeto
1. Coloque o arquivo em `public/foto-advogado.jpg`
2. Edite `src/components/home/Hero.tsx`:

```tsx
// Remova o div placeholder e substitua por:
<Image
  src="/foto-advogado.jpg"
  alt="Dr. Henrique Cavalcante, advogado"
  fill
  className="object-cover object-top"
  priority
/>
```

3. Edite `src/components/home/Sobre.tsx` de forma similar para a seção Sobre.

### Imagens de exemplo (Unsplash)
Para buscar imagens de placeholder profissionais:
- https://unsplash.com/s/photos/lawyer-portrait-dark
- https://unsplash.com/s/photos/attorney-office

---

## 8. Customizar paleta de cores

### Arquivo principal: `tailwind.config.ts`

```ts
colors: {
  primary: '#0B0F1A',      // Fundo principal — troque para outro escuro
  surface: '#111827',      // Fundo de cards
  deep: '#0A0E18',         // Fundo mais escuro (depoimentos)
  gold: '#C9A84C',         // Cor de destaque — o "dourado"
  'gold-light': '#E5C97A', // Versão mais clara do dourado
  ivory: '#F5F0E8',        // Texto principal
  muted: '#9A9A8A',        // Texto secundário
  slate: '#1E2D40',        // Fundo de placeholders
}
```

### Paletas por especialidade jurídica

**Criminal (padrão):**
```
primary: #0B0F1A | gold: #C9A84C
```

**Empresarial (mais azulado):**
```
primary: #0D1520 | gold: #B8A070
```

**Tributário (azul técnico):**
```
primary: #0A1520 | gold: #7AB0C9
```

**Família (roxo sutil):**
```
primary: #1A0F18 | gold: #C4A0C0
```

**Trabalhista (verde escuro):**
```
primary: #0F1A10 | gold: #9AB87A
```

### Também edite em `src/app/globals.css`:
```css
:root {
  --gold: #C9A84C;    /* mesmo valor do tailwind.config */
  --primary: #0B0F1A;
  /* ... */
}
```

---

## Suporte

Em caso de dúvidas ou erros de build, use o prompt complementar:

```
Este build na Vercel está dando erro. Analise o log abaixo e corrija
sem mudar nada do layout, cores ou funcionalidades existentes:

[cole o log aqui]
```
