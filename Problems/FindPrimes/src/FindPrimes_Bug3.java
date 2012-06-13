//BUG 3 : LINE 14 should check j up to sqrt(i) not (i/2).

public class FindPrimes_Bug3 {
	
	public static String listPrimes(int max){
		String primes = "";
		boolean isFirst = true;
		
		for (int i = 2; i <= max; i++){
			boolean isPrime = true;
			
			for (int j = 2; j <= i/2; j++){
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
            int maximum = Integer.parseInt(args[0]);
            System.out.println(listPrimes(maximum));
        }catch(Exception e){
            System.out.println("Error: Bad Input");
        }
    }
}
