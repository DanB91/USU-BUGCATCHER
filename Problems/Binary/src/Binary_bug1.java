public class Binary_bug1 { 
    public static void main(String[] args) { 
try{
        // read in the command-line argument
        int n = Integer.parseInt(args[0]);

        // set v to the largest power of two that is <= n
        int v = 1;
        while (v <= n/2) {
            v = v * 2;
        }
  
        // check for presence of powers of 2 in n, from largest to smallest
        while (v > 0) {

            // v is not present in n 
            if (n < v) {
                System.out.print(1);
            }

            // v is present in n, so remove v from n
            else {
                System.out.print(0);
                n = n - v;
            }

            // next smallest power of 2
            v = v / 2;
        }

        System.out.println();
}
catch(Exception e)
{
	System.out.println("Error: Bad Input");
}
    }

}
