//Error: does not check to see if int is overflowed
public class PowersOfTwo_bug4{
    public static void main(String[] args) {
    	try{
        // read in one command-line argument
        double N = Integer.parseInt(args[0]);

        if(N>-1) {//checks if positive
        if(Math.floor(N)==N){//checks if integer
        int i = 0;                // count from 0 to N-1
        double powerOfTwo = 1;       // the ith power of two

        // repeat until i equals N
        while (i <= N-1) {
            System.out.print(powerOfTwo + " ");   // print out the power of two
            powerOfTwo = 2 * powerOfTwo;                // double to get the next one
            i = i + 1;
        }
        }else{
            System.out.println("Error: Input must be an integer.");
        }
            }else{
                System.out.println("Error: Input must be positive.");
            }
        
    	}catch(Exception e){
           	System.out.println("Error: Bad Input");
    	}
    }
}