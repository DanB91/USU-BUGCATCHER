

public class FindPrimes_Oracle {
	
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
        try{
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
        }catch(Exception e){
            System.out.println("Error: Bad Input");
        }
    }
}