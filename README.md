# NovaVitrine — Protótipo de E-commerce

Protótipo navegável de uma loja virtual, desenvolvido para apresentação comercial a um cliente que possui loja física e deseja expandir para o digital. Marca, nome e identidade visual são temporários ("NovaVitrine"), usados apenas para fins de demonstração.

> ⚠️ **Este é um protótipo.** Não há backend real, não há cobrança real e nenhum dado sensível é coletado. Todos os produtos, clientes e pedidos são fictícios.

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- lucide-react (ícones)
- Persistência via `localStorage` (simula um backend)

## Como instalar

```bash
npm install
```

## Como executar

```bash
npm run dev       # ambiente de desenvolvimento
npm run build      # build de produção (inclui checagem de tipos)
npm run preview    # servir o build de produção localmente
npm run lint        # checagem de lint (oxlint)
```

## Rotas disponíveis

### Loja (storefront)

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial |
| `/produtos` | Catálogo com busca, filtro de preço, categoria e ordenação (`?q=`, `?categoria=`, `?promocao=1`, `?sort=`, `?min=`, `?max=`) |
| `/produto/:slug` | Página de detalhes do produto |
| `/favoritos` | Lista de produtos favoritados |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Checkout demonstrativo |
| `/checkout/sucesso/:orderId` | Confirmação do pedido |
| `/login`, `/cadastro`, `/recuperar-senha` | Autenticação simulada |
| `/conta`, `/conta/pedidos` | Área do cliente (requer login) |

### Administração

| Rota | Descrição |
| --- | --- |
| `/admin` | Dashboard com indicadores e gráfico de vendas |
| `/admin/produtos`, `/admin/produtos/novo`, `/admin/produtos/:id/editar` | Gestão de produtos |
| `/admin/pedidos`, `/admin/pedidos/:id` | Gestão de pedidos e alteração de status |
| `/admin/clientes` | Lista de clientes |
| `/admin/unidades` | Gestão demonstrativa de filiais/unidades |
| `/admin/configuracoes` | Dados comerciais da loja |

## Login de demonstração

- **E-mail:** `demo@novavitrine.com.br`
- **Senha:** `demo123`

Ou crie uma conta nova pela tela de cadastro.

## Funcionalidades implementadas

- Catálogo com 30 produtos fictícios em 6 categorias, busca, filtro por preço, ordenação e carregamento incremental.
- Carrinho com validação de estoque, persistência local e cálculo automático de totais.
- Checkout com identificação, escolha de entrega/retirada, seleção visual de pagamento (Pix/cartão) e tela de confirmação.
- Autenticação simulada (cadastro, login, recuperação de senha, área do cliente com histórico de pedidos).
- Painel administrativo com dashboard, CRUD de produtos, gestão de pedidos (mudança de status), lista de clientes, unidades (multi-loja) e configurações da loja — tudo persistido em `localStorage`.
- Favoritos, avaliações (estrelas), badges de promoção/mais vendido/novidade, estados vazios e de carregamento, feedback via notificações (toasts).
- Layout responsivo (mobile, tablet e desktop).

## Funcionalidades simuladas (não reais)

- **Autenticação:** não há backend; senhas não são validadas de forma segura nem armazenadas.
- **Pagamento:** nenhum gateway real é usado; Pix e cartão são apenas seleções visuais.
- **Pedidos:** gerados e armazenados localmente no navegador, sem envio real.
- **E-mails:** recuperação de senha e confirmações não enviam e-mails reais.
- **Estoque/preço:** alterado pelo admin apenas no navegador atual (não sincroniza entre dispositivos).

## Limitações do protótipo

- Dados persistem apenas no navegador utilizado (via `localStorage`); limpar os dados do site reinicia a demonstração.
- Sem multiusuário real, sem permissões de administrador, sem testes de carga.
- Imagens de produtos são ilustrativas, vindas de um serviço de imagens aleatórias (loremflickr.com).
- Sem suporte a múltiplos idiomas ou moedas.

## Próximos passos para produção

1. Implementar backend (ex.: ASP.NET Core ou outra API) e substituir a camada `src/services/*` (já isolada para essa troca).
2. Autenticação real (hash de senha, sessão/JWT, verificação de e-mail).
3. Integração com gateway de pagamento real (Pix e cartão) homologado.
4. Upload real de imagens de produtos.
5. Gestão de estoque por unidade/filial e relatórios por loja.
6. Painel administrativo com controle de acesso (login de administrador).
7. Testes automatizados de ponta a ponta e monitoramento de erros em produção.
