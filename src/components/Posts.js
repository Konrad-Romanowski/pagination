import React from 'react';
import '../App.css';

export default function Posts({posts}) {

    const [pagination, setPagination] = React.useState({
        postsPerPage: 10,
        currentPage: 1,
        firstPostIndex: 0,
        lastPostIndex: 10
    });

    function changeCurrentPage(number) {
        setPagination(prevPagination => {
            return {
                ...prevPagination,
                currentPage: number,
                firstPostIndex: (number - 1) * prevPagination.postsPerPage,
                lastPostIndex: (number - 1) * prevPagination.postsPerPage + prevPagination.postsPerPage
            }
        })
    }
    
    function changePostsPerPage(number) {
        setPagination({
            currentPage: 1,
            postsPerPage: number,
            firstPostIndex: 0,
            lastPostIndex: number
        })
    }
    
    const currentPosts = posts.slice(pagination.firstPostIndex,pagination.lastPostIndex);

    const postsElements = currentPosts.map(post=>
        <div className='post' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
        </div>
    )

    const numberOfPages = Math.ceil(posts.length / pagination.postsPerPage);

    const paginationElements = [];
    for(let i = 1; i <= numberOfPages; i++) {
        paginationElements.push(
            <button 
                className={i === pagination.currentPage ? 'page-button active-page' : 'page-button'}
                key={i}
                onClick={() => changeCurrentPage(i)}
            >
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
                <select
                    name="postsPerPage"
                    value={pagination.postsPerPage}
                    onChange={(e)=>changePostsPerPage(parseInt(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
            </section>
        </>
    )
}