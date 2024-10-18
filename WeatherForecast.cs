namespace API;

public class WeatherForecast
{
    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF { get; private set; }
    //public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }


    public static int SetTemperatureF(int temperatureC)
    {
        return (32 + (int)(temperatureC / 0.5556));
    }
}
