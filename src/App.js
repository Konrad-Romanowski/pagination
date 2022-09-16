import React from 'react';
import './App.css';
import Posts from './components/Posts';

export default function App() {

    const [loadingPosts, setLoadingPosts] = React.useState(true);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(()=>{
        async function getPosts() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            setPosts(data);
            setLoadingPosts(false);
        }

        getPosts();
    },[]);

    return (
        <>
            <header className='header'>
                <h1 className='header-title'>Pagination snippet</h1>
            </header>
            <div className='wrapper'>
                {!loadingPosts && <Posts posts={posts}/> }
            </div>
        </>
    )
}
