# Fairy Tail Art Guild

Aplicativo feito para minha amada esposa, desenvolvido em React Native, Expo e TypeScript para gerenciar uma guilda mágica em formato de app, com sistema de sorteio de grupos, rankings, premiações, banimentos e backup local em JSON. O projeto possui uma interface inspirada em fantasia, utilizando cards translúcidos, brilho neon e persistência offline com AsyncStorage, facilitando campeonatos e disputas da guilda de forma prática e organizada.

## Visao geral

O app hoje concentra quatro areas principais:

- `Sorteador`: cria grupos sem repetir participantes ate fechar o ciclo atual
- `Ranking`: gerencia collabs, colaboradores e participacoes com rank automatico
- `Awards`: cadastra awards e registra motivos por colaborador
- `Banimento`: controla inatividade, historico, busca e reativacao

No topo da tela existem tres acoes globais:

- `Exportar`: gera um arquivo JSON de backup e abre o compartilhamento nativo
- `Importar`: restaura um backup a partir de um arquivo JSON selecionado no dispositivo
- `Exibir ranks`: abre ou fecha a tabela visual de ranks

## Estilo da app

A interface atual segue uma direcao visual bem definida:

- wallpaper ilustrado com sobreposicao escura
- cards com efeito glassmorphism via `expo-blur`
- paleta com violeta, rosa neon, azul e dourado
- banner superior contextual por aba
- barra inferior customizada com icones simbolicos

Referencias centrais dessa identidade:

- [utils/theme.ts](utils/theme.ts)
- [components/MagicalBackground.tsx](components/MagicalBackground.tsx)
- [components/GlassCard.tsx](components/GlassCard.tsx)
- [components/HeaderBanner.tsx](components/HeaderBanner.tsx)

## Funcionalidades atuais

### Sorteador

- um participante por linha
- remove linhas vazias, espacos extras e duplicados ignorando maiusculas/minusculas
- sorteia grupos conforme o modo selecionado
- evita repeticao ate acabar a lista restante
- permite copiar e compartilhar o resultado textual
- salva o estado do sorteio localmente

### Ranking

- CRUD de `colabs`
- CRUD de `collaborators`
- exclusao de collabs e colaboradores com confirmacao
- ativacao e desativacao de collabs
- controle de participacao por colaborador em cada collab
- rank calculado automaticamente por numero de participacoes
- lista e tabela visual exibem apenas colaboradores ativos
- tabela visual agrupada por rank e ordenada por participacao

### Awards

- CRUD de awards
- vinculo entre award e colaborador
- multiplos motivos por vinculo, um por linha
- edicao e remocao de vinculos existentes

### Banimento

- desativacao de colaboradores ativos
- registro de motivo opcional
- historico de inatividade
- busca por nome
- reativacao de colaboradores

### Backup

- exporta `lotteryState` e `guildData` em um arquivo JSON
- importa backup a partir de um arquivo JSON selecionado com o seletor de documentos do dispositivo
- aceita restauracao parcial de `lotteryState` e/ou `guildData`
- nao usa a area de transferencia para importacao/exportacao de backup

Formato:

```json
{
  "exportedAt": "2026-05-05T00:00:00.000Z",
  "lotteryState": {},
  "guildData": {}
}
```

## Regras de ranking

- `E`: 0 collabs
- `D`: 1 collab
- `C`: 2 a 3 collabs
- `B`: 4 a 6 collabs
- `A`: 7 a 9 collabs
- `S`: 10 ou mais collabs

Implementacao em [utils/ranking.ts](utils/ranking.ts).

## Estrutura

```text
assets/
components/
hooks/
screens/
storage/
tests/
utils/
App.tsx
app.json
eas.json
package.json
```

Arquivos mais importantes:

- [screens/HomeScreen.tsx](screens/HomeScreen.tsx): tela principal e navegacao por abas
- [hooks/useFairyTailDraw.ts](hooks/useFairyTailDraw.ts): regras do sorteador
- [hooks/useGuildData.ts](hooks/useGuildData.ts): estado da guilda, awards, ranking, backup e banimento
- [storage/lotteryStorage.ts](storage/lotteryStorage.ts): persistencia local
- [utils/types.ts](utils/types.ts): contratos centrais

## Rodar localmente

Instalacao:

```bash
npm install
```

Desenvolvimento:

```bash
npx expo start
```

O projeto define `EXPO_UNSTABLE_HEADLESS=1` em [.env](.env) e nos scripts de desenvolvimento para impedir que o React Native tente iniciar o shell standalone do DevTools. Em alguns ambientes Linux esse shell falha por bibliotecas nativas ausentes, como `libnspr4.so`, mesmo com o Metro funcionando normalmente.

Scripts disponiveis:

```bash
npm run start
npm run start:clear
npm run start:tunnel
npm run start:lan
npm run android
npm run ios
npm run web
npm run lint
npm run doctor
npm test
```

## Testes

A suite atual cobre:

- regras do sorteador
- geracao, nome de arquivo, serializacao e validacao de backup
- calculo, ordenacao e filtro de inativos no ranking

Execucao:

```bash
npm test
```

Status verificado neste workspace: `npm test` passando.

## Rodar no celular

### Usando WSL2

Em WSL2, prefira tunnel:

```bash
npm run start:wsl
```

O WSL2 roda em uma rede virtual propria. Por isso, `npx expo start` ou `npm run start:lan` podem mostrar um IP interno do Linux que o celular nao consegue acessar pela Wi-Fi.

Se quiser usar LAN mesmo assim:

1. Descubra o IPv4 do Windows com `ipconfig` no PowerShell.
2. Rode no WSL substituindo pelo IP do Windows:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.10 npm run start:lan
```

3. Garanta que celular e Windows estejam na mesma rede, sem VPN, e que o firewall permita conexoes para Node/Expo.

Se o app ficar preso no loading do Expo Go:

1. Limpe o cache:

```bash
npm run start:clear
```

2. Se continuar falhando, use tunel:

```bash
npm run start:tunnel
```

3. Confira estes pontos:

- celular e computador na mesma rede ao usar `start` ou `start:lan`
- `Expo Go` atualizado
- nenhuma VPN ativa no celular ou no computador
- firewall nao bloqueando Node ou Expo

4. Se houver suspeita de incompatibilidade:

```bash
npm run doctor
```

Observacao: o projeto usa `Expo SDK 55`.

## Build Android

Instale a CLI do EAS:

```bash
npm install -g eas-cli
```

Login:

```bash
eas login
```

Se precisar religar ou criar o projeto EAS:

```bash
eas project:init --force
```

Build APK:

```bash
eas build -p android --profile preview-apk
```

Build de producao:

```bash
eas build -p android --profile production
```

## Dependencias principais

- `expo`
- `react`
- `react-native`
- `@react-native-async-storage/async-storage`
- `expo-blur`
- `expo-clipboard`
- `expo-document-picker`
- `expo-file-system`
- `expo-haptics`
- `expo-linear-gradient`
- `expo-sharing`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
