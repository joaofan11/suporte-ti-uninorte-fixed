# Suporte TI – UNINORTE

**Disciplina:** BACK-END FRAMEWORKS  
**Professor:** Prof. MSc. Ronilson Cavalcante da Silva  
**Instituição:** UNINORTE – Centro Universitário do Norte  
**Curso:** Engenharia da Computação – 4º período  
**Período:** 2025/2

## Objetivo
Instalar, configurar e aprimorar o sistema **Suporte TI – UNINORTE**, que simula uma central de atendimento técnico de TI.  
Execute localmente (VS Code + Laragon/MySQL ou XAMPP), entenda o funcionamento e aplique melhorias visuais e funcionais.

## Requisitos
- **Node.js** (LTS), **npm**
- **Laragon** (ou **XAMPP**) com **MySQL** ativo
- **VS Code**

## Primeiros Passos
1. Extraia o projeto para `C:\laragon\www\suporte-ti-uninorte` (ou para a pasta `htdocs` no XAMPP).
2. No VS Code, abra a pasta do projeto.
3. Instale dependências:
   ```bash
   npm install
   npm run dev
   ```
4. Acesse em: `http://localhost:3333`

## Login Inicial
- **E-mail:** admin@helpdesk.local  
- **Senha:** admin123

## Banco de Dados (padrão sugerido)
- **DB_NAME:** helpdesk_ti  
- **DB_USER:** aluno  
- **DB_PASS:** aluno123

Ajuste o arquivo `.env` se necessário (porta do MySQL etc.).

## Funcionalidades a Testar
- Criar chamados (prioridades: baixa, média, alta)
- Listar, buscar, alterar status (Aberto → Em andamento → Resolvido)
- Adicionar comentários nos chamados
- Gerar relatórios (abertos, em andamento, resolvidos)

## Personalização
Atualize cores e logotipo para **UNINORTE**. O cabeçalho recomendado:  
**“Central de Suporte Técnico – UNINORTE”**

## Scripts úteis
- `npm run dev` – inicia o servidor de desenvolvimento

---
Entregas via Google Classroom: PDF com prints e explicações + ZIP do código (ou link do GitHub).