const token = process.env.REACT_APP_TOKEN || '';

const github ={
    baseUrl: 'https://api.github.com/graphql',
    username: process.env.REACT_APP_USERNAME || '',
    headers:{
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
    }
}

export default github;