'use strict';

var AWS = require('aws-sdk');
 
AWS.config = new AWS.Config();
AWS.config.region = "ap-south-1";

var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};

exports.handler = function (event, context, callback)  {
   
        var instancesLists = '';
        ec2.describeInstances(params,function(err, data) {
        if (err) return console.log(err, err.stack);

        for (var i in data.Reservations){
            var aone = 1;
            var x = parseInt(i);
            var y = (aone + x);
            
            var ins = data.Reservations[i].Instances[0];
            var name = findInstanceName(ins);
            if(name === null) continue;

            instancesLists+=  y +', Name, '+ name +'.  Instance I.D. :,  ' +ins.InstanceId +'.  Status, ' + ins.State.Name + ' ..';
        }
        var one = 1;
            var a = parseInt(i);
            var b = parseInt(one);
             var count ='you have, ' + (a+b) +' instance  ' ;
             var instancesList = count + instancesLists;
        console.log(instancesList);
        callback( null, {instancesList});
        });
        function findInstanceName(ins){
            for(var j in ins.Tags){
                if(ins.Tags[j].Key === 'Name'){
            return ins.Tags[j].Value;
        }
    }
    return null;
  }
};
