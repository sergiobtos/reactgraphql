import github from "./db";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";

function App() {
  const [userName, setUserName] = useState('');

  const fetchData = useCallback(async () => {
    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query),
    })
    .then((res) => res.json())
    .then((data) => {
      setUserName(data.data.viewer.name);
      console.log('Success',data)
    })
    .catch((err) => {console.log('Error', err)});
  },[]);

  useEffect(() => {
     fetchData();
  }, [fetchData]);
  
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
    </div>
  );
}

export default App;
