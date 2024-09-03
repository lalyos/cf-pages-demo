async function listFilesInFolder(folderId) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id, name, driveId, webContentLink)`;
    
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ya29.a0AcM612wZzhctbORpQ3bXSJQP6jkVn0_CR3saW6-EeroDeoClzYevYPUbQpOs8XmJY9WKXJu5qAyW8-60rHza0Xjf15CSCmf0-qlOOSZpKW25NiLkUelfSDyEBRu1QrFE2Uq_DwzEhIs3Wv-HKMxguwtdFgNxpZqeGLDVCHAKaCgYKAdASARMSFQHGX2MiLumEW_GAGupLnxK34J_WmQ0175`,
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch files from Google Drive');
    }
    
    const data = await response.json();
    
    const files = data.files;
    
    return files;
}

export async function onRequest(context) {
    try {
        const folderId = '1SjdeECY0Wm-50u-0QAXyLRVy9DC60NpP';
        const files = await listFilesInFolder(folderId);
        
        return new Response(JSON.stringify(files), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Error: ' + error.message, {
            status: 500,
        });
    }
}