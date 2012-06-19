//Error: Does not check to see whether or not the second input is an integer

public class OddsEvens_Bug4 {
	
	public static int oddDigits(double number){
		int oddCounter = 0;
		while (number > 0){
			double isOdd = number % 10;
			if ((isOdd % 2) != 0){
				oddCounter++;
			}
			number /= 10;
		}
		return oddCounter;
	}
	
	public static int evenDigits(double number){
		int evenCounter = 0;
		while (number > 0){
			double isEven = number % 10;
			if ((isEven % 2) == 0){
				evenCounter++;
			}
			number /= 10;
		}
		return evenCounter;
	}
	
	public static void main(String[] args){
	try{
			double num = Integer.parseInt(args[1]);
                        if(num<=2000000000){
                            
			if (args[0].equals("even")){
				System.out.println(OddsEvens_Bug4.evenDigits(num));
			} else if (args[0].equals("odd")){
				System.out.println(OddsEvens_Bug4.oddDigits(num));
			                                
                        }else{
                            System.out.println("Error: First input must be either 'even' or 'odd'.");
                        }
                            
                        }else{
                            System.out.println("Error: Second input must be a positive integer less or equal to 2000000000. ");
                        }
	}catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}

}


