//BUG 1: LINE 11 increments the odd digit counter by 2

public class OddsEvens_Bug1 {
	
	public static int oddDigits(int number){
		int oddCounter = 0;
		while (number > 0)
		{
			int isOdd = number % 10;
			if ((isOdd % 2) != 0){
				oddCounter += 2;
		}
		number /= 10;
		}
		return oddCounter;
	}
	
	public static int evenDigits(int number){
		int evenCounter = 0;
		while (number > 0)
		{
			int isEven = number % 10;
			if ((isEven % 2) == 0){
				evenCounter++;
		}
		number /= 10;
		}
		return evenCounter;
	}
	
	public static void main(String[] args){
	try{
			int num = Integer.parseInt(args[1]);
			if (args[0].equals("even")){
				System.out.println(OddsEvens_Bug1.evenDigits(num));
			} else if (args[0].equals("odd")){
				System.out.println(OddsEvens_Bug1.oddDigits(num));
			}
	}catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}

}