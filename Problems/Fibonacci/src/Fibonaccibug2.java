//Error: does not check to see if input is a number; no try,catch
//NEEDS TO BE FIXED
public class Fibonaccibug2 {

   public static void main(String[] args) { 
   
      double N = Integer.parseInt(args[0]);
      if(Math.floor(N)==N && N>-1){
	if (N > 30) {
	 System.out.println("Error: Input too large");
	 return;
	}

      int f = 0, g = 1;

      for (int i = 1; i <= N; i++) {
         f = f + g;
         g = f - g;
         System.out.print(f + " "); 
      }
      }else{
          System.out.println("Error:  Input must be a positive integer.");
      }
      
    
   }
}
