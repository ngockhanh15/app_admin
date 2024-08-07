import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DashboardPage></DashboardPage>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
