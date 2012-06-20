//Error: Does not check to see if a number was input; no ,try, catch

public class FindPrimes_Bug5 {
	
	public static String listPrimes(double max){
		String primes = "";
		boolean isFirst = true;
		
		for (int i = 2; i <= max; i++){
			boolean isPrime = true;
			
			for (int j = 2; j <= Math.sqrt(i); j++){
				if ((i % j) == 0){
					isPrime = false;
					break;
				}
			}
			if (isPrime && isFirst){
				primes += i;
				isFirst = false;
			}
			else if (isPrime)
				primes += ", " + i;
		}
		return primes;
	}
	
    public static void main(String[] args){
       
            double maximum = Integer.parseInt(args[0]);
            if(maximum <= 2000000000){
                if(Math.floor(maximum) == maximum){
            System.out.println(listPrimes(maximum));
                }else{
                    System.out.println("Error: Input must be an integer.");
                }
            }else{
                System.out.println("Error: Input must be less than or equal to 2000000000.");
            }
        
    }
}