let _fileRepository = null;

class FileService{
    constructor({ FileRepository }){
        _fileRepository = FileRepository;
    }

    async createFile(file){
        return await _fileRepository.uploadFile(file);
    }

    async createFiles(files){
        return await _fileRepository.uploadFiles(files);
    }
};

module.exports = FileService;