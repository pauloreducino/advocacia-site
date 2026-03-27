# ⚖️ Advocacia Site — Dr. Henrique Cavalcante

Site profissional de advocacia criado com **Next.js 14**, **TypeScript**, **Tailwind CSS** e integração com **WordPress Headless CMS**.

## Stack

- **Next.js 14** (App Router + ISG)
- **TypeScript** (strict mode)
- **Tailwind CSS** com design tokens customizados
- **WordPress REST API** com fallback local
- **Vercel** (deploy recomendado)
- **Pantheon.io** (WordPress recomendado)

## Início rápido

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas informações

# 3. Rode em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Personalização principal

### Dados do advogado
Edite os textos em cada componente em `src/components/home/`. Os campos entre colchetes `[...]` devem ser substituídos pelos dados reais.

### Foto do profissional
Substitua o placeholder no Hero (`src/components/home/Hero.tsx`):
```tsx
// Antes (placeholder):
<div className="w-full h-full flex items-center justify-center">...</div>

// Depois (foto real):
<Image
  src="/foto-advogado.jpg"
  alt="Dr. Henrique Cavalcante"
  fill
  className="object-cover object-top"
/>
```

Coloque a foto em `public/foto-advogado.jpg` (formato 3:4, fundo neutro escuro).

### Cores
Edite `tailwind.config.ts` e `src/app/globals.css`:
```ts
colors: {
  gold: '#C9A84C',       // Cor de destaque principal
  primary: '#0B0F1A',    // Fundo escuro
  surface: '#111827',    // Superfície de cards
}
```

### OAB e dados de contato
Busque e substitua globalmente:
- `OAB/SP 123.456` → seu número OAB
- `(11) 99999-9999` → seu telefone
- `contato@escritorio.adv.br` → seu e-mail
- `Dr. Henrique Cavalcante` → seu nome
- `5511999999999` → seu WhatsApp (somente dígitos)

## Variáveis de ambiente

```env
WORDPRESS_API_URL=https://seuwordpress.com/wp-json/wp/v2
REVALIDATE_SECRET=chave_secreta_unica
NEXT_PUBLIC_SITE_URL=https://seusite.adv.br
NEXT_PUBLIC_WA_NUMBER=5511999999999
NEXT_PUBLIC_WA_MESSAGE=Olá, gostaria de agendar uma consulta.
```

## Deploy

Veja o **TUTORIAL.md** para instruções completas de deploy na Vercel + WordPress no Pantheon.

## Estrutura

```
src/
├── app/              # Rotas Next.js (App Router)
├── components/
│   ├── ui/           # Header, Footer, ClientWidgets
│   ├── home/         # Seções da landing page
│   └── blog/         # Componentes do blog
├── data/             # Artigos fallback
├── lib/              # WordPress API, utils
└── types/            # TypeScript types
```
