// Community page JavaScript with backend integration
document.addEventListener('DOMContentLoaded', function() {
    // Load community posts from backend
    loadCommunityPosts();
    
    // Add event listener for new post button
    const addPostButton = document.createElement('button');
    addPostButton.textContent = 'Add New Post';
    addPostButton.className = 'add-post-button';
    addPostButton.addEventListener('click', showAddPostForm);
    
    const shortdes = document.querySelector('.shortdes');
    shortdes.after(addPostButton);
});

// Function to load community posts from backend
function loadCommunityPosts() {
    fetch('/api/community?type=forum_post')
        .then(response => response.json())
        .then(data => {
            displayCommunityPosts(data.posts);
        })
        .catch(error => {
            console.error('Error loading community posts:', error);
            // If API fails, use existing content as fallback
        });
}

// Function to display community posts
function displayCommunityPosts(posts) {
    const contentDiv = document.querySelector('.content');
    
    // Clear existing content if we have posts from the API
    if (posts && posts.length > 0) {
        contentDiv.innerHTML = '';
        
        // Add each post
        posts.forEach(post => {
            const postSection = document.createElement('section');
            postSection.className = 'community-post';
            postSection.dataset.postId = post._id;
            
            const date = new Date(post.date);
            
            postSection.innerHTML = `
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span class="post-author">Posted by: ${post.author}</span>
                    <span class="post-date">on ${date.toLocaleDateString()}</span>
                </div>
                <p>${post.content}</p>
                <div class="post-actions">
                    <button class="like-button" onclick="likePost('${post._id}')">
                        <span class="like-icon">👍</span> 
                        <span class="like-count">${post.likes}</span> Likes
                    </button>
                    <button class="comment-button" onclick="showCommentForm('${post._id}')">
                        Add Comment
                    </button>
                </div>
                <div class="comments-container" id="comments-${post._id}"></div>
            `;
            
            contentDiv.appendChild(postSection);
            
            // Load comments for this post
            loadComments(post._id);
        });
    }
}

// Function to load comments for a post
function loadComments(postId) {
    fetch(`/api/community?parentId=${postId}`)
        .then(response => response.json())
        .then(data => {
            displayComments(postId, data.posts);
        })
        .catch(error => {
            console.error('Error loading comments:', error);
        });
}

// Function to display comments
function displayComments(postId, comments) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    
    if (comments && comments.length > 0) {
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.dataset.commentId = comment._id;
            
            const date = new Date(comment.date);
            
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${date.toLocaleDateString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="like-button" onclick="likeComment('${comment._id}')">
                        <span class="like-icon">👍</span> 
                        <span class="like-count">${comment.likes}</span> Likes
                    </button>
                </div>
            `;
            
            commentsContainer.appendChild(commentDiv);
        });
    }
}

// Function to show add post form
function showAddPostForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'addPostModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="closeModal('addPostModal')">&times;</span>
            <h2>Create New Post</h2>
            <form id="addPostForm">
                <div class="form-group">
                    <label for="postTitle">Title:</label>
                    <input type="text" id="postTitle" required>
                </div>
                <div class="form-group">
                    <label for="postContent">Content:</label>
                    <textarea id="postContent" rows="6" required></textarea>
                </div>
                <div class="form-group">
                    <label for="postAuthor">Your Name:</label>
                    <input type="text" id="postAuthor" value="Anonymous">
                </div>
                <div class="form-group">
                    <label for="postCategory">Category:</label>
                    <select id="postCategory">
                        <option value="general">General Discussion</option>
                        <option value="gameplay">Gameplay</option>
                        <option value="development">Development</option>
                        <option value="suggestions">Suggestions</option>
                    </select>
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    document.getElementById('addPostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPost = {
            type: 'forum_post',
            title: document.getElementById('postTitle').value,
            content: document.getElementById('postContent').value,
            author: document.getElementById('postAuthor').value || 'Anonymous',
            category: document.getElementById('postCategory').value
        };
        
        addPost(newPost);
    });
}

// Function to show comment form
function showCommentForm(postId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'addCommentModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="closeModal('addCommentModal')">&times;</span>
            <h2>Add Comment</h2>
            <form id="addCommentForm">
                <div class="form-group">
                    <label for="commentContent">Comment:</label>
                    <textarea id="commentContent" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="commentAuthor">Your Name:</label>
                    <input type="text" id="commentAuthor" value="Anonymous">
                </div>
                <input type="hidden" id="parentPostId" value="${postId}">
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    document.getElementById('addCommentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newComment = {
            type: 'comment',
            content: document.getElementById('commentContent').value,
            author: document.getElementById('commentAuthor').value || 'Anonymous',
            parentId: document.getElementById('parentPostId').value
        };
        
        addComment(newComment);
    });
}

// Function to add a new post
function addPost(post) {
    fetch('/api/community', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post added:', data);
        closeModal('addPostModal');
        loadCommunityPosts(); // Refresh posts
    })
    .catch(error => {
        console.error('Error adding post:', error);
    });
}

// Function to add a new comment
function addComment(comment) {
    fetch('/api/community', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comment added:', data);
        closeModal('addCommentModal');
        loadComments(comment.parentId); // Refresh comments for this post
    })
    .catch(error => {
        console.error('Error adding comment:', error);
    });
}

// Function to like a post
function likePost(postId) {
    fetch(`/api/community/${postId}/like`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        // Update like count in UI
        const likeCount = document.querySelector(`.community-post[data-post-id="${postId}"] .like-count`);
        if (likeCount) {
            likeCount.textContent = data.likes;
        }
    })
    .catch(error => {
        console.error('Error liking post:', error);
    });
}

// Function to like a comment
function likeComment(commentId) {
    fetch(`/api/community/${commentId}/like`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        // Update like count in UI
        const likeCount = document.querySelector(`.comment[data-comment-id="${commentId}"] .like-count`);
        if (likeCount) {
            likeCount.textContent = data.likes;
        }
    })
    .catch(error => {
        console.error('Error liking comment:', error);
    });
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

// Add these functions to window for onclick access
window.showCommentForm = showCommentForm;
window.likePost = likePost;
window.likeComment = likeComment;
window.closeModal = closeModal;
