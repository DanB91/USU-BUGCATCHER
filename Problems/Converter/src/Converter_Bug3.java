//BUG 3 : LINE 27 hours set to 60 instead of 24

public class Converter_Bug3 {
     public static String convertSecsToTime(double sec)
     {
         double seconds = sec;
         int minutes = 0;
         int hours = 0;
         int days = 0;
		 boolean secondsSpillover = true;
         
         if (seconds < 0.0)
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
                 hours +=1;
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
        try{
            double num = Double.parseDouble(args[0]);
            String answer = convertSecsToTime(num);
            System.out.println(answer);
        }catch(Exception e){
            System.out.println("Error: Bad Input");
        }
    }
}