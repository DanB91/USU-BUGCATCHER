
/**
 *
 * @author Miles
 */
public class Calculator_Bug5 {
    
    public static double doTheMath(double num1, double num2, String sign)
    {
        double answer = 0;
        if (sign.compareTo("plus")== 0)
                 answer = doAdd(num1, num2);
        if (sign.compareTo("minus")== 0)
            answer = doSubtract(num1, num2);
        if (sign.compareTo("over")== 0)
            answer = doDivide(num1, num2);
        if (sign.compareTo("times")== 0)
            answer = doMultiply(num1, num2);
        return answer;
    }
    
    public static double doAdd(double num1, double num2)
    {
        double answer = num1 + num2;
        return answer;
    }
    
    public static double doSubtract(double num1, double num2)
    {
        return num2 - num1;
    }
    
    public static double doMultiply(double num1, double num2)
    {
        return num1 * num2;
    }
    
    public static double doDivide(double num1, double num2)
    {
        return num1 / num2;
    }
    
}