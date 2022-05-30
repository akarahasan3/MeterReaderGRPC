using System.Threading.Tasks;
using Grpc.Core;
using MeterReader.gRPC;
using MeterReaderWeb.Data;
using MeterReaderWeb.Data.Entities;
using Microsoft.Extensions.Logging;
using static MeterReader.gRPC.MeterReadingService;

namespace MeterReaderWeb.Services
{
    public class MeterReadingService : MeterReadingServiceBase
    {
        private readonly IReadingRepository repository;
        private readonly ILogger<MeterReadingService> logger;

        public MeterReadingService(IReadingRepository repository, ILogger<MeterReadingService> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }
        public override async Task<StatusMessage> AddReading(ReadingPacket request, ServerCallContext context)
        {
            if (request.Status == ReadingStatus.Success)
            {
                foreach (var reading in request.Readings)
                {
                    var readingValue = new MeterReading
                    {
                        CustomerId = reading.CustomerId,
                        Value = reading.ReadingValue,
                        ReadingDate = reading.ReadingTime.ToDateTime()
                    };
                    
                    // ReSharper disable once TemplateIsNotCompileTimeConstantProblem
                    logger.LogInformation($"Adding {reading.ReadingValue}");
                    repository.AddEntity(readingValue);
                }
            }

            if (await repository.SaveAllAsync())
            {
                logger.LogInformation("Successfully saved new Readings...");
                return new StatusMessage
                {
                    Status = ReadingStatus.Success,
                    Message = "Successfullt added to database"
                };
            }

            logger.LogError("Failed to save new Readings...");
            return new StatusMessage
            {
                Status = ReadingStatus.Failure,
                Message = "Failed to store readings in Database"
            };
        }

        public override async Task AddReadingStream(
            IAsyncStreamReader<ReadingMessage> requestStream, 
            IServerStreamWriter<ErrorMessage> responseStream,
            ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                var msg = requestStream.Current;

                if (msg.ReadingValue < 3000)
                {
                    await responseStream.WriteAsync(new ErrorMessage
                    {
                        Message = $"Value less than 3000. Value: {msg.ReadingValue}"
                    });
                }
                
                var readingValue = new MeterReading
                {
                    CustomerId = msg.CustomerId,
                    Value = msg.ReadingValue,
                    ReadingDate = msg.ReadingTime.ToDateTime()
                };
                    
                // ReSharper disable once TemplateIsNotCompileTimeConstantProblem
                logger.LogInformation($"Adding {msg.ReadingValue} from Stream");
                repository.AddEntity(readingValue);

                await repository.SaveAllAsync();
            }
        }
    }
}