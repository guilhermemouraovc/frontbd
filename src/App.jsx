
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Diretores from './pages/Diretores';
import Alunos from './pages/Alunos';
import Clubes from './pages/Clubes';
import Disciplinas from './pages/Disciplinas';
import Fardamentos from './pages/Fardamentos';
import Leciona from './pages/Leciona';
import Notas from './pages/Notas';
import Professores from './pages/Professores';
import Responsaveis from './pages/Responsaveis';
import Turmas from './pages/Turmas';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Toaster position="top-right" richColors />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="diretores" element={<Diretores />} />
        <Route path="alunos" element={<Alunos />} />
        <Route path="clubes" element={<Clubes />} />
        <Route path="disciplinas" element={<Disciplinas />} />
        <Route path="fardamentos" element={<Fardamentos />} />
        <Route path="leciona" element={<Leciona />} />
        <Route path="notas" element={<Notas />} />
        <Route path="professores" element={<Professores />} />
        <Route path="responsaveis" element={<Responsaveis />} />
        <Route path="turmas" element={<Turmas />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;