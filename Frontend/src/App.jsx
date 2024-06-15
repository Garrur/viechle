import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard';
import './App.css';
import AdminNav from './components/AdminNav';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <AdminNav />
                <Dashboard />
            </div>
        </Provider>
    );
};

export default App;
