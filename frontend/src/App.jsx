import { WallpaperProvider } from "./context/WallpaperContext";
import { ThemeProvider } from './context/ThemeContext';
import { replace, Route, Routes } from 'react-router';
import ChatPage from "./pages/ChatPage";
import AuthPage from './pages/AuthPage';
import {useAuth} from "@clerk/react"


function App() {

  const {isSignedIn, isLoaded} = useAuth ();

  if(!isLoaded) return <p>loading...</p>
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path='/' element={ isSignedIn ? <ChatPage /> : <Navigation to={"/auth"} replace />  } />
          <Route path='/auth' element={ isSignedIn ? <AuthPage /> : <Navigation to={"/chat"} replace />  } />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App