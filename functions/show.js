async function getFileByID(fileId) {
    const url = `https://drive.google.com/uc?id=${fileId}`;

    const response = await fetch(url);
    const fileContent = await response.text();
    return fileContent;
}


export async function onRequest(context) {

    const url = new URL(context.request.url); 
    const fileId = url.searchParams.get('id');
    console.log('fileId:', fileId);
    const fileContent = await getFileByID(fileId);
    return new Response(fileContent, { 
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
}