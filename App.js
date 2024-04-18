
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserListPage from './components/userList/userList';
import UserdetailsPage from './components/userDetails/userDetails';
import { Provider } from 'react-redux';
import {store} from "../src/store/store"
function App() {
  return (
      <Provider store={store}  children={undefined}>
          <BrowserRouter>
     <Routes>
       <Route path="/" element={<UserListPage/>} />
       <Route path="/user/:id" element={<UserdetailsPage/>} />
     </Routes>
   </BrowserRouter>
      </Provider>
      
       
  );
}

export default App;
