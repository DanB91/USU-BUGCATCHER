

public class Converter{
    public static String convertSecsToTime(double sec)
    {
        double seconds = 0;
        int minutes = 0;
        int hours = 0;
        int days = 0;
        boolean secondsSpillover = false;
        
        if (seconds <= 0.0)
            return "Error: Bad input";
        
        while (secondsSpillover == true)
        {
            if (seconds >= 60.0)
            {
                seconds -=60;
                minutes +=1;
            }
            if (minutes >= 60)
            {
                minutes -=60;
                hours -=1;
            }
            if (hours >= 60)
            {
                hours -= 60;
                days += 1;
            }
            
            if (seconds < 60)
                secondsSpillover = false;
        }
        return days + ":" + hours + ":" + minutes + ":" + seconds;
    }      
    
    public static void main(String[] args) {
        double num = Double.parseDouble(args[0]);
        String answer = convertSecsToTime(num);
        System.out.println(answer);
    }    
}