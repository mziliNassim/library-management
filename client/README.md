library-management/
├─ .gitignore
├─ client/
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public/
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src/
│  │  ├─ animation/
│  │  │  └─ book.json
│  │  ├─ App.jsx
│  │  ├─ components/
│  │  │  ├─ Auth/
│  │  │  │  ├─ auth.css
│  │  │  │  ├─ Login.jsx
│  │  │  │  ├─ Lougout.jsx
│  │  │  │  └─ Register.jsx
│  │  │  ├─ Dashboard/
│  │  │  │  └─ DashboardHome.jsx
│  │  │  ├─ Emprunt/
│  │  │  │  ├─ EmpruntDetails.jsx
│  │  │  │  ├─ EmpruntForm.jsx
│  │  │  │  └─ EmpruntList.jsx
│  │  │  ├─ Livre/
│  │  │  │  ├─ LivreCard.jsx
│  │  │  │  ├─ LivreDetails.jsx
│  │  │  │  ├─ LivreForm.jsx
│  │  │  │  └─ LivreList.jsx
│  │  │  ├─ UI/
│  │  │  │  ├─ Button.jsx
│  │  │  │  ├─ Footer.jsx
│  │  │  │  ├─ Navbar.jsx
│  │  │  │  └─ Sidebar.jsx
│  │  │  └─ User/
│  │  │     ├─ UserForm.jsx
│  │  │     ├─ UserList.jsx
│  │  │     └─ UserProfile.jsx
│  │  ├─ features/
│  │  │  ├─ EmpruntSlice.jsx
│  │  │  ├─ LivreSlice.jsx
│  │  │  ├─ Store.jsx
│  │  │  └─ UserSlice.jsx
│  │  ├─ hooks/
│  │  │  ├─ useAuth.jsx
│  │  │  ├─ useEmprunt.jsx
│  │  │  └─ useFetch.jsx
│  │  ├─ index.css
│  │  ├─ Main.jsx
│  │  ├─ pages/
│  │  │  ├─ DashboardPage.jsx
│  │  │  ├─ EmpruntPage.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ LivrePage.jsx
│  │  │  ├─ LoginPage.jsx
│  │  │  ├─ NotFound.jsx
│  │  │  ├─ RegisterPage.jsx
│  │  │  └─ UserPage.jsx
│  │  └─ services/
│  │     └─ api.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ server/
   ├─ .env
   ├─ app.js
   ├─ controllers/
   │  ├─ auth.controller.js
   │  ├─ categories.controller.js
   │  ├─ clients.controller.js
   │  ├─ emprunts.controller.js
   │  └─ livres.controller.js
   ├─ middlewares/
   │  └─ auth.js
   ├─ models/
   │  ├─ Admin.js
   │  ├─ Categorie.js
   │  ├─ Client.js
   │  ├─ Emprunt.js
   │  └─ Livre.js
   ├─ package-lock.json
   ├─ package.json
   └─ routes/
      ├─ categories.js
      ├─ clients.js
      ├─ emprunts.js
      └─ livres.js
