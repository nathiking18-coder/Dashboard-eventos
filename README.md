# Dashboard de Eventos — Blue

Dashboard comercial que lê a aba **registro de ações comerciais** do Google Sheets e se atualiza sozinho a cada 10 minutos.

## Configuração (uma vez)

1. **Apps Script** — na planilha: *Extensões → Apps Script*, apague tudo e cole o conteúdo de [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
2. *Implantar → Nova implantação → App da Web* · Executar como: **Eu** · Quem pode acessar: **Qualquer pessoa**. Copie a URL que termina em `/exec`.
3. **URL no dashboard** — em `index.html`, preencha:
   ```js
   var SHEET_URL='https://script.google.com/macros/s/.../exec';
   ```
4. **Publicar** — no GitHub: *Settings → Pages → Source: Deploy from a branch*, escolha a branch e a pasta `/ (root)`. O link fica `https://<usuário>.github.io/Dashboard-eventos/`.

## Como funciona

- Ao abrir o link, o dashboard busca os dados na hora e repete a cada `REFRESH_MIN` minutos (padrão 10). Ao voltar para a aba do navegador depois desse tempo, atualiza imediatamente.
- As colunas são encontradas pelo **nome do cabeçalho** (Empreendimento, Imobiliária, Tipo, Evento, Data, Observações, Custo, Confirmados, Presentes, Propostas, Vendas, VGV, ROI). Se algum nome não for reconhecido, usa a posição antiga da coluna e registra um aviso no console do navegador.
- Se a planilha estiver fora do ar, o dashboard continua mostrando os últimos dados carregados.

> Qualquer pessoa com a URL do Apps Script ou do dashboard consegue ver os dados.

Se alterar o código do Apps Script, faça *Implantar → Gerenciar implantações → Editar → Nova versão* para a URL continuar a mesma.

---

# Pesquisa Heineken 0.0 (neuromarketing UFPR)

Link público em que o participante vê as campanhas, responde as perguntas e as respostas caem numa planilha do Google Sheets. O painel de resultados lê essa planilha.

- Pesquisa: `https://<usuário>.github.io/Dashboard-eventos/pesquisa-heineken/`
- Painel (com senha): `https://<usuário>.github.io/Dashboard-eventos/pesquisa-heineken/painel.html`
- Pré-teste: acrescente `?teste=1` ao link da pesquisa. Essas respostas recebem código `PT…` e ficam fora dos resultados por padrão.

## Configuração (uma vez)

1. Crie uma planilha nova no Google Sheets.
2. *Extensões → Apps Script*, apague tudo e cole [`apps-script/PesquisaHeineken.gs`](apps-script/PesquisaHeineken.gs). Troque `CHAVE_PAINEL` por uma senha sua.
3. *Implantar → Nova implantação → App da Web* · Executar como: **Eu** · Quem pode acessar: **Qualquer pessoa**. Copie a URL que termina em `/exec`.
4. Cole a URL em [`pesquisa-heineken/config.js`](pesquisa-heineken/config.js), na linha `var SCRIPT_URL = '';`.
5. GitHub Pages publicando a branch que contém a pasta `pesquisa-heineken/`.

As respostas entram na aba **respostas** da planilha (uma linha por participante). Perguntas, textos e tempos ficam em `config.js`.
