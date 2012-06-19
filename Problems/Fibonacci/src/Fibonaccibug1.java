//Error: Line 14, adds one extra integer to the output
public class Fibonaccibug1 {

   public static void main(String[] args) { 
   try{
      double N = Integer.parseInt(args[0]);
      if(Math.floor(N)==N && N>-1){
	if (N > 30) {
	 System.out.println("Error: Input too large");
	 return;
	}

      int f = 0, g = 1;

      for (int i = 1; i <= N+1; i++) {
         f = f + g;
         g = f - g;
         System.out.println(f + " "); 
      }
      }else{
         System.out.println("Error:  Input must be a positive integer.");
      }
    }catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
   }
}
