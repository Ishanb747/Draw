# Eraser Clone

A powerful, collaborative workspace designed for engineering teams to write, draw, and plan together. This project is a clone of [Eraser.io](https://eraser.io), featuring a seamless integration of a markdown-style document editor and an infinite whiteboard canvas.

## 🚀 Features

-   **Unified Workspace**: A split-screen interface combining a rich text editor and a whiteboard.
-   **Document Editor**: Built with [Editor.js](https://editorjs.io/), supporting headers, lists, images, and code blocks.
-   **Infinite Whiteboard**: Powered by [Tldraw](https://tldraw.com/), allowing for freeform drawing, diagramming, and wireframing.
-   **Secure Authentication**: User management and authentication handled by [Kinde Auth](https://kinde.com/).
-   **Real-time Database**: Fast and reactive backend powered by [Convex](https://convex.dev/).
-   **Team & File Management**: Create teams, manage projects, and organize files in a dashboard.
-   **Responsive Design**: Fully responsive UI built with [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/).
-   **Dark/Light Mode**: (Optional/If implemented) Support for different themes.

## 🛠️ Tech Stack

-   **Frontend Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Tailwind Merge](https://github.com/dcastil/tailwind-merge), [CLSx](https://github.com/lukeed/clsx)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons), [Sonner](https://sonner.emilkowal.ski/) (Toasts)
-   **Backend & Database**: [Convex](https://convex.dev/)
-   **Authentication**: [Kinde Auth](https://kinde.com/)
-   **Core Libraries**:
    -   `@editorjs/editorjs`: Block-styled editor.
    -   `@tldraw/tldraw`: Whiteboard canvas.
    -   `fabric`: (Dependency present, possibly used for other canvas features).

## 📂 Project Structure

```bash
eraser/
├── app/                  # Next.js App Router pages and layouts
│   ├── dashboard/        # Dashboard routes (file list, teams)
│   ├── workspace/        # Workspace routes (editor + whiteboard)
│   ├── api/              # API routes (Kinde auth)
│   └── page.tsx          # Landing page
├── convex/               # Convex backend functions
│   ├── files.tsx         # File management mutations/queries
│   ├── user.tsx          # User management mutations/queries
│   └── teams.tsx         # Team management mutations/queries
├── components/           # Reusable UI components
├── public/               # Static assets
└── ...config files       # Tailwind, TypeScript, Next.js configs
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd eraser
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add the following variables. You will need to set up accounts on [Convex](https://convex.dev/) and [Kinde](https://kinde.com/) to get these credentials.

    ```env
    # Convex
    CONVEX_DEPLOYMENT=
    NEXT_PUBLIC_CONVEX_URL=

    # Kinde Auth
    KINDE_CLIENT_ID=
    KINDE_CLIENT_SECRET=
    KINDE_ISSUER_URL=
    KINDE_SITE_URL=http://localhost:3000
    KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
    KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
    ```

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5.  **Run Convex:**

    In a separate terminal, run the Convex development command to sync your backend functions:

    ```bash
    npx convex dev
    ```

## 📖 Usage

1.  **Sign Up/Login**: Use the Kinde authentication flow to create an account.
2.  **Create a Team**: Set up a team to organize your projects.
3.  **Create a File**: Create a new file from the dashboard.
4.  **Edit & Draw**: Enter the workspace. Use the left panel to write documentation and the right panel to draw diagrams.
5.  **Save**: Changes are saved to the Convex database. (Note: Check if auto-save is implemented or if manual save is required via the "Save" button).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
