import { useState, useEffect } from 'react';
import { getAllDiaries, createDiary } from './diaryServices';
import { DiaryEntry } from "./types.ts";

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [diarys, setDiarys] = useState<DiaryEntry[]>([

  ]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiarys(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()
      createDiary({ date: newDate, weather: newWeather, visibility: newVisibility, comment: newComment }).then(data => {
        setDiarys(diarys.concat(data))
      })
      setNewDate('')
      setNewWeather('')
      setNewVisibility('')
      setNewComment('')
    };

  return(     
  <div>  
    <h2>Add new entry</h2>    
    <form onSubmit={diaryCreation}>
      Date: <input
        value={newDate}
        onChange={(event) => setNewDate(event.target.value)} 
      />
      Weather: <input
      value={newWeather}
      onChange={(event) => setNewWeather(event.target.value)} 
    />
    Visibility: <input
        value={newVisibility}
        onChange={(event) => setNewVisibility(event.target.value)} 
      />
      Comment: <input
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)} 
      />
      <button type='submit'>add</button>
    </form>
    <h2>Diary entries</h2>
      <ul>
        {diarys.map(diary =>
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </li>
        )}
      </ul>
  </div>
  )
}
export default App;
