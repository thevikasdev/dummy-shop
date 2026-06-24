import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
