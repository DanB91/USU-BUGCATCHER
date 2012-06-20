//Error: does not check to see if input is an integer
public class PowersOfTwo_bug2{
    public static void main(String[] args) {
    	try{
        // read in one command-line argument
        double N = Integer.parseInt(args[0]);

        if(N<=20){//checks if within range
        if(N>-1) {//checks if positive
        
        int i = 0;                // count from 0 to N-1
        double powerOfTwo = 1;       // the ith power of two

        // repeat until i equals N
        while (i <= N-1) {
            System.out.print(powerOfTwo + " ");   // print out the power of two
            powerOfTwo = 2 * powerOfTwo;                // double to get the next one
            i = i + 1;
        }
        
            }else{
                System.out.println("Error: Input must be positive.");
            }
        }else{
            System.out.println("Error: Input must be a positive number less than or equal to 20.");
        }
    	}catch(Exception e){
           	System.out.println("Error: Bad Input");
    	}
    }
}