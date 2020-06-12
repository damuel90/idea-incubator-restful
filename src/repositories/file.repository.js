const cloudinary = require('cloudinary');

class FileRepository{
    constructor({ config }){
        cloudinary.config({
            cloud_name: config.CLOUDINARY_NAME,
            api_key: config.CLOUDINARY_KEY,
            api_secret: config.CLOUDINARY_SECRET
        });
    }

    async uploadFile(file){
        let uploadedFile = await cloudinary.v2.uploader.upload(file.path); 

        return uploadedFile.secure_url;
    }

    async uploadFiles(files){
        const urls = [];
        for (const file of files) {
            const url = await this.uploadFile(file);
            urls.push(url);
        }
        
        return urls;
    }
};

module.exports = FileRepository;