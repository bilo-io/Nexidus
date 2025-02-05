# Nexidus

## Monorepo

### APIs

| **Name**                        | **Description**                                                                                    | **Stack**           |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------- |
| **[gateway](src/api/gateway)** | Routes requests to appropriate services, acts as a single entry point for all client interactions. | TypeScript, Express |

### Services

| **Name**                                      | **Description**                                                                                           | **Stack**                               |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **[user](src/services/user)**                 | Manages user profiles, settings, and preferences.                                                         | TypeScript, Express, MongoDB            |
| **[auth](src/services/auth)**                 | Handles authentication (JWT, OAuth2) and authorization (role-based access control).                       | TypeScript, Express, JWT, Passport      |
| **[transaction](src/services/transaction)**   | Manages financial transactions, including CRUD operations, categorization, and reconciliation.            | TypeScript, Express, PostgreSQL         |
| **[analytics](src/services/analytics)**       | Generates financial reports, insights, and trends based on transaction data.                              | TypeScript, Express, Data Science Tools |
| **[notification](src/services/notification)** | Sends notifications (email, SMS, push) to users for alerts and reminders related to financial activities. | TypeScript, Express, Nodemailer, Twilio |
| **[rates](src/services/rates)**               | Fetches live fiat and crypto rates, as well as historical data for charts and analysis.                   | TypeScript, Express, Axios, Redis       |

### Frontends

| **Name**                                                   | **Description**                                                                             | **Stack**                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------- |
| **[flows](src/frontends/frontend-flows)**         | React application for embedding in client web apps & mobile apps (React Native) via iframe. | TypeScript, React, Redux, TailwindCSS |
| **[dashboard](src/frontends/frontend-dashboard)** | Client-facing React application for managing financial data and settings.                   | TypeScript, React, Redux, TailwindCSS |
| **[admin](src/frontends/frontend-admin)**         | Admin panel for managing all clients, users, and settings.                                  | TypeScript, React, Redux, TailwindCSS |

### Shared

| **Name**                                | **Description**                                                                                       | **Stack**                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------ |
| **[core-ui](src/shared/core-ui)**       | A component library containing reusable UI components for consistent design across the app.           | TypeScript, React, TailwindCSS |
| **[core-types](src/shared/core-utils)** | Shared code for interfaces, types, and utility functions used across multiple services and frontends. | TypeScript                     |

## Nexidus meaning

"Nexidus" is a strong and meaningful name for a fintech company or service, and it can be justified as follows:

### Connection and Gateway

Derived from `"Nexus,"` meaning a central hub or connection point, Nexidus evokes the idea of a platform that bridges disparate elements—fiat, crypto, and payment gateways. It symbolizes unification and interconnectivity, critical in fintech solutions.
Dynamic and Innovative

The suffix `“-dus”` suggests movement, progression, or purpose, hinting at a service that not only connects but also drives financial transactions and configurations forward. It communicates innovation and forward-thinking.
Global and Timeless Appeal

The name has a sophisticated, slightly Greek/Latin-inspired tone, giving it a timeless, global, and trustworthy vibe that resonates with financial markets.
Brandable and Memorable

Short, sleek, and easy to pronounce, Nexidus stands out while remaining professional and modern. Its structure lends itself well to logo design and domain availability, critical for branding.
Symbol of Empowerment

By being a central point for clients to manage payment methods, gateways, and dashboards, Nexidus represents empowerment for businesses, making it clear that the service is a pillar of financial connectivity and control.


## System Monitoring

| Tool                                                | Pros                                                         | Cons                                                   | Install Command                                             | Run Command |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------- | ----------- |
| **[htop](https://htop.dev/)**                       | Simple, lightweight, process management, color-coded display | Less modern, basic UI                                  | `sudo apt install htop` (Debian), `brew install htop` (Mac) | `htop`      |
| **[glances](https://nicolargo.github.io/glances/)** | Comprehensive overview, remote monitoring, customizable      | Can be overwhelming, requires more dependencies        | `sudo apt install glances`, `pip install glances`           | `glances`   |
| **[btop](https://github.com/aristocratos/btop)**    | Modern, graphical UI, customizable, interactive              | More system resource-intensive, overkill for basic use | `sudo apt install btop`, `brew install btop`                | `btop`      |
| **[vtop](https://github.com/MrRio/vtop)**           | Interactive, visually appealing, built with Node.js          | Limited to CPU/memory, requires Node.js/npm            | `npm install -g vtop`                                       | `vtop`      |
| **[ncdu](https://dev.yorhel.nl/ncdu)**              | Lightweight, disk usage analysis, navigable                  | Limited to disk usage, no monitoring of CPU/memory     | `sudo apt install ncdu`                                     | `ncdu`      |

