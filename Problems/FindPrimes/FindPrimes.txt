

public class FindPrimes{
	
   public static String listPrimes(double max){
      String primes = "";
      boolean isFirst = true;
				
      if (max <= 3)
         return primes;
		
      for (int i = 2; i < max; i++){
         boolean isPrime = true;
			
      for (int j = 2; j < i/2; j++){
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
     
          double maximum = Integer.parseInt(args[0]);
          System.out.println(listPrimes(maximum));
	  
   }
}