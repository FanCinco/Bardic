async function postFormHandler(e) {
    e.preventDefault();

    const content = document.querySelector('#post-content').value.trim();
    const story_id = document.querySelector('article').id.slice(document.querySelector('article').id.lastIndexOf('-') + 1);

    if (content) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                content,
                story_id
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

document.querySelector('#create-post').addEventListener('click', postFormHandler);