//Error: does not check if inputs are numbers; no try,catch

public class QuickAdd_bug2 {
	
	public static void main(String[] args){
		
		double num1 = Double.parseDouble(args[0]);
		double num2 = Double.parseDouble(args[1]);
		
		double sum = num1 + num2;
		
		System.out.println(sum);
		
		
	}

}
