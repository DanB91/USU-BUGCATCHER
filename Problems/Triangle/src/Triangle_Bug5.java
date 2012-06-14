//BUG 5 : LINE 23 doesn't return "Invalid input" if one of the angles is 0.


public class Triangle_Bug5 {
    private static int firstAngle = 0;
    private static int secondAngle = 0;
    private static int thirdAngle = 0;
    static int RIGHTANGLE = 90;
    static int SUMTRIANGLEANGLE = 180;
    
    /*Determine which angle is the biggest one*/
    public static int biggest(int angle1, int angle2, int angle3){
        if((angle2 <= angle3)&&(angle1 <= angle3))
            return angle3;
        else if ((angle1 <= angle2)&&(angle3 <= angle2))
            return angle2;
        else
            return angle1;
    }
    
    /*find what kinds of triangle*/
    public static String findTriangleType(){
     if(firstAngle < 0 || secondAngle < 0 || thirdAngle < 0){
        return "Invalid Input Value(s)";        
     } 
        int bigAngle = biggest(firstAngle, secondAngle,thirdAngle);
        int sum = firstAngle + secondAngle + thirdAngle;
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
    public Triangle_Bug5(int angle1, int angle2, int angle3){
        firstAngle = angle1;
        secondAngle = angle2;
        thirdAngle = angle3;
    }
	
    public static void main(String[] args) {        
      try{
        int arg1 = Integer.parseInt(args[0]);
        int arg2 = Integer.parseInt(args[1]);
        int arg3 = Integer.parseInt(args[2]);
        
        
        Triangle_Bug5 tr = new Triangle_Bug5(arg1, arg2, arg3);
        System.out.println(tr.findTriangleType());
      } catch(Exception e){
      	System.out.println("Error: Bad Input");
      }
    }

}
