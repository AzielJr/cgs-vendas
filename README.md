# Sistema de Vendas CGS - React/Next.js

Sistema de vendas para títulos de sorteio desenvolvido em React/Next.js com TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### 📱 Telas Principais

1. **Login**
   - Autenticação de vendedores
   - Interface moderna e responsiva

2. **Dashboard**
   - Menu principal com 4 opções
   - Design clean e intuitivo

3. **Vender Título**
   - Leitura de código de barras
   - Cadastro de dados do cliente
   - Confirmação de venda
   - Envio automático de WhatsApp

4. **Consultar Título**
   - Busca por extração e número
   - Verificação de status (vendido/disponível/reservado)
   - Informações detalhadas da venda

5. **Minhas Vendas**
   - Relatórios por período ou extração
   - Resumo de vendas e valores
   - Geração de QR Code PIX para prestação de contas

6. **Consultar/Cadastrar Cliente**
   - Busca por CPF
   - Cadastro completo de clientes
   - Edição de dados existentes
   - Busca automática de CEP

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React QR Code** - Geração de QR Codes
- **React Icons** - Ícones adicionais

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd cgs-vendas
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🎨 Design

- **Totalmente responsivo** - Funciona em desktop, tablet e mobile
- **Interface moderna** - Design clean e elegante
- **UX otimizada** - Fluxos intuitivos e eficientes
- **Cores consistentes** - Paleta harmoniosa

## 🔐 Autenticação

Para testar o sistema, use qualquer usuário e senha na tela de login.

## 📱 Funcionalidades Mobile

- Interface totalmente responsiva
- Otimizada para uso em smartphones
- Navegação touch-friendly
- Formulários adaptados para mobile

## 🔄 Integração Futura

O sistema está preparado para integração com:
- API Spring Boot
- Banco de dados
- Sistema de WhatsApp
- Gateway de pagamento PIX
- Leitor de código de barras

## 📋 Estrutura do Projeto

```
src/
├── app/
│   ├── login/           # Tela de login
│   ├── dashboard/       # Menu principal
│   ├── vender-titulo/   # Venda de títulos
│   ├── consultar-titulo/# Consulta de títulos
│   ├── minhas-vendas/   # Relatórios de vendas
│   ├── clientes/        # Gestão de clientes
│   └── page.tsx         # Página inicial (redirect)
└── public/
    └── logo-empresa.png # Logo da empresa
```

## 🎯 Próximos Passos

1. Integração com API Spring Boot
2. Implementação de autenticação real
3. Conexão com banco de dados
4. Integração com WhatsApp Business API
5. Implementação de leitor de código de barras
6. Gateway de pagamento PIX

---

**Desenvolvido para demonstração ao cliente** 🚀
