//BUG 2 : LINE 11 will break the program if given 3 or less
 
public class FindPrimes_Bug2 {
	
	public static String listPrimes(int max){
		String primes = "";
		boolean isFirst = true;
		
		if (max <= 3)
			return primes;
		
		for (int i = 2; i <= max; i++){
			boolean isPrime = true;
			
			for (int j = 2; j < i; j++){
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
		int maximum = Integer.parseInt(args[0]);
		
		System.out.println(listPrimes(maximum));
	}

}
