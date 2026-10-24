import ImageKit  from "imagekit";

const imagekit = new ImageKit({
    privateKey: pocess.env.IMAGEKIT_PRIVAT_KEY
})


function hasImageKitConfig() {
    return Boolean(process.env.IMAGEKIT_PRIVAT_KEY);
}



function createFilceName (originalName = "upload") {
    const safeName = originalName.replace(/[^a-zA-Z0-9_-]/g, "_");
    return `chat-${Date.now()}-${safeName}`;

}


async function uploadChatMedia(file){
    const fileName = createFileName(file.originalname);

    const result = await imagekit.upload({
        file: await toFile(file.buffer, fileName, {type: file.mimetype}),
        fileName,
        folder: "/chat",
    });

    return result.url;

}


export { hasImageKitConfig, uploadChatMedia };