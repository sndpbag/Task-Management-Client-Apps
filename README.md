# 🚀 Task Management Application

A modern task management web app with **dark mode**, **real-time sync**, and an **intuitive drag & drop interface**. Built with **React**, **Firebase**, and **Tailwind CSS**.

![Task Management App Preview](./task-application.png)

---

## ✨ Features

✅ **Dark Mode Toggle** - Eye-friendly interface with dark/light theme support  
✅ **Drag & Drop Tasks** - Effortlessly organize tasks using `react-beautiful-dnd`  
✅ **Real-Time Updates** - Firebase-powered instant sync across devices  
✅ **Task Timers** - Track time spent on each task  
✅ **User Authentication** - Secure login/logout functionality  
✅ **Three-Column Workflow** - To-Do → In Progress → Done  
✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  

---

## 💻 Technologies Used

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)  
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)  

- **Frontend:** React 19, React Router
- **Styling:** Tailwind CSS, Framer Motion animations
- **Backend:** Firebase (Authentication, Firestore)
- **Utilities:** React Beautiful DnD, Framer Motion, SweetAlert2, LocalForage

---

## 🛠️ Installation

### 1️⃣ Clone the repository
```bash
 git clone https://github.com/yourusername/task-management-app.git
 cd task-management-app
```

### 2️⃣ Install dependencies
```bash
 npm install
```

### 3️⃣ Set up Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password method)
- Create Firestore Database
- Retrieve your Firebase configuration values

### 4️⃣ Configure environment variables
Create a `.env` file in the project root and add:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 5️⃣ Start the development server
```bash
 npm run dev
```

---

## ⚙️ Configuration

### 🔥 Firebase Setup
- Enable Firestore Database (Production Mode Recommended)
- Set up security rules according to your needs
- Configure authentication providers in Firebase Console

### 📌 Task Persistence
- Tasks are stored locally using **LocalForage** for offline access
- Synced with **Firestore** when online

---

## 🤝 Contributing

Want to contribute? Follow these steps:

1. **Fork the project**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for more details.

---

### 🔥 Additional Notes

- Update Firebase configuration steps as needed
- Add actual screenshots for better visualization
- Replace the repository URL before publishing

Happy Coding! 🚀

