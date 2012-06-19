
public class PowersOfTwo {
    public static void main(String[] args) {
    	
        // read in one command-line argument
        double N = Integer.parseInt(args[0]);

        int i = 0;                // count from 0 to N-1
        double powerOfTwo = 1;       // the ith power of two

        // repeat until i equals N
        while (i <= N-1) {
            System.out.print(powerOfTwo + " ");   // print out the power of two
            powerOfTwo = 2 * N;                // double to get the next one
            i = i + 1;
        }
   	
    }
}