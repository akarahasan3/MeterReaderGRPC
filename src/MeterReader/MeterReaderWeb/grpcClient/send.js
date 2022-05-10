const { ReadingPacket, ReadingStatus, ReadingMessage } = require("./meterservice_pb.js");
const { MeterReadingServiceClient } = require('./meterservice_grpc_web_pb.js');
const { Timestamp } = require('google-protobuf/google/protobuf/timestamp_pb.js');

const theLog = document.getElementById("theLog");
const theButton = document.getElementById("theButton");

function addToLog(msg){
    const div = document.createElement("div");
    div.innerText = msg;
    theLog.appendChild(div);
}

theButton.addEventListener("click", function (){
    try{
        addToLog("Starting service call");
        const packet = new ReadingPacket();
        packet.setStatus(ReadingStatus.SUCCESS);
        
        const reading = new ReadingMessage();
        reading.setCustomerid(1);
        reading.setReadingvalue(1000);
        
        const timestamp = new Timestamp();
        const now = Date.now();
        timestamp.setSeconds(Math.round(now/1000));
        
        reading.setReadingtime(timestamp);
        
        packet.addReadings(reading);
        
        addToLog("Calling Service 2...");
        const client = new MeterReadingServiceClient(window.location.origin);
        addToLog("Still running...");
        
        client.addReading(packet, {}, function (err, res){
            if(err){
                addToLog(`Error: ${err}`);
            }
            else{
                addToLog(`Success: ${res.getMessage()}`);
            }
        })
    }
    catch (e) {
        addToLog(`Exception thrown: ${e.message}`);
    }
});