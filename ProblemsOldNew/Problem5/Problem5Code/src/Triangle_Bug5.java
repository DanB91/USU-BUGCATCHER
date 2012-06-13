/*
 * This class is a Triangle_Bug2 class, which is used for judging what kinds of triangle 
 * three angle values formed
 */

/**
 *
 * @author weibing
 */
public class Triangle_Bug5 {
    protected static int firstAngle = 0;
    protected static int secondAngle = 0;
    protected static int thirdAngle = 0;
    static int RIGHTANGLE = 90;
    static int SUMTRIANGLEANGLE = 180;
    
    /*Determine which angle is the biggest one*/
    public static int biggest(int angle1, int angle2, int angle3){
        if(((angle1 <= angle2)&&(angle2 <= angle3))||((angle2 <= angle1)&&(angle1 <= angle3)))
            return angle3;
        else if (((angle1 <= angle3)&&(angle3 <= angle2))||((angle3 <= angle1)&&(angle1 <= angle2)))
            return angle2;
        else
            return angle1;
    }
    
    /*Determine which kinds of Triangle*/
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
    /*Constructor*/
    public Triangle_Bug5(int angle1, int angle2, int angle3){
        firstAngle = angle1;
        secondAngle = angle2;
        thirdAngle = angle3;
    }
    /*public static void main(String[] args) {
        // TODO code application logic here
        
        int arg1 = 0;
        int arg2 = 0;
        int arg3 = 0;
        
        arg1 = Integer.parseInt(args[0]);
        arg2 = Integer.parseInt(args[1]);
        arg3 = Integer.parseInt(args[2]);
        
        if(arg1 <= 0 || arg2 <= 0 ||arg3 <= 0){
            System.out.println("Invalid Input Value(s)");
            return;        
        } 
        
        Triangle_Bug5 tr = new Triangle_Bug5(arg1, arg2, arg3);
        System.out.println(tr.findTriangleType()); 
    }*/
}
