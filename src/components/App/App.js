import {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
// import api from "../utils/Api";
import Register from '../Register/Register';
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {Routes, Route, useNavigate} from "react-router-dom";

function App() {



  return (
      // <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
          />
          <Routes>
            <Route path="/signup" element={
              <Register
              />}/>
            <Route path="/signin" element={
              <Login
              />}/>
            <Route path="/movies" element={
              <Movies
              />}/>
            <Route path="/saved-movies" element={
              <SavedMovies
              />}/>
            <Route path="/profile" element={
              <Profile
              />}/>
            <Route exact path="/" element={
              <Main
              />}/>
            <Route path="*" element={
              <NotFound />}/>
          </Routes>
          <Footer/>
        </div>
      // </CurrentUserContext.Provider>
  )
      ;
}

export default App;
