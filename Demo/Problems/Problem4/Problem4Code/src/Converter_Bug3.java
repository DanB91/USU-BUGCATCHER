import java.io.PrintWriter;
/**
 *
 * @author Miles
 */
public class Converter_Bug3 {
      public static String convertSecsToTime(double sec)
      {
          double seconds = sec;
          int minutes = 0;
          int hours = 0;
          int days = 0;
          boolean secondsFixed = false;
          boolean minutesFixed = false;
          boolean hoursFixed = false;
          if (seconds < 0.0)
              return "Error: Bad input";
          while (secondsFixed == false || minutesFixed == false || hoursFixed == false)
          {
              if (seconds >= 60.0)
              {
                    seconds-=60;
                    minutes+=1;
              }
              if (minutes >= 60)
              {
                  minutes-=60;
                  hours+=1;
              }
              if (hours>=60)
              {
                  hours -=60;
                  days +=1;
              }
              if (seconds <60)
                  secondsFixed = true;
              if (minutes < 60)
                  minutesFixed = true;
              if (hours<24)
                  hoursFixed = true;
          }
          return days + ":" + hours + ":" + minutes + ":" + seconds;
          
      }
}



