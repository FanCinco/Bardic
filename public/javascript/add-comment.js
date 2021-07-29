async function addCommentHandler(e) {

    if (e.target.id.includes('create-comment')) {
        const post_id = e.target.id.slice(e.target.id.lastIndexOf('-') + 1);
        const content = document.querySelector(`#comment-content-${post_id}`).value.trim();

        if (content) {
            const response = await fetch('/api/comments', {
                method: 'post',
                body: JSON.stringify({
                    content,
                    post_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        }
    }
}

document.querySelector('body').addEventListener('click', addCommentHandler);