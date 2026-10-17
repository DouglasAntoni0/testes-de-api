# AutomateX — testes de API com Cypress e Playwright

[![CI](https://github.com/DouglasAntoni0/testes-de-api/actions/workflows/api-tests.yml/badge.svg)](https://github.com/DouglasAntoni0/testes-de-api/actions/workflows/api-tests.yml)

Projeto de estudos com TypeScript sobre a API pública [Restful-booker](https://restful-booker.herokuapp.com/). Implementa o fluxo CRUD de reservas em Cypress e Playwright.

## Cobertura e ordem de execução

Cada framework possui seis cenários: listar IDs, criar reserva, consultar a reserva criada, substituir seus dados, atualizar parcialmente e excluir confirmando o retorno 404 na consulta seguinte. A autenticação em `POST /auth` ocorre no setup.

Os cenários de cada spec compartilham o ID criado pelo POST e devem executar na ordem do arquivo. No Playwright, o bloco usa `test.describe.serial`; uma falha interrompe os passos seguintes daquele grupo e uma repetição reinicia o grupo. A suíte não oferece isolamento de dados por teste. Execute o spec completo para reproduzir o fluxo.

As operações protegidas enviam o token pelo header `Cookie: token=...`. Não usam Authorization Bearer.

## Instalação

Use Node.js 22.13+ na linha 22 e npm. O ambiente público pode mudar seus dados e disponibilidade.

```bash
git clone https://github.com/DouglasAntoni0/testes-de-api.git
cd testes-de-api
npm ci
```

## Executar

```bash
npm run test:cy
npm run test:pw
```

Os comandos são separados para que o resultado de um framework não impeça a execução do outro. Playwright usa `APIRequestContext`; os testes deste projeto não precisam de navegador. Cypress utiliza seu próprio runner, baixado durante a instalação.

## Arquivos

| Caminho | Responsabilidade |
| --- | --- |
| `cypress/e2e/api/booking.cy.ts` | Fluxo CRUD Cypress |
| `cypress/support/commands.ts` | Obtenção do token |
| `playwright/tests/api/booking.spec.ts` | Fluxo CRUD serial Playwright |
| `cypress.config.ts`, `playwright.config.ts` | URL e configuração dos runners |
| `tsconfig.json` | Opções de TypeScript |

## CI e relatórios

O workflow `api-tests.yml` roda Cypress e Playwright em jobs separados, em push/pull request para `main`/`master` e pelo agendamento diário configurado. Instala com `npm ci` e envia o relatório HTML do Playwright, inclusive em falha, quando gerado, com retenção de trinta dias.

Os comandos `lint` e `format` existem no package.json, mas não fazem parte do workflow atual. O script `test` padrão continua sendo o placeholder; use os comandos específicos acima.

HTML local do Playwright: `playwright-report/index.html`. A configuração guarda trace na primeira repetição de CI. Cypress não está configurado para gravar vídeos ou screenshots nesta suíte.

## Limites e evolução

O fluxo possui dependência de ordem e a exclusão ocorre no último cenário. Uma interrupção antes dele pode deixar uma reserva no ambiente. Isolar setup/cleanup por cenário, ampliar casos negativos e incluir checagem estática no CI são melhorias futuras.
