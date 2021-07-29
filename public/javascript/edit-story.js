async function editStoryHandler(e) {
    e.preventDefault();

    const title = document.querySelector('#story-title').value.trim();
    const startingText = document.querySelector('#story-startingText').value.trim();
    const storyId = document.querySelector('article').id.slice(document.querySelector('article').id.lastIndexOf('-') + 1);

    if (title && startingText) {
        const response = await fetch(`/api/stories/${storyId}`, {
            method: 'put',
            body: JSON.stringify({
                title,
                startingText
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

document.querySelector('#edit-btn').addEventListener('click', editStoryHandler);