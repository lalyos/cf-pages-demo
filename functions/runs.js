async function listFilesInFolder(folderId, token) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id, name, driveId, webContentLink)`;
    
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch files from Google Drive');
    }
    
    const data = await response.json();
    
    const files = data.files;
    
    return files;
}

function files2list(files) {
    let html = '<ul>';
    files.forEach(file => {
        const { id, name } = file;
        const url = `/show?id=${id}`;
        html += `<li><a href="${url}">${name}</a></li>`;
    });
    html += '</ul>';
    return html;
}

export async function onRequest(context) {
    const token = context.env.TOKEN;
    try {
        const folderId = '1SjdeECY0Wm-50u-0QAXyLRVy9DC60NpP';
        const files = await listFilesInFolder(folderId, token);
        
        return new Response(files2list(files), {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        return new Response('Error: ' + error.message, {
            status: 500,
        });
    }
}