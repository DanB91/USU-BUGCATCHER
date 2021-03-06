

public class Converter_Oracle {
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
             if (hours >= 24)
             {
                 hours -= 24;
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
            if(num>-1){
                
            String answer = convertSecsToTime(num);
            System.out.println(answer);
            
            }else{
                
                System.out.println("Error: Input must be positive.");
            
        }
        }catch(Exception e){
            System.out.println("Error: Bad Input");
        }
    }
}