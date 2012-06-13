

public class Calculator{
    
    public static double doTheMath(double num1, double num2, String sign){
        double answer = 0;
        if (sign.equals("plus"))
            answer = doAdd(num1, num2);
        if (sign.equals("minus"))
            answer = doSubtract(num1, num2);
        if (sign.equals("over"))
            answer = doDivide(num1, num2); 
        if (sign.equals("times"))
            answer = doMultiply(num1, num2);
        return answer;
    }
    
    public static double doAdd(double num1, double num2){
        double answer = num1;
        for (int i = 0; i<num2; i++)
            answer++;
        return answer;
    }
    
    public static double doSubtract(double num1, double num2){
        return num1 - num2;
    }
    
    public static double doMultiply(double num1, double num2){
        return (num1 * num2 * num2);
    }
    
    public static double doDivide(double num1, double num2){
        return num2 % num1;
    }
    
    public static void main(String[] args){
        double num1 = Double.parseDouble(args[0]);
        String sign = args[1];                     
        double num2 = Double.parseDouble(args[2]);
        double answer = doTheMath(num1, num2, sign); 
        System.out.println(answer);        
    }
}