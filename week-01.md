# Week 1: Getting Started

Welcome to the first week of your microinternship! This week focuses on setting up your development environment, initializing the project, and establishing the collaboration workflow we'll use throughout the program.

> **AI Tools Policy:** Using AI tools (ChatGPT, GitHub Copilot, Claude, etc.) is allowed and highly encouraged. However, you are expected to manually review and understand all work produced by LLMs before submitting it. You should be able to explain any code in your project.

## Program Schedule

- **Duration:** 8 weekly sessions
- **Meeting day:** Every Tuesday at 3:00 PM ET
- **Assignments:** Weekly assignments are stored in this repository (`week-01.md` through `week-08.md`). Each week's assignment must be submitted **no later than Monday evening** before the next session.

## Task Legend

- ✅ Required task — must be completed this week
- ☑️ Optional task — recommended but not required
- 🌟 Advanced task — attempt only after completing all required tasks

---

## 1. Setup Development Environment

- ✅ **Install a Code Editor:**
  Install [Visual Studio Code](https://code.visualstudio.com/) (recommended) or any code editor of your choice.

- ✅ **Install Node.js:**
  Download and install the latest LTS version of Node.js, which includes npm (the package manager you'll need for the project). [Node.js Download](https://nodejs.org/)

- ✅ **Install Git:**
  Git is essential for version control and collaboration. Follow the official installation guide for your operating system. [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- ☑️ **VSCode Extensions (if using VSCode):**
  These extensions will improve your development workflow:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — highlights code quality issues in real time
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) — shows Git blame, history, and other insights inline

## 2. Create Your GitHub Repository

- ✅ **Create a GitHub account** (if you don't have one): [github.com](https://github.com/)

- ✅ **Create a new repository** for your project. Name it something descriptive like `real-estate-map`. [How to create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)

- ✅ **Invite the project leader as a collaborator:**
  This is required so I can review your code and pull requests. Go to your repository → **Settings** → **Collaborators** → **Add people** → search for [`wwwaiser`](https://github.com/wwwaiser) and send the invitation.

  > **Important:** I will not be able to review your work until you complete this step. Please do this as soon as you create your repository.

## 3. Initialize the Project

- ✅ **Create a Next.js project:**
  Use the Next.js CLI to scaffold your application. Run the following command and follow the prompts:

  ```bash
  npx create-next-app@latest
  ```

  When prompted, accept the defaults (TypeScript, ESLint, App Router are all recommended). Make sure the project runs locally without errors by starting the dev server:

  ```bash
  npm run dev
  ```

  Learn more: [Next.js Getting Started](https://nextjs.org/docs/app/getting-started)

- ☑️ **Configure ESLint:**
  Next.js comes with ESLint pre-configured. Verify it works by running:

  ```bash
  npm run lint
  ```

  [ESLint Configuration Guide](https://eslint.org/docs/latest/use/getting-started)

## 4. Learn the Pull Request Workflow

All your work should follow this workflow — it mirrors how professional development teams operate:

1. Create a new branch for your changes (e.g., `week-01-setup`)
2. Make your changes and commit them
3. Push the branch to GitHub
4. Open a Pull Request (PR) and assign the project leader as a reviewer

- ✅ **Create your first Pull Request:**
  Push your initial Next.js project as a PR. [How to create a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

  > **Tip:** If you're new to Git branching, review this guide first: [Git Branching Basics](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

---

## Advanced Tasks

These are optional stretch goals for students who finish the required tasks early.

- 🌟 **Add Material-UI:**
  Integrate Material-UI into your project to access a library of pre-built React components (buttons, cards, grids, etc.). [Material-UI Installation](https://mui.com/material-ui/getting-started/installation/)

- 🌟 **Design a Basic Page Layout:**
  Using Material-UI, create a simple layout with a header, sidebar, and content area. This will give you a head start on the application structure we'll build in later weeks.

- 🌟 **Deploy on Vercel:**
  Deploy your project to the web using Vercel, which is built specifically for Next.js applications. This gives you a live URL to share. [Deploying Next.js on Vercel](https://nextjs.org/docs/app/getting-started/deploying)

