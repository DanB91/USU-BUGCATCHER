//BUG 1: LINE 6 should be strict equality

public class GroupSum_Bug2 {
	public static boolean findGroupSum(int start, int[] nums, int target) {
		  if (start >= nums.length){
		    return (target<=0);
		  }
		  else {
		    return (findGroupSum(start+1, nums, target)||findGroupSum(start+1, nums, target-nums[start]));
		  }
		}

	public static void main(String[] args){
		int target = Integer.parseInt(args[0]);
		int[] nums = new int[args.length-1];
		
		for (int i = 0; i<args.length-1; i++){
            try{
                nums[i] = Integer.parseInt(args[i+1]);
            }
            catch(Exception e){
                System.out.println("Error: Bad Input");
                return;
            }
		}
		System.out.println(findGroupSum(0, nums, target));
	}
}
