class AWSMetaData{
    constructor(){
        this.awsmetadataurl="http://169.254.169.254/latest/meta-data/";
    }

    async getAWSServiceMetaData(){
        return fetch(this.awsmetadataurl)
        .then(res=>res.json())
        .then(data=>{
            return data;
        })
        .catch((error)=>{
            return error;
        })
    }
}

module.exports = AWSMetaData;