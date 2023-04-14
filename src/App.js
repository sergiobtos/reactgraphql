import github from "./db";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(async () => {
    const queryText = JSON.stringify(query(pageCount, queryString))

    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body:queryText,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      const viewer = data.data.viewer;
      const repos = data.data.search.nodes;
      const total = data.data.search.repositoryCount;
      setUserName(viewer.name);
      setRepoList(repos);
      setTotalCount(total);
    })
    .catch((err) => {console.log('Error', err)});
  },[pageCount, queryString]);

  useEffect(() => {
     fetchData();
  }, [fetchData]);
  
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox 
      totalCount={totalCount}
      pageCount={pageCount}
      queryString={queryString}
      onQueryChange={(myString) => {setQueryString(myString)}}
      onTotalChange={(myNumber) => {setPageCount(myNumber)}}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
