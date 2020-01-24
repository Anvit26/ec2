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
   
    ec2.describeInstances(params, function(err, data) {
      if (err) {
        console.log("Error", err.stack);
      } else {
        console.log("Success: \n " + JSON.stringify(data));
        var ip = data.Reservations[0].Instances[0].PublicIpAddress;
      }
      callback( null, {ip});
    });
};
/*
function describe(ec2, instanceId) {
  return new Promise(function (resolve, reject) {
    var params = {
      DryRun: false,
      InstanceIds: [instanceId]
    };
    ec2.describeInstances(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      var ip = data.Reservations[0].Instances[0].PublicIpAddress;
      var desc = '';
      data.Reservations[0].Instances[0].Tags.forEach(function (tag) {
        desc = desc + ' ' + tag.Key + '=' + tag.Value + ' / ';
      });
      return resolve({ip: ip, description: desc});
    });
  });
}

exports.handler = function (event, context, callback) {
  var msgAction = event.action.toUpperCase() + ': ' + event.instanceId;
  var ec2 = new AWS.EC2();
  return describe(ec2, event.instanceId).then(function (data) {
    msgAction = msgAction + ' - ' + data.ip + ' - ' + data.description;
    console.log('[INFO]', 'Attempting', msgAction);
  }).then(function () {
    return callback();
  }).catch(function (err) {
    console.log('[ERROR]', JSON.stringify(err));
    return callback(err);
  });
};*/
