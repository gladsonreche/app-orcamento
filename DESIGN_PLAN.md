# PhotoQuote AI - Plano de Redesign Completo

## Status: PROPOSTA PARA APROVACAO

---

## DIAGNOSTICO: O QUE ESTA ERRADO HOJE

### Problemas Criticos
1. **HomeScreen quebrada** - importa componentes (`Card`, `Avatar`, `Badge`) que nao existem
2. **Pasta `/src/theme/` vazia** - sistema de design foi iniciado e abandonado
3. **Nenhum componente UI reutilizavel** - tudo construido com primitivas do React Native

### Problemas Graves
4. **Icones emoji na navegacao** - `house`, `clipboard`, `money`, `people` sao emojis em texto, nao icones reais
5. **Cores hardcoded** - `#1a73e8` aparece 50+ vezes espalhado por 13 arquivos
6. **Sem design tokens** - cores, espacamentos, tipografia sao numeros magicos
7. **Headers inconsistentes** - cada tela tem um estilo diferente de header
8. **Sem acessibilidade** - nenhum label, role ou hint

### Problemas Medios
9. **Sem estados de foco/press** nos botoes (ripple, scale, feedback)
10. **Zero animacoes** - telas parecem estaticas, sem vida
11. **Badges de status duplicados** - mesmas cores definidas em 4+ arquivos
12. **Espacamento inconsistente** - padding/margin varia entre telas
13. **Form inputs genericos** - sem estados de foco, erro ou sucesso
14. **Cards sem hierarquia** - todos iguais, sem destaque visual

### Problemas Menores
15. **Fonte do sistema** - sem fonte customizada (usa SF Pro/Roboto padrao)
16. **Loading generico** - spinner padrao sem personalidade
17. **Empty states fracos** - apenas emoji + texto

---

## REFERENCIA: O QUE O GUIMO FAZ BEM

O app Guimo tem um design system completo e bem executado:

- **Tokens centralizados** em `src/theme/tokens.ts` (cores, tipografia, espacamento, sombras, raios)
- **Componentes reutilizaveis**: `Button`, `Card`, `IconButton`, `SearchInput`, `Avatar`, `Tag`, `ProgressBar`
- **Icones Lucide** consistentes em todo o app (24px, cores do tema)
- **Escala de espacamento** baseada em 4px (xs=4, sm=8, md=12, lg=16, xl=20...)
- **Sombras em 3 niveis** (sm, md, lg) com ajuste para dark mode
- **Micro-interacoes**: scale 98% no press, haptic feedback
- **Header azul** com cards sobrepostos (overlap com margin negativo)
- **Border radius generosos** (20px para cards, 12px para botoes)
- **Hierarquia tipografica clara** (xs=12px ate 5xl=48px)

---

## PLANO DE REDESIGN

### PALETA DE CORES - Tema "Construction Pro" (Light Only)

Inspirado no Guimo mas com identidade propria para construcao:

```
CORES PRIMARIAS
- primary:        #1B5E20   (verde escuro construcao - cor principal)
- primaryLight:   #E8F5E9   (verde claro para backgrounds)
- primaryHover:   #2E7D32   (verde hover/press)
- accent:         #FF6F00   (laranja obra - CTA secundario, destaques)
- accentLight:    #FFF3E0   (laranja claro para backgrounds)

CORES DE TEXTO
- textPrimary:    #1F2937   (cinza escuro principal)
- textSecondary:  #6B7280   (cinza medio)
- textTertiary:   #9CA3AF   (cinza claro)
- textOnPrimary:  #FFFFFF   (branco sobre primary)

BACKGROUNDS
- bgPrimary:      #FFFFFF   (branco principal)
- bgSecondary:    #F9FAFB   (cinza muito claro)
- bgTertiary:     #F3F4F6   (cinza claro)

STATUS
- success:        #059669   (verde - aprovado, pago)
- successBg:      #D1FAE5
- warning:        #D97706   (amarelo/amber - pendente)
- warningBg:      #FEF3C7
- error:          #DC2626   (vermelho - rejeitado, vencido)
- errorBg:        #FEE2E2
- info:           #0284C7   (azul - em andamento)
- infoBg:         #E0F2FE

UTILIDADES
- border:         #E5E7EB   (borda padrao)
- divider:        #F3F4F6   (divisor sutil)
- shadow:         rgba(0,0,0,0.08)
```

**Por que verde + laranja?**
- Verde escuro = profissionalismo, construcao, crescimento, confianca
- Laranja = energia, obra, acao, destaque
- Combinacao classica de apps de construcao (BuilderTrend, Procore usam paletas similares)
- Diferencia do azul generico que temos hoje

### TIPOGRAFIA

```
FONTE: Inter (Google Fonts - gratuita, moderna, legivel)

ESCALA:
- xs:     12px  / lineHeight: 16px
- sm:     13px  / lineHeight: 18px
- base:   15px  / lineHeight: 22px
- md:     16px  / lineHeight: 24px
- lg:     18px  / lineHeight: 26px
- xl:     20px  / lineHeight: 28px
- 2xl:    24px  / lineHeight: 32px
- 3xl:    28px  / lineHeight: 36px
- 4xl:    34px  / lineHeight: 42px

PESOS:
- regular:   400  (corpo de texto)
- medium:    500  (labels, subtitulos)
- semibold:  600  (titulos de secao, emphasis)
- bold:      700  (titulos principais, numeros grandes)
```

### ESPACAMENTO (base 4px)

```
xs:   4px    (gaps minimos)
sm:   8px    (gaps internos)
md:   12px   (padding botoes, gaps medios)
lg:   16px   (padding cards, margem horizontal tela)
xl:   20px   (secoes)
2xl:  24px   (separacao entre secoes)
3xl:  32px   (espacamento grande)
4xl:  40px   (header overlap)
5xl:  48px   (hero spacing)
```

### BORDER RADIUS

```
sm:   6px    (tags, badges)
md:   10px   (inputs, botoes pequenos)
lg:   14px   (botoes, icon buttons)
xl:   18px   (cards)
2xl:  24px   (cards grandes, modals)
full: 9999px (circulos, pills)
```

### SOMBRAS

```
sm:   { offset: {x:0, y:1}, opacity: 0.05, radius: 3, elevation: 1 }
md:   { offset: {x:0, y:2}, opacity: 0.08, radius: 8, elevation: 3 }
lg:   { offset: {x:0, y:4}, opacity: 0.12, radius: 16, elevation: 6 }
```

### ICONES

**Biblioteca:** Lucide React Native (ja instalado, mas so usado na HomeScreen)
- Expandir uso para TODAS as telas
- Remover TODOS os emojis
- Tamanho padrao: 20-24px
- Cor: herda do tema

**Mapeamento de icones:**

| Antes (Emoji) | Depois (Lucide) | Uso |
|---|---|---|
| `house` emoji | `Home` | Tab Home |
| `clipboard` emoji | `FileText` | Tab Estimates |
| `money` emoji | `Receipt` | Tab Invoices |
| `people` emoji | `Users` | Tab Clients |
| `gear` emoji | `Settings` | Settings |
| `camera` emoji | `Camera` | Upload fotos |
| `search` emoji | `Search` | Busca |
| `plus` emoji | `Plus` | Criar novo |
| `check` emoji | `CheckCircle` | Status aprovado |
| `x` emoji | `XCircle` | Status cancelado |
| `clock` emoji | `Clock` | Status pendente |
| `building` emoji | `Building2` | Projeto/propriedade |
| `phone` emoji | `Phone` | Ligar cliente |
| `mail` emoji | `Mail` | Email cliente |
| `dollar` emoji | `DollarSign` | Valores/receita |
| `folder` emoji | `FolderOpen` | Projetos |
| `edit` emoji | `Pencil` | Editar |
| `trash` emoji | `Trash2` | Deletar |
| `share` emoji | `Share2` | Compartilhar |
| `download` emoji | `Download` | Baixar PDF |

---

## COMPONENTES UI A CRIAR

### 1. `src/theme/tokens.ts` - Design Tokens
Todas as cores, tipografia, espacamento, sombras, raios centralizados.

### 2. `src/theme/index.ts` - Theme Provider
Export de `useTheme()` hook para acessar tokens.

### 3. `src/components/ui/Button.tsx`
- Variantes: `primary`, `secondary`, `outline`, `ghost`, `destructive`
- Tamanhos: `sm`, `md`, `lg`
- Estados: default, pressed (scale 0.98 + cor escurecida), disabled (opacity 0.5)
- Haptic feedback no press
- Suporte a icone (esquerda ou direita)
- Min height 44px (acessibilidade)

### 4. `src/components/ui/Card.tsx`
- Variantes: `default`, `elevated`, `outlined`
- Pressable com feedback visual
- Padding lg (16px) padrao
- Border radius xl (18px)
- Sombra md

### 5. `src/components/ui/Input.tsx`
- Estados: default, focused (borda primary), error (borda error), disabled
- Label flutuante ou acima
- Helper text / Error message
- Icone esquerda/direita opcional
- Height 48px

### 6. `src/components/ui/Badge.tsx`
- Variantes baseadas em status: `success`, `warning`, `error`, `info`, `default`
- Icone + texto
- Border radius sm (6px)
- Font xs (12px) semibold

### 7. `src/components/ui/Avatar.tsx`
- Iniciais coloridas (hash do nome -> cor do array)
- Tamanhos: `sm` (32px), `md` (40px), `lg` (48px)
- Circular (border-radius full)
- Background semi-transparente, texto solid

### 8. `src/components/ui/IconButton.tsx`
- Quadrado com cantos arredondados (lg = 14px)
- Tamanho: 44px default
- Press state com darkened background

### 9. `src/components/ui/SearchInput.tsx`
- Icone Search a esquerda
- Botao X para limpar
- Border radius lg (14px)
- Min height 48px

### 10. `src/components/ui/Divider.tsx`
- Linha horizontal sutil (0.5px)
- Cor: border token
- Margem vertical configuravel

### 11. `src/components/ui/EmptyState.tsx`
- Icone grande (48px) no centro
- Titulo + descricao
- Botao de acao opcional
- Visual bonito e amigavel

### 12. `src/components/ui/ScreenHeader.tsx`
- Header padronizado para todas as telas
- Titulo centralizado ou a esquerda
- Botao voltar (ChevronLeft)
- Acoes a direita (array de IconButton)
- Safe area top automatico

### 13. `src/components/ui/StatCard.tsx`
- Card com icone + label + valor
- Borda esquerda colorida (accent lateral 3px)
- Variantes de cor por tipo de stat
- Trend indicator opcional (seta + porcentagem)

### 14. `src/components/ui/StatusBadge.tsx`
- Especializado para status do app (Draft, Sent, Approved, etc.)
- Mapeamento unico de cores (source of truth)
- Icone + texto em cada badge

---

## REDESIGN POR TELA

### Tela 1: LoginScreen / SignUpScreen
**Antes:** Fundo branco, emoji como logo, inputs genericos
**Depois:**
- Header com fundo verde primary (#1B5E20) ocupando 35% superior da tela
- Logo do app (icone Building2 + "PhotoQuote AI") em branco sobre verde
- Card branco com border-radius 2xl sobrepondo o header (overlap -40px)
- Inputs com componente Input (estados focus/error)
- Botao primary verde com feedback haptico
- Link "Esqueci senha" e "Criar conta" em textSecondary
- Animacao suave de entrada (fade + slide up)

### Tela 2: Dashboard (Home)
**Antes:** Header branco generico, stat cards com borda lateral, emojis
**Depois:**
- Header verde primary com saudacao ("Bom dia, Rodrigo") em branco bold
- Subtitulo com data atual em branco/80% opacity
- Icone de notificacao (Bell) com dot vermelho
- 4 StatCards em grid 2x2 com overlap negativo (-40px) sobre o header
  - Clientes (Users icon, verde)
  - Projetos (FolderOpen icon, azul)
  - Orcamentos (FileText icon, laranja accent)
  - Receita (DollarSign icon, roxo)
- Secao "Acoes Rapidas" - 3 botoes horizontais com icones Lucide
  - Novo Projeto (Plus + FolderOpen)
  - Novo Cliente (Plus + Users)
  - Novo Orcamento (Plus + FileText)
- Secao "Projetos Recentes" - Cards com Building2 icon, badge de status, ChevronRight
- Secao "Ultimos Orcamentos" - Cards com valor destaque, badge status colorido

### Tela 3: EstimatesListScreen
**Antes:** Cards brancos simples com badge texto
**Depois:**
- ScreenHeader padronizado com titulo "Orcamentos"
- SearchInput no topo com icone Search
- Filtros horizontais em chips/pills (Todos, Rascunho, Enviado, Aprovado)
- Cards com:
  - Borda esquerda colorida por status (3px)
  - Icone FileText + nome do projeto (semibold)
  - Nome do cliente (textSecondary)
  - Valor em destaque (bold, grande)
  - StatusBadge com icone
  - Data formatada
  - ChevronRight para indicar navegacao

### Tela 4: InvoicesListScreen
**Antes:** Similar a estimates, design duplicado
**Depois:**
- Mesmo padrao de EstimatesListScreen (consistencia!)
- StatusBadge adaptado para status de invoice (Unpaid, Paid, Overdue)
- Card com icone Receipt

### Tela 5: ClientsScreen
**Antes:** Busca com emoji, avatar circulo azul fixo
**Depois:**
- ScreenHeader + SearchInput
- Avatar com cor dinamica (hash do nome)
- Cards com:
  - Avatar (iniciais)
  - Nome (semibold) + telefone/email (textSecondary)
  - Chip com contagem de projetos
  - Botoes de acao rapida (Phone, Mail, MessageSquare)
  - ChevronRight

### Tela 6: AddClientScreen
**Antes:** Form generico, inputs sem estado
**Depois:**
- ScreenHeader com botao voltar + titulo "Novo Cliente"
- Componentes Input com:
  - Labels acima do campo
  - Icone a esquerda (User, Phone, Mail, MapPin)
  - Estado focused (borda verde primary)
  - Estado error (borda vermelha + mensagem)
  - Placeholder em textTertiary
- Botao "Salvar" primary verde, full width, com icone CheckCircle
- Espacamento consistente (lg entre campos)

### Tela 7: NewProjectScreen
**Antes:** Formulario longo, modal de selecao generico
**Depois:**
- ScreenHeader com progresso (Step 1/3, 2/3, 3/3) com ProgressBar
- Dividir em 3 steps:
  - Step 1: Info basica (nome, cliente, endereco)
  - Step 2: Detalhes da propriedade (tipo, acesso, andar, elevador, parking)
  - Step 3: Notas e datas
- Selecoes com chips/pills ao inves de dropdown
- Modal de cliente com SearchInput + lista bonita
- Botao "Continuar" com icone ChevronRight

### Tela 8: PhotoUploadScreen
**Antes:** Grid de imagens basico, checkboxes de servico
**Depois:**
- ScreenHeader
- Grid de fotos com border-radius md (10px)
- Botao "Adicionar Fotos" com icone Camera, estilo dashed border
- Tags de servico como chips selecionaveis (toggle com cor primary)
- Preview de foto em modal com zoom
- Contador de fotos (ex: "8/30 fotos")
- Botao "Gerar Orcamento" primary verde, destaque

### Tela 9: EstimatePreviewScreen
**Antes:** Layout complexo mas generico
**Depois:**
- ScreenHeader com acoes (Edit, Share, Download)
- Card de resumo no topo:
  - Nome do projeto + cliente
  - StatusBadge
  - Data
- Cards por categoria de line items com collapse/expand
- Cada line item: descricao, qty, unit, price (layout tabela limpo)
- Card de totais com destaque:
  - Subtotal (textSecondary)
  - Tax (textSecondary)
  - Margin (textSecondary)
  - Divider
  - **Grand Total** (primary, bold, 2xl)
- Card de notas/exclusoes com background bgTertiary
- Barra de acoes fixa no bottom:
  - Botao "Editar" secondary
  - Botao "Compartilhar PDF" primary com icone Share2

### Tela 10: EstimateDetailScreen (Editor)
**Antes:** Lista editavel basica
**Depois:**
- ScreenHeader com "Editando Orcamento v1"
- Line items editaveis em Cards individuais
- Swipe para deletar (gesto)
- Botao flutuante "+" para adicionar item
- Totais atualizando em tempo real no bottom
- Botao "Salvar" primary

### Tela 11: CompanyProfileScreen
**Antes:** Formulario generico, botao logout
**Depois:**
- ScreenHeader "Perfil da Empresa"
- Card com preview do logo (avatar grande se sem logo)
- Botao "Alterar Logo" com icone Camera
- Secoes agrupadas em Cards:
  - Informacoes da Empresa (nome, telefone, email)
  - Configuracoes Padrao (taxa, margem, imposto)
  - Template PDF (termos)
- Card de acao perigosa: "Sair da Conta" em vermelho, com icone LogOut
- Card "Deletar Conta" em vermelho outline

### Tab Navigation
**Antes:** Emojis em texto
**Depois:**
- Icones Lucide (Home, FileText, Receipt, Users)
- 60px height + safe area bottom
- Ativo: cor primary (#1B5E20), icone preenchido
- Inativo: textTertiary (#9CA3AF)
- Label 11px, medium weight
- Background branco com border-top sutil (0.5px)

---

## ORDEM DE IMPLEMENTACAO

### Fase 1: Fundacao (Prioridade Maxima)
1. Criar `src/theme/tokens.ts` com todos os design tokens
2. Criar `src/theme/index.ts` com ThemeProvider e useTheme hook
3. Criar componentes base: `Button`, `Card`, `Input`, `Badge`, `Avatar`, `IconButton`
4. Criar `ScreenHeader`, `SearchInput`, `EmptyState`, `Divider`, `StatCard`, `StatusBadge`

### Fase 2: Navegacao + Auth
5. Redesenhar Tab Navigation (emojis -> Lucide icons)
6. Redesenhar LoginScreen
7. Redesenhar SignUpScreen

### Fase 3: Telas Principais
8. Redesenhar Dashboard/HomeScreen (unificar em uma so)
9. Redesenhar ClientsScreen
10. Redesenhar EstimatesListScreen
11. Redesenhar InvoicesListScreen

### Fase 4: Telas de Detalhe
12. Redesenhar AddClientScreen
13. Redesenhar NewProjectScreen (com steps)
14. Redesenhar PhotoUploadScreen
15. Redesenhar EstimatePreviewScreen
16. Redesenhar EstimateDetailScreen
17. Redesenhar InvoiceDetailScreen
18. Redesenhar CompanyProfileScreen

### Fase 5: Polish
19. Adicionar animacoes de transicao (fade/slide)
20. Adicionar micro-interacoes (scale press, haptic)
21. Instalar e configurar fonte Inter
22. Refinar empty states com ilustracoes
23. Testes de acessibilidade

---

## DEPENDENCIAS TECNICAS

### Ja instaladas (usar melhor):
- `lucide-react-native` - Expandir para todas as telas
- `react-native-reanimated` - Animacoes
- `react-native-gesture-handler` - Gestos (swipe to delete)

### A instalar:
- `expo-font` + `@expo-google-fonts/inter` - Fonte Inter
- `expo-haptics` - Feedback haptico nos botoes
- `expo-linear-gradient` - Gradientes no header (se necessario)

---

## ESTIMATIVA DE ARQUIVOS

| Item | Arquivos Novos | Arquivos Modificados |
|------|---------------|---------------------|
| Theme system | 2 | 0 |
| Componentes UI | 12 | 0 |
| Telas redesenhadas | 0 | 13 |
| Navegacao | 0 | 1 |
| **TOTAL** | **14** | **14** |

---

*Plano criado com base na analise do app de referencia Guimo e diagnostico completo do estado atual.*
