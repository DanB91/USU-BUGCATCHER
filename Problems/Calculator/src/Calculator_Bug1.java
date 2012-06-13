//BUG 1 : LINE 11 switches num1 and num2

public class Calculator_Bug1 {
    
    public static double doTheMath(double num1, double num2, String sign){
        double answer = 0;
        if (sign.equals("plus"))
                 answer = doAdd(num1, num2);
        if (sign.equals("minus"))
            answer = doSubtract(num2, num1);
        if (sign.equals("over"))
            answer = doDivide(num1, num2); 
        if (sign.equals("times"))
            answer = doMultiply(num1, num2);
        return answer;
    }
    
    public static double doAdd(double num1, double num2){
        return num1 + num2;
    }
    
	
	
	
    public static double doSubtract(double num1, double num2){
        return num1 - num2;
    }
    
    public static double doMultiply(double num1, double num2){
        return num1 * num2;
    }
    
    public static double doDivide(double num1, double num2){
        return num1 / num2;
    }
    
    public static void main(String[] args){
	    try{
        double num1 = Double.parseDouble(args[0]);
        String sign = args[1];                     
        double num2 = Double.parseDouble(args[2]);
        double answer = doTheMath(num1, num2, sign); 
        System.out.println(answer);    
	    }
	    catch(Exception e)
	    {
		    System.out.println("Error: Bad Input");
	    }
    }
}
