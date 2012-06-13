//BUG 4 : LINE 20 inserts extra commas at certain times.
 
public class FindPrimes_Bug4 {
	
	public static String listPrimes(int max){
		String primes = "";
		boolean isFirst = true;
		
		for (int i = 2; i <= max; i++){
			boolean isPrime = true;
			
			for (int j = 2; j < Math.sqrt(i); j++){
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
		int maximum = Integer.parseInt(args[0]);
		
		System.out.println(listPrimes(maximum));
	}

}
