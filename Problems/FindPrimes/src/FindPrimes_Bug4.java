//BUG 4 : LINE 20 inserts extra commas at certain times.
 
public class FindPrimes_Bug4 {
	
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
			if (!isFirst)
				primes += ", ";
			if (isPrime){
				primes += i;
				isFirst = false;
			}
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
