import React from 'react';
import '../App.css';

export default function Posts({posts}) {
    const [postsPerPage, setPostsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    const firstPostIndex = (currentPage - 1) * postsPerPage;
    const lastPostIndex = firstPostIndex + postsPerPage;

    const currentPosts = posts.slice(firstPostIndex,lastPostIndex);

    const postsElements = currentPosts.map(post=>
        <div className='post' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
        </div>
    )

    function changeCurrentPage(number) {
        setCurrentPage(number);
    }

    const numberOfPages = Math.ceil(posts.length / postsPerPage);
    const paginationElements = [];
    for(let i = 1; i <= numberOfPages; i++) {
        paginationElements.push(
            <button className={i === currentPage ? 'page-button active-page' : 'page-button'} key={i} onClick={() => changeCurrentPage(i)}>
                {i}
            </button>
        )
    }

    return (
        <>
            <section id='posts' className='posts'>
                {postsElements}
            </section>

            <section id="posts-pagination" className='posts-pagianition'>
                {paginationElements}
            </section>
        </>
    )
}
