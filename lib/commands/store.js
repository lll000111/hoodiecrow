"use strict";

module.exports = function(connection, parsed, data, callback){
    if(!parsed.attributes ||
        parsed.attributes.length != 3 ||
        !parsed.attributes[0] ||
        ["ATOM", "SEQUENCE"].indexOf(parsed.attributes[0].type) < 0 ||
        !parsed.attributes[1] ||
        (["ATOM"].indexOf(parsed.attributes[1].type) < 0) ||
        !parsed.attributes[2] ||
        (["ATOM", "STRING"].indexOf(parsed.attributes[2].type) >= 0  || Array.isArray(parsed.attributes[2]))
        ){

        connection.send({
            tag: parsed.tag,
            command: "BAD",
            attributes:[
                {type: "TEXT", value: "STORE expects sequence set, item name and item value"}
            ]
        }, "INVALID COMMAND", parsed, data);
        return callback();
    }

    if(connection.state != "Selected"){
        connection.send({
            tag: parsed.tag,
            command: "BAD",
            attributes:[
                {type: "TEXT", value: "Select mailbox first"}
            ]
        }, "STORE FAILED", parsed, data);
        return callback();
    }

    var messages = connection.selectedMailbox.messages;

    for(var i=0, len=connection.notificationQueue.length; i<len; i++){
        if(connection.notificationQueue[i].mailboxCopy){
            messages = connection.notificationQueue[i].mailboxCopy;
            break;
        }
    }

    //var range = connection.server.getMessageRange(messages, parsed.attributes[0].value, false);

    connection.send({
        tag: parsed.tag,
        command: "OK",
        attributes:[
            {type: "TEXT", value: "NOT IMPLEMENTED"}
        ]
    }, "STORE completed", parsed, data);

    callback();
};