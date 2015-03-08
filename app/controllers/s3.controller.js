'use strict';
var aws = require('aws-sdk');

exports.sign = function(spark, message, query) {
	var S3_BUCKET = process.env.S3_BUCKET;
	var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
	var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: query.s3_object_name, 
        Expires: 60, 
        ContentType: query.s3_object_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+query.s3_object_name 
            };
            spark.response(return_data, message);
        } 
    });
}