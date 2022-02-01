import './App.css';
function App() {
  return (
    <div class="container flex col">
      <h3 class="title">
        Recuperação de Senha
      </h3>
      <div class="forms">
        <form class="flex col">
          <input type="password" class="txt-field" placeholder="Digite sua nova senha"/>
          <input type="password" class="txt-field" placeholder="Confirme sua nova senha"/>
          <button class="confirm-btn" type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
