//Error: does not check to see if number is a positive number
public class Binary_bug3 { 
	public static void main(String[] args) { 
	try{
	
            double input = Double.parseDouble(args[0]);
            
            if(input <= 20000000){//checks to see if input is too large
                
            if (Math.floor(input)==input) {
                        
			// read in the command-line argument
			double n = input;

			// set v to the largest power of two that is <= n
			int v = 1;
			while (v <= n/2) {
				v = v * 2;
			}

			// check for presence of powers of 2 in n, from largest to smallest
			while (v > 0) {

				// v is not present in n 
				if (n < v) {
					System.out.print(0);
				}

				// v is present in n, so remove v from n
				else {
					System.out.print(1);
					n = n - v;
				}

				// next smallest power of 2
				v = v / 2;
			}

			System.out.println();
            }else{
                
            	System.out.println("Error: Input must be an integer.");
            }
            
            }else{
        	
        	System.out.print("Error: Input is too large.");
            }
		
	}catch(Exception e){
            
		System.out.println("Error: Bad Input. Input must be a positive integer within the range.");
	}
	}
}
