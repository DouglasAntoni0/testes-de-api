# 🚀 AutomateX: API Testing Framework

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/-typescript-%230074c1?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-github%20actions-%232671E5?style=for-the-badge&logo=githubactions&logoColor=white)

Um projeto robusto e moderno focado 100% na automação e garantia de qualidade de APIs (Backend). Construído com foco em arquitetura escalável e design patterns para automação.

## 🎯 Sobre o Projeto

Este repositório nasceu com o objetivo de criar uma infraestrutura de testes "production-ready", capaz de validar fluxos complexos de API de maneira rápida e determinística.

Em vez de focar em apenas uma ferramenta, implementei as mesmas validações utilizando os dois maiores frameworks do mercado de automação atual: **Cypress** e **Playwright**, ambos utilizando **TypeScript**.

A API alvo escolhida para este desafio de arquitetura foi a [Restful-booker](https://restful-booker.herokuapp.com/), uma API projetada especificamente para expor fluxos de CRUD completos, validação de tokens e manipulação de estado.

### Por que duas ferramentas?

Dominar apenas uma ferramenta limita a visão arquitetural. O Cypress se destaca na sua API chainable e no forte ecossistema de testes E2E, enquanto o Playwright oferece um `APIRequestContext` extremamente veloz, capaz de executar centenas de requisições independentes do browser em segundos.
Ter a capacidade de avaliar o "trade-off" entre as tecnologias é essencial para decisões técnicas em equipes de alta performance.

## 📐 Arquitetura & Padrões

- **TypeScript-First**: Tipagem estática em todos os arquivos para evitar erros em tempo de compilação, facilitando a manutenção e a integração em times maiores.
- **Encapsulamento**: Uso de Custom Commands (Cypress) e Abstração de Requisições (Playwright) para não poluir os arquivos de spec com lógicas de autenticação.
- **Isolamento de Estado**: Cada teste é projetado para rodar de forma independente, gerenciando seu próprio "setup" e "teardown".

## 🧪 Cobertura de Testes

Os testes implementados cobrem os seguintes fluxos (Happy Path e Validações de Estado):

- `POST /auth`: Autenticação e extração do Bearer Token.
- `GET /booking`: Recuperação de IDs de reserva com validação de tipagem de arrays.
- `POST /booking`: Validação de criação e conferência da persistência do payload.
- `GET /booking/:id`: Confirmação da criação lendo a entidade recém-criada.
- `PUT /booking/:id`: Validação de rotas protegidas (Requer Header de Auth/Cookie) e substituição completa de recursos.
- `PATCH /booking/:id`: Atualização parcial de recursos.
- `DELETE /booking/:id`: Exclusão e posterior confirmação do status code `404 Not Found`.

## ⚙️ Como Executar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn

### Instalação

Clone este repositório e instale as dependências:

```bash
git clone <seu-link-do-github-aqui>
cd testes-de-api
npm install
```

### Rodando via Cypress

Para rodar os testes de API via Cypress (Headless mode):

```bash
npm run test:cy
```

### Rodando via Playwright

Para rodar os testes de API no motor do Playwright:

```bash
npm run test:pw
```

## 🔄 Integração Contínua (CI/CD)

O projeto possui uma pipeline configurada no **GitHub Actions** (`.github/workflows/api-tests.yml`) que garante que todo código novo obedeça aos critérios de qualidade:

- Instala as dependências limpas.
- Executa os lintings e checagens estáticas de código.
- Roda as suites do Cypress e do Playwright em paralelo na nuvem.

---

_Desenvolvido com foco em Qualidade, Código Limpo e Engenharia de Software._
