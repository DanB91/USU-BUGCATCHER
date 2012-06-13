// BUG 1 : LINE 15 subtraction should be changed to addition

public class QuickAdd_bug1 {
	
	public static void main(String[] args){
		double num1 = Double.parseDouble(args[0]);
		double num2 = Double.parseDouble(args[1]);
		
		double sum = num1 - num2;
		
		System.out.println(sum);
		
	}

}
