import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Home from './home.jsx'
import TimerPage from './timer.jsx'
import NotesPage from './notes.jsx'
import FoldersPage from './folders.jsx'
import SettingsPage from './settings.jsx'

import { AuthContextProvider } from './context/UserAuth.jsx';
import { createBrowserRouter, HashRouter, Routes, Route, RouterProvider } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext';

//Este desarrollo se ha realizado con el apoyo de la documentación de firebase y
// el siguiente vídeo tutorial: https://youtu.be/cZAnibwI9u8?si=SVHk00iUikfFfZHk

//Se recogen las páginas en el BrowserRouter para navegar
const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/home",element:<Home/>},
  {path: "/timer", element:<TimerPage/>},
  {path: "/folders", element:<FoldersPage/>},
  {path: "/notes", element:<NotesPage/>},
  {path: "/settings", element:<SettingsPage/>}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NotesProvider>
        <RouterProvider router={router} />
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/notws" element={<NotesPage />}
            <Route path="/folders" element={<FoldersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* <Route path="/Timer" element={<Timer />} /> */}
          </Routes>
      </HashRouter>
      </NotesProvider>
    </AuthContextProvider>
  </StrictMode>,
  
)




