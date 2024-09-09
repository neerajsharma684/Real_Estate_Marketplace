import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, About, SignIn, SignUp, ForgotPassword, CreateListing, NotFound, Profile, ShowListings } from "./pages"
import { Header } from "./components"

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-listing" element={<CreateListing />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/show-listings" element={<ShowListings />} />
        <Route path="/property/:id" element={<ShowListings />} />
        <Route path="/property-edit/:id" element={<ShowListings />} />
        <Route path="/property-contact/:id" element={<ShowListings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
