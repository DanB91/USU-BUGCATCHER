//BUG 1: LINE 17 for loop does not include last int input, outputing false if that digit would make it true.

public class GroupSum_Bug1 {
	public static boolean findGroupSum(int start, int[] nums, int target) {
		  if (start >= nums.length){
		    return (target==0);
		  }
		  else {
		    return (findGroupSum(start+1, nums, target)||findGroupSum(start+1, nums, target-nums[start]));
		  }
		}

	public static void main(String[] args){
            try{
		int target = Integer.parseInt(args[0]);
		int[] nums = new int[args.length-1];
		
		for (int i = 0; i<args.length-2; i++){
            
                nums[i] = Integer.parseInt(args[i+1]);
                }
                System.out.println(findGroupSum(0, nums, target));
            }
            catch(Exception e){
                System.out.println("Error: Bad Input");
                return;
            }
		
	}
}
