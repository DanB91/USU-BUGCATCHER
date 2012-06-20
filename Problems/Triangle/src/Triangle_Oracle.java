

public class Triangle_Oracle {
    private static double firstAngle = 0;
    private static double secondAngle = 0;
    private static double thirdAngle = 0;
    static int RIGHTANGLE = 90;
    static int SUMTRIANGLEANGLE = 180;
    
    /*Determine which angle is the biggest one*/
    public static double biggest(double angle1, double angle2, double angle3){
        if((angle2 <= angle3)&&(angle1 <= angle3))
            return angle3;
        else if ((angle1 <= angle2)&&(angle3 <= angle2))
            return angle2;
        else
            return angle1;
    }
    
    /*find what kinds of triangle*/
    public static String findTriangleType(){
     if(firstAngle <= 0 || secondAngle <= 0 || thirdAngle <= 0){
        return "Invalid Input Value(s)";        
     } 
        double bigAngle = biggest(firstAngle, secondAngle,thirdAngle);
        double sum = firstAngle + secondAngle + thirdAngle;
        if (sum != SUMTRIANGLEANGLE)
            return "Not a Triangle";
        else if (bigAngle > RIGHTANGLE)
            return "Obtuse";
        else if (bigAngle == RIGHTANGLE)
            return "Right";
        else
            return "Acute";        
    }
    
    /*constructor*/
    public Triangle_Oracle(double angle1, double angle2, double angle3){
        firstAngle = angle1;
        secondAngle = angle2;
        thirdAngle = angle3;
    }
	
    public static void main(String[] args) {        
       try{ 
    	   double arg1 = Double.parseDouble(args[0]);
           double arg2 = Double.parseDouble(args[1]);
           double arg3 = Double.parseDouble(args[2]);
        
        
       if((Math.floor(arg1)==arg1 && Math.floor(arg2)==arg2 && Math.floor(arg3)==arg3)){
        if(arg1 <=2000000000 && arg2<=2000000000 && arg3 <= 2000000000){//check to see that double is not overflowed
        		
        
        Triangle_Oracle tr = new Triangle_Oracle(arg1, arg2, arg3);
        System.out.println(tr.findTriangleType());
      
        }else{
        	System.out.println("Error: All three inputs must be less than or equal to 2000000000.");
        }
        }else{
        	System.out.println("Error:  All three inputs must be integers.");
        	}
        } catch(Exception e){
        
    	      	System.out.println("Error: Bad Input");

      }
    }
}

    


