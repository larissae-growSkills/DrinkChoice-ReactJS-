import './App.css';
import FormData from './components/FormData';


function App() {

  return (
    <main>
      <div class="flex justify-center my-14">
        <h1 class="text-4xl text-slate-800">Questionnaire</h1>
      </div>
      <div class="flex justify-center">
        <FormData></FormData>
      </div>
    </main>
  );
}

export default App;
