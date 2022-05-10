using Grpc.Net.Client;
using MeterReader.gRPC;

namespace MeterReadingClient;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly ReadingGenerator _generator;
    private readonly int _customerId;
    private readonly string _serviceUrl;

    public Worker(ILogger<Worker> logger, ReadingGenerator generator, IConfiguration configuration)
    {
        _logger = logger;
        _generator = generator;
        _customerId = configuration.GetValue<int>("CustomerId");
        _serviceUrl = configuration["ServiceUrl"];
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            //call the grpc service
            var channel = GrpcChannel.ForAddress(_serviceUrl);
            var client = new MeterReadingService.MeterReadingServiceClient(channel);

            var packet = new ReadingPacket
            {
                Status = ReadingStatus.Success
            };

            for (var x = 0; x < 5; ++x)
            {
                var reading = await _generator.GenerateAsync(_customerId);
                packet.Readings.Add(reading);
            }

            var status = client.AddReading(packet);
            if(status.Status == ReadingStatus.Success)
            {
                _logger.LogInformation("Successfully called gRPC");
            }
            else
            {
                _logger.LogError("Failed to call gRPC");
            }

            await Task.Delay(5000, stoppingToken);
        }
    }
}