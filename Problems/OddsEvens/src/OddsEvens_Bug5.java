//Error: Does not check to see if the first input is "even" or "odd"

public class OddsEvens_Bug5 {
	
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
                            if(Math.floor(num)==num){
			if (args[0].equals("even")){
				System.out.println(OddsEvens_Bug5.evenDigits(num));
			} else if (args[0].equals("odd")){
				System.out.println(OddsEvens_Bug5.oddDigits(num));
			                                
                        }
                            }else{
                                System.out.println("Error: Second input must be an integer.");
                            }
                        }else{
                            System.out.println("Error: Second input must be an integer less or equal to 2000000000. ");
                        }
	}catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}

}

