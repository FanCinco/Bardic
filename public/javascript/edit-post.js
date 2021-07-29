async function editPostHandler(e) {
    if (e.target.classList.value.includes('edit-post-btn')) {
        const post_id = e.target.id.slice(e.target.id.lastIndexOf('-') + 1);
        const content = document.querySelector(`#post-content-${post_id}`).value.trim();
        
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'put',
            body: JSON.stringify({
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/stories');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('body').addEventListener('click', editPostHandler);