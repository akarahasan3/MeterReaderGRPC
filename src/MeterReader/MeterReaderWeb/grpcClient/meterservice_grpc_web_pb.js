/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = require('./meterservice_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MeterReadingServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MeterReadingServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ReadingPacket,
 *   !proto.StatusMessage>}
 */
const methodDescriptor_MeterReadingService_AddReading = new grpc.web.MethodDescriptor(
  '/MeterReadingService/AddReading',
  grpc.web.MethodType.UNARY,
  proto.ReadingPacket,
  proto.StatusMessage,
  /**
   * @param {!proto.ReadingPacket} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.StatusMessage.deserializeBinary
);


/**
 * @param {!proto.ReadingPacket} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.StatusMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StatusMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MeterReadingServiceClient.prototype.addReading =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MeterReadingService/AddReading',
      request,
      metadata || {},
      methodDescriptor_MeterReadingService_AddReading,
      callback);
};


/**
 * @param {!proto.ReadingPacket} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StatusMessage>}
 *     Promise that resolves to the response
 */
proto.MeterReadingServicePromiseClient.prototype.addReading =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MeterReadingService/AddReading',
      request,
      metadata || {},
      methodDescriptor_MeterReadingService_AddReading);
};


module.exports = proto;

