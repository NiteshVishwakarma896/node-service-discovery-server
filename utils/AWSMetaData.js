class AWSMetaData{
    constructor(){
        this.awsmetadataurl="http://169.254.169.254/latest/meta-data/";
    }

    getAWSServiceMetaData(){
        fetch(this.awsmetadataurl)
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