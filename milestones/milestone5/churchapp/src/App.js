import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';import NavBar from './NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Home from './main/Home';
import SermonsList from './main/SermonsList';
import ViewSermon from "./sermons/ViewSermon";
import AdminDash from './admin/AdminDash';
import AdminSermons from './admin/AdminSermons';
import AdminSongs from './admin/AdminSongs';
import AdminVerses from './admin/AdminVerses';
import EditSermon from './admin/actions/EditSermon';
import Edit from './admin/actions/Edit';
import EditSong from './admin/actions/EditSong';
import EditVerse from './admin/actions/EditVerse';

const App = () => {
  const [selectedSermon, setSelectedSermon] = useState({});
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedVerse, setSelectedVerse] = useState({});

  const changeSermon = (sermon) => {
    setSelectedSermon(sermon);
  }

  const changeSong = (song) => {
    setSelectedSong(song);
  }

  const changeVerse = (verse) => {
    setSelectedVerse(verse);
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sermons' element={<SermonsList changeSermon={changeSermon} adminView={false} />} />
        <Route exact path='/AdminDashboard' element={<AdminDash />}>
          <Route path="sermons" element={<AdminSermons changeSermon={changeSermon} />} />
          <Route path="songs" element={<AdminSongs changeSong={changeSong} />} />
          <Route path="verses" element={<AdminVerses changeVerse={changeVerse} />} />
        </Route>
        <Route exact path='/edit' element={<Edit />}>
          <Route
            path='sermon/:sermonId'
            element={<EditSermon sermon={selectedSermon} />}></Route>
          <Route
            path='song/:songId'
            element={<EditSong song={selectedSong} />}></Route>
          <Route
            path='verse/:verseId'
            element={<EditVerse verse={selectedVerse} />}></Route>
        </Route>
        <Route exact path='/new' element={<Edit />}>
          <Route path="sermon" element={<EditSermon />}></Route>
          <Route path="song" element={<EditSong />}></Route>
          <Route path="verse" element={<EditVerse />}></Route>
        </Route>
        <Route
          exact
          path='/sermon/:sermonId'
          element={<ViewSermon sermon={selectedSermon} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
