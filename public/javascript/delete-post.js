async function deletePostHandler(e) {
    if (e.target.classList.value.includes('delete-post-btn')) {
        const post_id = e.target.id.slice(e.target.id.lastIndexOf('-') + 1);

        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'delete'
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('body').addEventListener('click', deletePostHandler);