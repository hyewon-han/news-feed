import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import Detail from 'pages/Detail';
import Join from 'pages/Join';
import Login from 'pages/Login';
import MyProfile from 'pages/MyProfile';
import Upload from 'pages/Upload';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feeds/:id" element={<Detail />} />
          <Route path="/users/:id" element={<MyProfile />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
