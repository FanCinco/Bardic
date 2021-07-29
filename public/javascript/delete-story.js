async function deleteStoryHandler(e) {
    e.preventDefault();

    const storyId = document.querySelector('article').id.slice(document.querySelector('article').id.lastIndexOf('-') + 1);

    const response = await fetch(`/api/stories/${storyId}`, {
        method: 'delete'
    });
    
    if (response.ok) {
        document.location.replace('/stories');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteStoryHandler);