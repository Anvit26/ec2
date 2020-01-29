'use strict';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config = new AWS.Config();
AWS.config.region = "ap-south-1";

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};
// Call EC2 to retrieve policy for selected bucket

exports.handler = function (event, context, callback)  {
   
        var instancesList = '';
        ec2.describeInstances(params,function(err, data) {
        if (err) return console.log(err, err.stack);

        for (var i in data.Reservations){
            var ins = data.Reservations[i].Instances[0];
            var name = findInstanceName(ins);
            if(name === null) continue;

            instancesList+= ' Name: ' + name +
                            '.  Instance I.D. :,  ' +ins.InstanceId +
                            '.  Status : ' + ins.State.Name + ' ..';
        }
        console.log(instancesList);
        callback( null, {instancesList});
        });
        function findInstanceName(ins){
  for(var j in ins.Tags){
    if(ins.Tags[j].Key === 'Name'){
      return ins.Tags[j].Value;
    }
  }
  //I'm not sure skipping the instance is the best choice.
  //You might instead return "<Unknown>" so you can know you
  //have an unnamed instance running.
  return null;
}
};
