var request = require('request');

var workflowSlot;
var branchSlot;


exports.handler = (event, context, callback) => {
    
    try {
        if (event.request.type === 'LaunchRequest') {
            callback(null, buildResponse('Hello from Bitrise'));
        } else if (event.request.type === 'IntentRequest') {
            const intentName = event.request.intent.name;
            workflowSlot = event.request.intent.slots.WorkflowName.value;
            branchSlot = event.request.intent.slots.BranchName.value;
            
            if (intentName === 'triggerBuild') {
                
                buildBitriseApp(function (err, result) {
                    if(!err) callback(null, buildResponse('The build was launched with '+ workflowSlot +' workflow for '+ branchSlot + ' branch. make sure you take a look.'));
                    else callback(null, buildResponse("Please check your build logs. Something went wrong."));
                });
            } else {
                callback(null, buildResponse("Sorry, i don't understand"));
            }
        } else if (event.request.type === 'SessionEndedRequest') {
            callback(null, buildResponse('Session Ended'));
        }
    } catch (e) {
        context.fail(`Exception: ${e}`);
    }
};

function buildResponse(response) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: response,
            },
            shouldEndSession: true,
        },
        sessionAttributes: {},
    };
}

let api_key = process.env.API_PERSONAL_KEY;
let app_slug = process.env.APP_SLUG;

function buildBitriseApp(callback) {
var options = {
  'method': 'POST',
  'url': 'https://api.bitrise.io/v0.1/apps/'+app_slug+'/builds',
  'headers': {
    'Authorization': api_key
  },
  body: JSON.stringify({
    "User-Agent": "alexa-skill",
    "hook_info": {
      "type": "bitrise"
    },
    "build_params": {
      "branch": branchSlot,
      "workflow_id": workflowSlot
    }
  })
};
    request.post(options, function(error, response, body){
        if(error){
            callback("ERROR");

        } else {
            callback(null,"SUCCESS");
        }
    });
}
