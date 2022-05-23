//const im = require('gm').subClass({imageMagick: true});
const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
//const uuidv4 = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const AWS = require('aws-sdk');

const resizeAsync = util.promisify(im.resize);
const readFileAsync = util.promisify(fs.readFile);
const unlinkAsync = util.promisify(fs.unlink);

AWS.config.update({ region : 'us-east-1'});
const s3 = new AWS.S3();


/* async = Asincronico
 * event = la estructura del evento dependedel evento de entrada
 * context = El contexto del entorno general en donde se ejecuta la funcion lambda (por ej: nombre de funcion, tiempo restante, limite de memoria, etc)
 */
exports.handler = async (event) => {
    let filesProccessed = event.Records.map( async (records) => {
        let bucket = records.s3.bucket.name;
        let filename = records.s3.object.key;

        // Get file from s3
        var params = {
            Bucket: bucket,
            Key: filename
        };
        let inputData = await s3.getObject(params).promise();

        // Resize the file
        let tempFile = os.tmpdir() + '/' + uuidv4() + '.jpg'
        let resizeArgs = {
            srcData: inputData.Body,
            dstPath: tempFile,
            width: 150
        };
        await resizeAsync(resizeArgs);

        // Read the resized file
        let resizedData = await readFileAsync(tempFile);

        // Upload the new file to s3
        let taretFileName = filename.substr(0, filename.lastIndexOf('.')) + '-small.jpg';
        var params = {
            Bucket: bucket + '-dest',
            Key: taretFileName,
            Body: new Buffer(resizedData),
            ContentType: 'image/jpeg'
        };

        await s3.putObject(params).promise();

        return await unlinkAsync(tempFile);
    });

    await Promise.all(filesProccessed);
    console.log("done");
    return "done";


    //const data = event.data;
    //let newImage = await resizeImage();
    //return newImage;
}


//const resizeImage = (data) => new Promise((resolve, reject) => {
//})
